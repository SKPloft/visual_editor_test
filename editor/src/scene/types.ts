export type Vector3 = [number, number, number];
export type Quaternion = [number, number, number, number];

export interface Transform {
  position: Vector3;
  rotation: Quaternion;
  scale: Vector3;
}

export interface MeshComponent {
  type: "mesh";
  meshRef: string;
  materialRef?: string;
  castShadows?: boolean;
  receiveShadows?: boolean;
}

export interface LightComponent {
  type: "light";
  lightType: "directional" | "point" | "spot";
  color: string;
  intensity: number;
  range?: number;
  angle?: number;
  castShadows?: boolean;
}

export interface ColliderComponent {
  type: "collider";
  shape: "box" | "sphere" | "capsule" | "mesh";
  isTrigger?: boolean;
  isPickable?: boolean;
  size?: Vector3;
  radius?: number;
  height?: number;
}

export interface AvatarPlaceholderComponent {
  type: "avatar";
  avatarType: "npc" | "player";
  modelRef?: string;
  displayName?: string;
}

export interface PrefabReferenceComponent {
  type: "prefabRef";
  prefabRef: string;
}

export type Component =
  | MeshComponent
  | LightComponent
  | ColliderComponent
  | AvatarPlaceholderComponent
  | PrefabReferenceComponent;

export interface Node {
  id: string;
  name: string;
  transform: Transform;
  components: Component[];
  children: Node[];
}

export interface SceneGraph {
  root: Node;
}

export interface MaterialAsset {
  id: string;
  type: "material";
  name: string;
  albedoColor?: string;
  albedoTexture?: string;
  metallic?: number;
  roughness?: number;
  normalTexture?: string;
}

export interface MeshAsset {
  id: string;
  type: "mesh";
  name: string;
  source: string;
}

export interface AssetLibrary {
  meshes: MeshAsset[];
  materials: MaterialAsset[];
  textures: unknown[];
  prefabs: unknown[];
}

export interface Metadata {
  name: string;
  description?: string;
  author?: string;
  createdAt: string;
  modifiedAt: string;
  unitScale?: number;
  upAxis?: "Y" | "Z";
}

export interface SceneFile {
  version: string;
  metadata: Metadata;
  assetLibrary: AssetLibrary;
  sceneGraph: SceneGraph;
}
