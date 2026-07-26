# Nook 预制体包格式 · 草案 v0.1

> **状态：已提升 —— 非规范性来源存档。**
> 本草案已由 OpenSpec 变更 `prefab-contract-foundation` 提升为稳定契约 [`../PREFAB_PACKAGE_FORMAT.md`](../PREFAB_PACKAGE_FORMAT.md)。规范性规则以稳定契约为准；两者冲突时以稳定契约为准。以下内容原样保留，作为原始讨论结论的记录。
>
> 本文档固化 2026-07-24/25 关于预制体内部结构与格式的讨论结论，供评审与后续 PoC 使用。
> **v0.1（2026-07-25）**：纳入外部评审与后续讨论（讨论日志 R7/R8）——可移植配置规范、表示作用域绑定、路径语言、逻辑根约束、嵌套编码、引用封套、parameterReplacements、JCS 哈希、验证与安全、前向兼容分级、"语义一致性"重命名。
> 它**尚不是**仓库稳定契约；正式化路径为 OpenSpec change `prefab-contract-foundation`（届时按仓库惯例译为英文契约，并写入对旧实现路径的处置立场）。
> 批准后本文将取代 `docs/CANONICAL_FORMAT.md` 中与预制体相关的部分；世界/场景文件格式不在本文范围（见 §15）。
> 配套文档：[`prefab-format-discussion-log.md`](prefab-format-discussion-log.md)（问题、选项与决策理由）。

## 1. 目的与适用范围

本格式服务于预制体在以下链路中的存储与传输：

```
创作者(Unity/Unreal + Nook SDK) ──导出──▶ 预制体包 ──上传──▶ 云端商城(registry+CAS)
                                                              │
        ┌──────────────────┬──────────────────────────────────┤
        ▼                  ▼                                  ▼
   商城预览(proxy)    浏览器编辑器(proxy 实时预览)         后端烘焙(full 为原材料)
```

- 本格式**主要是交换格式**：由 SDK 生成、SDK/服务/编辑器消费，不要求人类可手写。
- 编辑器内部的内存工作表示不受本格式约束（怎么方便怎么来），序列化落盘/传输才走本格式。
- 范围限定为**预制体包**。世界/场景文件只在本格式中以"实例记录要求"的形式被引用（§9），其自身格式另行讨论。

## 2. 设计原则

1. **交换优先（interchange-first）**：创作者在引擎内用引擎原生工具创作，本格式是 SDK 导出的结果与各方消费的对象。
2. **限域无损（scoped lossless）**：导出必须忠实保留创作者数据中属于可移植配置规范（§4）的部分；规范之外的内容**不得静默丢弃**——SDK 必须在导出时给出显式诊断。
3. **版本不可变 + 实例钉住**：已发布版本不可变；世界中已放置实例钉住版本，升级是构建者的显式操作。
4. **内容寻址（CAS）**：负载以内容哈希寻址，跨版本、跨预制体去重；升级只下载变化的 blob。
5. **引擎无关**：只依赖行业标准（JSON、glTF）；引擎特有概念由 SDK 在导出时映射。
6. **声明式参数，无自由 override**：实例只能修改 placement transform 与创作者声明的参数。
7. **往返保留（round-trip preservation）**：消费者重新序列化时必须原样保留未识别的字段与数值（见 §13）。

## 3. 角色与生命周期

| 阶段 | 参与者 | 与本格式的关系 |
| --- | --- | --- |
| ① 创作 | 创作者（引擎 + SDK） | 引擎原生搭建；SDK 提供参数声明 UI（NookAuthoring 组件） |
| ② 声明参数 | 创作者 | SDK 分配 paramId，记录绑定目标 |
| ③ 导出/打包 | SDK | 校验（profile 合规、绑定可解析、proxy/full 一致、requires 完整）→ 生成包 |
| ④ 上传 | SDK → 商城 | 甲方案（draft）：整包上传，服务端拆入 CAS（§14） |
| ⑤ 存储/预览 | 商城 | registry 注册 `id@version`；proxy 自足渲染商城预览（可调参，倾向确认） |
| ⑥ 获取 | 构建者（编辑器） | 下载 manifest + proxy 入本地缓存；世界文件记录依赖（钉版本） |
| ⑦ 放置/配置 | 构建者 | 产生实例记录；参数类型驱动 UI 生成（UI 规则后定） |
| ⑧ 升版迁移 | 构建者 | 自动携带 + 审查面板（§10）；只下载变化 blob |
| ⑨ 烘焙 | 后端 | 解析依赖闭包，拉取 full 负载，替换 proxy 产出运行时世界 |

## 4. Nook 可移植配置规范（Portable Prefab Profile）

只有原生引擎预制体的一个**白名单子集**可以进入 Nook 包。"无损"仅相对该子集成立，而非相对引擎全功能。

```
原生引擎预制体
      │  SDK 导出
      ▼
┌─────────────────────────────────────┐
│ Nook 可移植配置规范 v1               │
│  · 几何（网格/图元）                  │
│  · PBR 材质（glTF metallic-roughness │
│    + 官方材质扩展白名单）             │
│  · 灯光（KHR_lights_punctual）       │
│  · Nook 语义组件（collider/pickable/ │
│    avatar 占位；经能力注册表管理）     │
│  · transform                        │
│  · 白名单内参数目标属性（§7 路径语言） │
└─────────────────────────────────────┘
```

- **profile 外内容**（任意脚本、自定义着色器、引擎专属组件、动画控制器、引擎事件、引擎物理配置、仅编辑器行为、任意序列化对象）：SDK 导出时必须给出显式诊断（WARNING 或 ERROR），不得静默丢弃。
- profile 内容的演进通过能力注册表增量进行（§13），不需要升 manifest 主版本。
- ⚑ **自定义着色器与运行时可编程性的长期故事 = Lark 级产品问题，单独立案**，不在本草案范围内做默认决定。

## 5. 包逻辑模型

预制体包 = **一份 manifest + 若干内容寻址 blob**。

```jsonc
// manifest.json
{
  "spec": "nook.prefab/1",            // manifest 格式自身版本
  "id": "p_01J9Z...",                 // prefabId：SDK 分配，跨版本稳定（§8）
  "version": "1.2.0",                 // 创作者面版本号（semver 风格）
  "meta": {
    "name": "复古壁灯",
    "author": "...",
    "category": "furniture/light",
    "tags": []
  },
  "requires": [                       // 能力声明，见 §13；SDK 从实际使用机械生成
    "nook.component/collider@1",      // 排序去重（规范化的一部分）
    "nook.parameter/color@1"
  ],
  "parameters": [ /* ParamDecl[]，见 §7 */ ],
  "dependencies": [                   // 动态链接的嵌套预制体；发布时必须钉死
    { "kind": "prefab", "id": "p_01K4...", "version": "2.0.1", "digest": "sha256:6f1c..." }
  ],
  "payloads": {                       // 类型化槽位，可扩展
    "proxy": { "digest": "sha256:a1...", "size": 812344,  "mediaType": "model/gltf-binary" },
    "full":  { "digest": "sha256:b2...", "size": 52428800, "mediaType": "model/gltf-binary" }
    // 未来槽位示例: "thumbnail", "materialLib" —— 新增槽位不改格式版本
  },
  "migrationHints": {                 // 可选，例外迁移通道（§10）
    "parameterReplacements": { "oldParamId": "replacementParamId" }
  }
}
```

**版本身份与哈希规则**：

- `digest = sha256(JCS(manifest))`——JCS 即 RFC 8785 JSON 规范化方案（键排序、无空白、数字规范序列化），保证不同团队独立实现的 SDK 算出相同摘要。
- manifest **不含**自身 digest；`requires` 数组**排序去重**（JCS 不排数组序，故排序是规范化的一部分）。
- digest 编码格式：`sha256:<小写 hex>`（沿用 OCI 风格）。blob digest 对原始字节计算，无需规范化。
- **注册表不变量**：`(id, version)` 只能发布一次；以不同 digest 重发同一元组必须拒绝；依赖 digest 参与 manifest 哈希（递归指纹）；消费前必须验证 blob 的 digest 与 size。

**依赖钉住与收集**：创作者工作区中依赖可声明为版本范围（如 `^2.x`，package.json 心智）；SDK 发布时解析为确切版本 + digest 写入 manifest（lockfile 心智），已发布包永远可复现。**包内依赖来源 = 嵌套实例扩展（§6）+ 引用型参数的默认值**；发布时必须做依赖循环检测。

## 6. 负载与结构归属（β 方案）

**结构信息（节点树）只存在于 glb 中，manifest 只存语义** —— 单一真相源。

- **proxy（draft: glb）**：LOD 表示，自足可渲染（v1 贴图内嵌，禁止外部 URI），服务于商城预览与编辑器实时预览。编辑器**永远不下载 full**。
- **full（draft: glb）**：烘焙原材料，高模 + 完整贴图，只在创作者→云端→烘焙后端之间流动。
- **节点锚点**：glb 节点携带 `extras.nook.nodeId`；参数绑定引用该 id。
- **逻辑根约束**：每个包**恰好一个逻辑根节点**。源资产单根 → 直接标记（`extras.nook.packageRoot = true`，保留 nodeId `nook.root`，可被参数绑定寻址，如"壁灯凸出距离"）；多根导出 → SDK 合成 identity 包裹根并同样标记。组合公式无歧义：

  ```
  effectiveRoot = worldAncestors × instancePlacement × storedPackageRoot
  ```

  （叠加语义；storedPackageRoot 为 identity 时自然退化。）
- **嵌套实例编码**：glb 节点携带扩展，节点自身 transform 即 placement，与顶层实例语义递归一致：

  ```jsonc
  { "extras": { "nook": { "prefabInstance": {
      "kind": "prefab", "id": "p_01K4...", "version": "2.0.1",
      "digest": "sha256:...", "params": { "shadeColor": "#AA8844" }
  } } } }
  ```

  职责分离：节点扩展回答"在哪实例化、如何放置、参数值是什么"；manifest.dependencies 回答"必须能解析什么、钉在哪个版本、完整性摘要"。
- **语义组件**：collider / pickable / avatar 占位等 Nook 组件放在节点 `extras.nook.components` 下；标准 glTF 查看器自动忽略。灯使用官方 `KHR_lights_punctual` 扩展；物理类将来对齐 KHR 物理扩展草案。
- **proxy/full 一致性**：两者的组合渲染结果必须一致（在 proxy 精度约束下），这是 **SDK 导出时的校验职责**，不是格式问题。proxy 与 full 由 SDK 同一次导出从同一数据源生成。

## 7. 参数系统（v1）

```jsonc
// ParamDecl
{
  "paramId": "...",            // 迁移锚点，跨版本稳定，SDK 分配，不暴露给创作者
  "displayName": "主色调",      // UI 显示名，可随时改，不产生迁移条目
  "type": "color",             // 见类型表
  "constraints": {},           // 值域（类型相关）
  "default": "#FFD700",
  "bindings": [                // 表示作用域绑定；基数由作者配置，1..n；可指向 transform
    { "representation": "full",
      "nodeId": "n_bulb",
      "propertyPath": "mesh.primitives[2].material.pbrMetallicRoughness.baseColorFactor",
      "required": true },
    { "representation": "proxy",
      "nodeId": "n_bulb_proxy",
      "propertyPath": "mesh.primitives[0].material.pbrMetallicRoughness.baseColorFactor",
      "required": false }
  ]
}
```

**表示作用域绑定规则**（修正 v0 的单一绑定模型）：

- proxy 与 full 是两个独立 glb；手动 proxy 的层级、材质槽、合并方式可与 full 完全不同，**同一路径不保证在两个负载中指向同一语义属性**，因此绑定必须按表示角色分别声明。
- `full` 绑定必须可解析，否则导出 **ERROR**；`proxy` 绑定可缺失（参数在预览不生效，导出 **INFO/WARNING**，创作者知情）。`representation` 枚举可扩展。
- 工具层约定：**格式显式、工具省心**——创作者对源资产绑一次，SDK 常见情况双写两条；自动 proxy 自动推导 proxy 绑定；手动 proxy 由 SDK 映射 UI 让创作者确认。

**路径语言（`nook.path/1`，白名单语义路径）**：

- 根命名空间：`transform`（`translation` / `rotation` / `scale`，glTF 命名）、`mesh.primitives[...].material...`、`nook.components.*`。
- 段语法：点分隔 + `[i]` 数组索引 + 按名段（如 `material.named("BulbGlass")`）——按名段是索引脆弱（primitive/材质重排）时的稳健替代；索引变化时绑定必须在导出时重新验证。
- **可写属性白名单 × 参数类型兼容表**是同一 artifact，同时服务校验与参数 UI 生成；每种目标有预期值类型；转义规则随语法定义。
- 扩展可注册新路径（经能力注册表，§13）。完全任意的 JSON 路径被禁止（破坏验证、跨引擎映射、安全性与类型检查）。

**类型表（v1）**：

| 类型 | 状态 | 值域/约束 | 说明 |
| --- | --- | --- | --- |
| `int` / `float` | ✓ v1 | min / max / step | |
| `bool` | ✓ v1 | — | |
| `string` | ✓ v1 | maxLength? | |
| `enum` | ✓ v1 | options: [{value, label}] | |
| `color` | ✓ v1 | — | |
| `vec2` / `vec3` | ✓ v1 | 分量级 min/max? | |
| `prefabRef` | ✓ v1 | 可限定接受的预制体类型/分类 | 引用型，进依赖闭包 |
| `textureRef` | ⏸ 保留 | 格式/尺寸约束? | v1 不支持；类型名已注册 |
| `materialRef` | ⏸ 保留 | ⚑ 独立材质资产 vs 内联属性组未定 | v1 不支持；类型名已注册 |
| ~~curve / gradient~~ | 挂起 | — | PoC 后议 |

**统一引用封套**：引用型参数值、实例的 prefabRef、manifest 依赖声明同构：

```jsonc
{ "kind": "prefab", "id": "p_...", "version": "1.2.0", "digest": "sha256:..." }
// kind ∈ 注册表: "prefab" | "material" | "texture" | ...
```

规则：

- **引用型参数值会给世界引入新依赖**：收集世界依赖闭包时必须遍历实例参数值，不能只遍历实例引用；包内同理（§5 依赖收集）。
- 实例对参数的赋值 = `{ paramId: value }` 定形数据，校验 trivial，UI 可由类型+约束自动生成（生成规则表后定）。
- 预览端只应用本表示层的绑定（见上）；烘焙端在 full 上应用全部 full 绑定。

## 8. 身份分配

| 身份 | 策略 | 稳定性要求 | 载体 |
| --- | --- | --- | --- |
| blob | 内容哈希（派生） | 内容即身份 | CAS 存储键 |
| prefabId | 组件内嵌持久 | 跨版本、跨导出永远稳定 | 根节点 NookAuthoring 组件，首次"启用 Nook"时分配 |
| paramId | 组件内嵌持久 | 跨版本稳定（迁移锚点） | NookAuthoring 组件内，SDK 声明参数时分配，永不暴露 |
| nodeId | 混合制 | 仅被参数绑定的节点需要 | 绑定表存 NookAuthoring 组件：{paramId → [绑定目标]}；导出时重解析，失败走对账匹配，再失败导出 UI 警告让创作者重新指认 |

- 绝大多数节点不需要跨版本身份；每版本随 glb 结构整体序列化即可。
- **翻车模式与对策**：复制预制体资产导致 prefabId 撞车 → 导出时检测，询问"新预制体 or 覆盖"，新建则现场分配；NookAuthoring 组件被删 → 导出时对账匹配已发布包并提议恢复身份（PoC 后增强）。
- **嵌套引用落地**：从商城下载的预制体在创作者工程里自带身份组件，父预制体引用它时 SDK 直接读到 `id@version`，无需人工映射。
- **运行期无关**：以上身份只在创作期/导出期/注册表使用；运行时（烘焙产物、编辑器预览）使用加载时解析好的直接引用。
- ⚑ 未定：paramId 具体形态（倾向 机器 UUID + 自由 displayName + 可选语义 slug——parameterReplacements 例外通道进一步支持 UUID 取向，见 §10）；对账匹配相似度算法（PoC 仅精确匹配 + 断则警告）；Unreal 侧 NookAuthoring 载体（需工程验证）。

## 9. 实例模型（对世界格式的要求）

世界文件中一个预制体实例的最小记录：

```jsonc
{
  "prefabRef": { "kind": "prefab", "id": "p_01J9Z...", "version": "1.2.0", "digest": "sha256:..." },
  "transform": { /* placement，构建者可改 */ },
  "params": { "paramId": "value" }   // 是否只存非默认值：待定
}
```

- 实例**不允许**自由 override；嵌套预制体的定义内实例（§6 扩展）与此同形递归。
- 同一世界可共存同一 prefabId 的多个版本。
- 世界格式本身（散装内容、灯光、地形等）不在本文范围，待预制体定义稳固后讨论。

## 10. 版本与迁移

- 已发布版本**不可变**；实例钉住版本；升级是构建者显式触发，且**必须存在可选择干预的迁移过程**。
- 升级流程：自动匹配 paramId → diff 审查面板 → 确认后原子切换 → 只下载变化 blob。
- **displayName 变更不产生任何迁移条目**（改名免费）；新 paramId = 新参数身份。

| 版本间变化 | 实例旧值处理 |
| --- | --- |
| displayName / 描述变更 | 安全，直接携带 |
| 约束收窄 | 携带 + clamp，审查面板标记 |
| enum 增选项 | 安全 |
| enum 删/改选项 | 创作者给映射则自动，否则提示手选 |
| int ↔ float | 自动转换 |
| 其余类型变更 | 不可自动 → 审查面板手动填，不填用新默认 |
| 参数删除 | 警告；⚑ 旧值是否保留为死数据（便于回滚），可裁剪 |
| 参数身份替换（例外通道） | manifest `migrationHints.parameterReplacements` → 自动携带；仅用于误重新生成 ID、替换/合并/拆分、创作元数据丢失恢复，**不让随意换 ID 成为常态** |
| 新增参数 | 用创作者默认值，列出即可 |

- ⚑ 未定：版本下架/废弃策略（钉住该版本的世界怎么办）。

## 11. 表示层语义一致性（representation-semantic consistency）

（原 OpenSpec proposal 中 `prefab-runtime-parity` 概念的重命名与精化。）

新架构下各消费方读取**不同表示**（proxy / full / 烘焙产物），渲染结果**本来就不该相同**（LOD 是设计使然）。"parity"所暗示的表示层对等既不是目标也不可能达到。必须一致的不变量是：

1. **参数语义一致**：同一参数值，在每个表示层**其绑定声明的范围内**产生相同语义效果（路径不同，语义相同）。
2. **组合数学一致**：`ancestors × placement × storedPackageRoot` 在每个消费方算出同一个世界变换。
3. **身份/版本语义一致**：实例在哪都指同一个 `id@version@digest`；迁移规则行为一致。
4. **诊断语义一致**：同一份非法文档在不同实现中产出同样的诊断码。

明确**不要求**：像素/渲染等价；相同内部数据结构；proxy 呈现未声明 proxy 绑定的参数效果。

可测性：无需渲染的夹具断言（节点存在性、变换值、材质值、组件标志、诊断码）——本地验证 PoC 的核心手段。

## 12. 验证、诊断与安全

包是**不可信交换工件**。验证器应使用经受考验的 glTF 解析库（二进制解析面），不得自研解析。

**清单检查**：spec 主版本受支持；id/version 合法（semver）；依赖全部钉死且无重复元组；依赖无环；paramId 唯一；默认值满足约束；绑定与值类型兼容；`requires ⊇ 实际使用`且排序去重；未知必需能力缺失。

**归档与 blob 检查**：digest/size 不符；blob 缺失或多余；ZIP 路径穿越；重复归档路径；ZIP 炸弹与解压上限；manifest 尺寸上限；节点/图元/贴图数量上限；禁止外部 URI（v1）；glb 格式错误；不支持的扩展；脚本或可执行负载。

**严重级别策略**：

| 级别 | 含义 |
| --- | --- |
| ERROR | 包无法导入、发布或烘焙 |
| WARNING | 包有效，但预览或迁移行为降级 |
| INFO | 兼容性或优化建议 |

稳定的、机器可读的**诊断码是契约的一部分**（如 `NOOK-UNSUPPORTED-CAPABILITY`），保证 §11 第 4 条不变量。

## 13. 前向兼容

**消费者三层行为**：

```
① 未知可选元数据 / 未知可选 payload 槽
   → 保留 + 忽略（payload 槽除非被明确请求）
② requires 中出现消费者不认识的能力（参数类型/组件/路径特性）
   → 默认拒绝：NOOK-UNSUPPORTED-CAPABILITY
   → 角色化降级可选：检查工具可强制打开，预览可只渲染 proxy；
     但不允许配置实例、不允许再发布（"不支持配置"状态的精确定义）
③ 任何情况下的往返保留
   → 重新序列化时必须原样携带未知字段与未知类型的参数值
```

**能力注册表与 `requires` 治理**：

- 命名空间：`nook.parameter/<type>@<v>`、`nook.component/<name>@<v>`、`nook.path@<v>` 等；各能力**独立版本化**。
- `requires` 由 SDK 从实际使用**机械生成**；验证器强制 `requires ⊇ 实际使用`，漏报 = 包校验 ERROR（制度上消灭漂移）。
- 实验前缀 `x.*` 保留；发布到商城的包禁止携带实验能力（注册表治理策略）。
- 能力支持**按消费者各自独立**：灰度发布期旧版编辑器打开含新包的世界，得到干净降级而非数据损坏。

**演进机制决策矩阵**：

| 变更 | 机制 |
| --- | --- |
| 新增参数类型 / 组件 / payload 槽 | 注册表新增条目；spec 版本不动；旧消费者按 ② 降级 |
| 某能力值域不兼容变更 | 该能力版本 +1（如 `color@2`） |
| manifest 自身结构破坏 | `nook.prefab` 主版本 +1；拒绝更高主版本（沿用旧规则） |

## 14. 存储与传输

规范模型是 manifest + CAS blobs，存在两种无损互转的物理序列化：

**线上形态（wire，OCI 式）**：manifest 是 API 对象，blob 是独立寻址对象。

```
编辑器安装 / 商城预览:  GET manifest → payloads.proxy.digest → GET blob（按 digest 永缓存）
烘焙后端:              GET manifest → full blob → 沿 dependencies 递归解析闭包
升版:                  GET 新 manifest → diff digest → 只下载变化的 blob
```

**归档形态（archive）**：`.nookpkg`（zip）= **单个包 + 该包自有负载**，用于导入/导出/备份/单包离线传递；**不是依赖闭包自包含**。

```
wall-lamp_1.2.0.nookpkg
├── manifest.json
└── blobs/
    ├── sha256_a1...glb   (proxy)
    └── sha256_b2...glb   (full)
```

未来可定义 `.nookbundle`（根包 + 完整传递依赖闭包）；当前只登记区分，不定义。

**上传（draft：甲方案）**：SDK 打一个 .nookpkg 整包上传，服务端拆入 CAS。协议设计与乙方案（blob 逐个推、已有 digest 跳过，OCI push 式）兼容；将来 SDK 升级不改服务端语义。

**编辑器本地缓存**：CAS 存储（digest 为文件名）+ 索引（`id@version → manifest`），pnpm store 心智；暖缓存下可离线编辑。

## 15. 非目标（v0.1 明确不做 / 延期）

| 项 | 状态 |
| --- | --- |
| 自定义着色器与运行时可编程性的长期定位 | ⚑ Lark 级产品问题，单独立案 |
| 参数烘焙后运行时动态性 | ⏸ 复杂，PoC 后推进 |
| 参数 UI 生成规则大表 | ⏸ 需专门讨论 |
| `materialRef` 语义（独立资产 vs 内联属性组） | ⏸ 保留类型，v1 不支持；待周边讨论 |
| `textureRef` 实现 | ⏸ 保留类型，v1 不支持 |
| curve / gradient 参数类型 | ⏸ PoC 后议 |
| 世界/场景文件格式（含散装内容问题） | ⚑ 预制体稳固后讨论 |
| 贴图抽离为独立 blob（跨包去重） | ⏸ v1 内嵌自足，按数据决定 |
| `.nookbundle`（依赖闭包归档） | ⏸ 只登记区分，不定义 |
| 版本下架/废弃策略 | ⚑ 待定 |
| 对账匹配启发式算法 | ⏸ PoC 后增强 |
| Unreal 侧 SDK 载体验证 | ⏸ 工程验证 |
| SDK 本地预览/模拟器 | ⚑ 产品问题，待定 |
| 付费/授权资产 | ⏸ 超出当前范围 |
