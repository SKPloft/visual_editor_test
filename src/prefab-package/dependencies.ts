/**
 * Dependency coverage and graph checks.
 *
 * Two questions are deliberately separate here. *Where is a nested prefab
 * instantiated and with what values* is answered by GLB node records; *what
 * must resolve, at which pinned version and digest* is answered by
 * `manifest.dependencies`. This module proves the second covers the first.
 *
 * Resolution is injected and local. A reference the resolver cannot supply is
 * reported as missing external context, never as an inconsistent package and
 * never by reaching for the network — those are different problems with
 * different owners.
 */

import type { DiagnosticCollector } from "./diagnostics.ts";
import { validateParameterValue } from "./parameters.ts";
import { referenceIdentity, referenceKey } from "./types.ts";
import type {
  DependencyReport,
  DependencyResolver,
  DiscoveredReference,
  InspectionPolicy,
  PackageReference,
  PayloadRepresentation,
  PrefabManifest,
} from "./types.ts";

/** Collects the exact references a payload's nested-instance records introduce. */
export function collectNestedReferences(
  representations: readonly PayloadRepresentation[],
): DiscoveredReference[] {
  const discovered: DiscoveredReference[] = [];
  for (const representation of representations) {
    for (const node of representation.nodes) {
      if (!node.prefabInstance) continue;
      discovered.push({
        reference: node.prefabInstance.reference,
        origin: "nested-instance",
        location: `${blobLocation(representation)}#/nodes/${node.index}/extras/nook/prefabInstance`,
        representation: representation.role,
        nodeId: node.nodeId,
      });
    }
  }
  return discovered;
}

export function validateDependencies(
  manifest: PrefabManifest,
  manifestDigest: string,
  representations: readonly PayloadRepresentation[],
  parameterReferences: readonly DiscoveredReference[],
  resolver: DependencyResolver | null,
  policy: InspectionPolicy,
  diagnostics: DiagnosticCollector,
): DependencyReport {
  const discovered = [...collectNestedReferences(representations), ...parameterReferences].sort(
    compareDiscovered,
  );

  const declaredByKey = new Map<string, PackageReference>();
  for (const dependency of manifest.dependencies) {
    const key = referenceKey(dependency);
    const existing = declaredByKey.get(key);
    if (existing) {
      diagnostics.add(
        "NOOK-DEPENDENCY-DUPLICATE",
        "manifest.json#/dependencies",
        `Dependency ${key} is declared more than once` +
          (existing.digest === dependency.digest
            ? "."
            : ` with conflicting digests ${existing.digest} and ${dependency.digest}.`),
        { packageRef: key },
      );
      continue;
    }
    declaredByKey.set(key, dependency);
  }

  const undeclared: DiscoveredReference[] = [];
  const mismatched: DiscoveredReference[] = [];
  const usedKeys = new Set<string>();

  for (const entry of discovered) {
    const key = referenceKey(entry.reference);
    const declared = declaredByKey.get(key);

    if (!declared) {
      undeclared.push(entry);
      diagnostics.add(
        "NOOK-DEPENDENCY-UNDECLARED",
        entry.location,
        `The package references ${key} but manifest.dependencies does not declare it. Nothing can ` +
          "resolve this reference reproducibly.",
        {
          packageRef: key,
          representation: entry.representation,
          nodeId: entry.nodeId,
          paramId: entry.paramId,
        },
      );
      continue;
    }

    usedKeys.add(key);
    if (declared.digest !== entry.reference.digest) {
      mismatched.push(entry);
      diagnostics.add(
        "NOOK-DEPENDENCY-MISMATCH",
        entry.location,
        `Reference to ${key} pins digest ${entry.reference.digest} but manifest.dependencies ` +
          `declares ${declared.digest}. The same tuple cannot denote two artifacts.`,
        {
          packageRef: key,
          representation: entry.representation,
          nodeId: entry.nodeId,
          paramId: entry.paramId,
        },
      );
    }
  }

  const unused: PackageReference[] = [];
  for (const [key, dependency] of declaredByKey) {
    if (usedKeys.has(key)) continue;
    unused.push(dependency);
    diagnostics.add(
      "NOOK-DEPENDENCY-UNUSED",
      "manifest.json#/dependencies",
      `Dependency ${key} is declared but no nested instance or reference-typed default uses it.`,
      { packageRef: key },
      policy.unusedDependencySeverity,
    );
  }

  const unresolved: PackageReference[] = [];
  const cycles: string[][] = [];

  if (resolver) {
    for (const dependency of declaredByKey.values()) {
      const resolved = resolver.resolve(dependency);
      if (resolved === null) {
        unresolved.push(dependency);
        diagnostics.add(
          "NOOK-DEPENDENCY-UNRESOLVED",
          "manifest.json#/dependencies",
          `No local manifest is available for ${referenceKey(dependency)}. This is missing external ` +
            "context, not an inconsistency in this package.",
          { packageRef: referenceKey(dependency) },
          policy.unresolvedDependencySeverity,
        );
        continue;
      }

      // The resolver attests to bytes it actually read. Its digest is the trust
      // boundary: never validate cycles or nested values against a manifest
      // whose bytes disagree with the immutable digest the package pins.
      if (resolved.digest !== dependency.digest) {
        diagnostics.add(
          "NOOK-MANIFEST-DIGEST-MISMATCH",
          "manifest.json#/dependencies",
          `Resolver returned ${resolved.digest} for ${referenceKey(dependency)}, but this package ` +
            `pins ${dependency.digest}. The retrieved artifact is not the pinned version and is ` +
            "not trusted for dependency validation.",
          { packageRef: referenceKey(dependency) },
        );
      }
    }

    for (const cycle of detectCycles(manifest, manifestDigest, resolver, diagnostics)) {
      cycles.push(cycle);
      diagnostics.add(
        "NOOK-DEPENDENCY-CYCLE",
        "manifest.json#/dependencies",
        `Dependency cycle ${cycle.join(" -> ")}. A package cannot depend on itself, directly or ` +
          "transitively.",
        { packageRef: cycle[0] },
      );
    }
    validateNestedParameterValues(representations, resolver, diagnostics);
  }

  return {
    declared: manifest.dependencies,
    discovered,
    undeclared,
    mismatched,
    unused,
    unresolved,
    cycles,
  };
}

/**
 * Depth-first cycle search over locally resolvable manifests.
 *
 * Only fully resolvable chains can be judged. An unresolved dependency ends a
 * branch quietly — it was already reported as missing context, and inventing a
 * verdict about a package we cannot read would be worse than saying nothing.
 */
function detectCycles(
  root: PrefabManifest,
  rootDigest: string,
  resolver: DependencyResolver,
  diagnostics: DiagnosticCollector,
): string[][] {
  const rootKey = `prefab:${root.id}@${root.version}#${rootDigest}`;
  const cycles: string[][] = [];
  const reported = new Set<string>();
  const stack: string[] = [];
  const onStack = new Set<string>();

  /**
   * Resolves and attests an edge before asking whether it closes a cycle.
   *
   * Tuple equality alone is not identity equality: `prefab:A@1.0.0` can be
   * paired with a forged digest that points nowhere. Recording such an edge as
   * a cycle would make an untrusted artifact graph look validly connected.
   */
  const visit = (
    key: string,
    manifest: PrefabManifest,
    reportMismatches: boolean,
  ): void => {
    stack.push(key);
    onStack.add(key);

    for (const dependency of manifest.dependencies) {
      const resolved = resolver.resolve(dependency);
      if (resolved === null) continue;

      if (resolved.digest !== dependency.digest) {
        // Direct dependencies were already reported by validateDependencies.
        // Nested graph edges reach here first, so emit their retrieval-boundary
        // failure at the moment it is discovered.
        if (reportMismatches) {
          diagnostics.add(
            "NOOK-MANIFEST-DIGEST-MISMATCH",
            "manifest.json#/dependencies",
            `Resolver returned ${resolved.digest} for ${referenceKey(dependency)}, but this package ` +
              `pins ${dependency.digest}. The retrieved artifact is not the pinned version and is ` +
              "not trusted for dependency validation.",
            { packageRef: referenceKey(dependency) },
          );
        }
        continue;
      }

      const next = referenceIdentity(dependency);
      if (onStack.has(next)) {
        const chain = [...stack.slice(stack.indexOf(next)), next];
        const signature = chain.join(">");
        if (!reported.has(signature)) {
          reported.add(signature);
          cycles.push(chain);
        }
        continue;
      }
      visit(next, resolved.manifest, true);
    }

    onStack.delete(key);
    stack.pop();
  };

  // validateDependencies has already checked and diagnosed the root's direct
  // edges. Still resolve them here to start trusted graph traversal, but avoid
  // duplicate mismatch diagnostics for the same direct failure.
  visit(rootKey, root, false);
  return cycles;
}

/**
 * Nested instance values are validated against the *pinned* nested version's
 * declarations, which only exist once the resolver supplies that manifest.
 */
function validateNestedParameterValues(
  representations: readonly PayloadRepresentation[],
  resolver: DependencyResolver,
  diagnostics: DiagnosticCollector,
): void {
  for (const representation of representations) {
    for (const node of representation.nodes) {
      const instance = node.prefabInstance;
      if (!instance) continue;
      const nested = resolver.resolve(instance.reference);
      if (!nested) continue;
      if (nested.digest !== instance.reference.digest) {
        diagnostics.add(
          "NOOK-MANIFEST-DIGEST-MISMATCH",
          `${blobLocation(representation)}#/nodes/${node.index}/extras/nook/prefabInstance`,
          `Resolver returned ${nested.digest} for ${referenceKey(instance.reference)}, but this ` +
            `nested instance pins ${instance.reference.digest}. The retrieved artifact is not trusted ` +
            "for parameter validation.",
          {
            packageRef: referenceKey(instance.reference),
            representation: representation.role,
            nodeId: node.nodeId,
          },
        );
        continue;
      }

      const declarations = new Map(nested.manifest.parameters.map((p) => [p.paramId, p]));
      const base = `${blobLocation(representation)}#/nodes/${node.index}/extras/nook/prefabInstance/params`;

      for (const paramId of Object.keys(instance.params).sort()) {
        const declaration = declarations.get(paramId);
        if (!declaration) {
          diagnostics.add(
            "NOOK-PARAM-VALUE-INVALID",
            `${base}/${paramId}`,
            `Nested instance assigns ${JSON.stringify(paramId)}, which ` +
              `${referenceKey(instance.reference)} does not declare. Instances may only set ` +
              "declared parameters.",
            {
              paramId,
              representation: representation.role,
              nodeId: node.nodeId,
              packageRef: referenceKey(instance.reference),
            },
          );
          continue;
        }
        validateParameterValue(declaration, instance.params[paramId], `${base}/${paramId}`, diagnostics, {
          representation: representation.role,
          nodeId: node.nodeId,
          packageRef: referenceKey(instance.reference),
        });
      }
    }
  }
}

function blobLocation(representation: PayloadRepresentation): string {
  return `payloads/${representation.role}`;
}

function compareDiscovered(a: DiscoveredReference, b: DiscoveredReference): number {
  if (a.location !== b.location) return a.location < b.location ? -1 : 1;
  const aKey = referenceKey(a.reference);
  const bKey = referenceKey(b.reference);
  return aKey === bKey ? 0 : aKey < bKey ? -1 : 1;
}

/** A dependency resolver backed by an in-memory manifest set, for local fixtures and tests. */
/**
 * A fixture/local resolver that attests each manifest from its verbatim JSON.
 *
 * Production cache and registry resolvers make the same promise from the bytes
 * they actually fetched. Keeping the digest alongside the parsed manifest
 * prevents a caller's pinned digest from becoming an unchecked lookup hint.
 */
export async function createLocalResolver(
  manifests: readonly PrefabManifest[],
): Promise<DependencyResolver> {
  const byIdentity = new Map<string, { manifest: PrefabManifest; digest: string }>();
  const { manifestDigest } = await import("./canonical.ts");
  for (const manifest of manifests) {
    byIdentity.set(`prefab:${manifest.id}@${manifest.version}`, {
      manifest,
      digest: await manifestDigest(manifest.raw),
    });
  }
  return {
    resolve(reference) {
      return byIdentity.get(referenceKey(reference)) ?? null;
    },
  };
}
