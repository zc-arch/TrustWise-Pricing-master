# TrustWise - 硫磺价格预测与决策辅助系统

本项目是一个面向采购决策场景的业务系统，围绕「硫磺价格预测 + 知识资产管理 + AI 决策助手」建设。

核心目标：

- 统一管理宜化资料、图表、文献、代码资产
- 将静态文件预处理后入库，形成可检索、可统计的数据资产
- 在仪表盘与知识图谱页面中进行可视化展示，提升决策效率
- AI 决策助手提供智能采购建议

---

## 一、功能总览

### 1) 仪表盘

- 价格概览卡片（当前价、均价、建议动作）
- 价格趋势图（近 60 天 + 预测走势）
- 宜化知识库统计面板（文档、数据表、图表、文献）

### 2) 代码知识图谱

- 多层关系：目录 -> 类型 -> 主题 -> 文件
- 本体视图切换：业务本体 / 算法本体 / 数据本体
- 交互能力：缩放、平移、节点拖拽、Shift 框选、固定节点、局部高亮
- 视觉能力：默认主题 / 黑金大屏主题
- 导出能力：SVG / PNG

### 3) Agent 决策助手

- 多轮对话问答
- 硫磺采购专业建议
- 生成采购报告
- 对话历史保存（需登录）
- 快捷提问功能

---

## 二、技术栈

- 前端：Next.js 16 (App Router) + React 19 + TypeScript
- UI：自定义组件 + Lucide 图标 + Recharts + Tailwind CSS
- 数据层：PostgreSQL + Drizzle ORM + Drizzle Kit
- 状态/请求：TanStack Query
- AI：七牛云 API (GLM-5 模型)

---

## 三、目录与关键文件

### 核心页面
- `src/app/(dashboard)/dashboard/page.tsx`：仪表盘页面
- `src/app/(dashboard)/yihua-code-graph/page.tsx`：代码知识图谱页面
- `src/app/(dashboard)/agent-chat/page.tsx`：Agent 决策助手页面

### 组件
- `src/components/logo.tsx`：项目 Logo 组件（带文字）
- `src/components/logo-icon.tsx`：项目 Logo 图标组件（纯图标）
- `src/components/app-sidebar.tsx`：侧边栏导航
- `src/components/top-nav.tsx`：顶部导航栏
- `src/components/yihua-code-graph.tsx`：图谱核心渲染与交互

### 服务与工具
- `src/services/yihua-code-graph.ts`：图谱数据聚合与本体模板
- `src/services/yihua-knowledge.ts`：知识库统计服务
- `src/lib/yihua-preprocess.ts`：文献/资料预处理逻辑
- `src/lib/system-prompt.ts`：AI 系统提示词配置
- `src/lib/report-generator.ts`：采购报告生成器

### API
- `src/app/api/chat/route.ts`：AI 对话 API（七牛云）
- `src/app/api/yihua/code-graph/route.ts`：图谱 API
- `src/app/api/yihua/knowledge/route.ts`：知识库统计 API

### 数据库
- `src/db/schema.ts`：数据表定义
- `scripts/seed-yihua-knowledge.ts`：知识库元数据入库
- `scripts/seed-yihua-code.ts`：代码资产元数据入库

---

## 四、环境准备

### 1) 安装依赖

```bash
npm install
```

### 2) 配置环境变量（`.env.local`）

```bash
# 七牛云 API Key（AI 对话功能）
OPENROUTER_API_KEY=sk-xxxxxxxxxxxxxxxx

# 数据库连接
DATABASE_URL=postgresql://postgres:password@localhost:5432/sulfur_agent

# 认证配置
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=please_use_a_real_secret

# 环境
NODE_ENV=development
```

> 注意：`BETTER_AUTH_SECRET` 请务必使用真实安全值，避免默认 secret 警告。

---

## 五、本地运行

```bash
npm run dev
```

访问：

- 仪表盘：`http://localhost:3000/dashboard`
- 知识图谱：`http://localhost:3000/yihua-code-graph`
- Agent 决策助手：`http://localhost:3000/agent-chat`

---

## 六、数据库初始化与数据导入

### 1) 生成/同步数
npm run db:seed:yihua
```

### 3) 导入代码资产元数据（代码目录）

```bash
npm run db:seed:yihua-code
```

---

## 七、脚本命令

```bash
npm run dev             # 本地开发
npm run build           # 生产构建检查
npm run start           # 生产模式启动
npm run lint            # 代码检查
npm run db:generate     # 生成 drizzle 迁移
npm run db:push         # 同步表结构到数据库
npm run db:seed:yihua   # 导入知识库元数据
npm run db:seed:yihua-code # 导入代码资产元数据
```

---

## 八、核心 API

### 价格相关
- `GET /api/prices`：价格列表
- `GET /api/prices/summary`：价格摘要

### 库存相关
- `GET /api/inventory`：库存列表
- `GET /api/inventory/summary`：库存摘要

### 知识库相关
- `GET /api/yihua/knowledge`：知识库统计
- `GET /api/yihua/code-graph`：代码图谱数据

### AI 对话
- `POST /api/chat`：AI 对话接口

图谱 API 关键参数：

- `topFolder`: 目录筛选
- `kind`: 类型筛选（python/notebook/matlab/markdown）
- `theme`: 主题筛选（LSTM/ARIMA/EEMD 等）
- `ontologyView`: 本体视图（business/algorithm/data）
- `q`: 关键词
- `maxFiles`: 最大文件节点数

---

## 九、AI 配置说明

### 七牛云 API 配置

本项目使用七牛云 AI 推理平台，支持多种大模型：

- **API 地址**：`https://api.qnaigc.com/v1`
- **当前模型**：`z-ai/glm-5`

### 修改 AI 模型

编辑 `src/app/api/chat/route.ts`：

```typescript
const QINIU_API_URL = "https://api.qnaigc.com/v1/chat/completions"

// 修改模型名称
model: "z-ai/glm-5"  // 或其他支持的模型
```

### 修改系统提示词

编辑 `src/lib/system-prompt.ts` 自定义 AI 行为。

---

## 十、常见问题

### 1) `ECONNREFUSED 5432`

数据库未启动或连接串错误，检查 `DATABASE_URL` 与 PostgreSQL 服务状态。

### 2) `BETTER_AUTH_SECRET` 默认值警告

请在 `.env.local` 中配置真实 `BETTER_AUTH_SECRET`。

### 3) 图谱无数据

先确认已执行：

```bash
npm run db:push
npm run db:seed:yihua-code
```

### 4) AI 对话报错 "bad token"

检查 `.env.local` 中的 `OPENROUTER_API_KEY` 是否正确配置。

### 5) AI 对话报错 "no available channels for model"

模型名称不正确，请确认七牛云支持的模型 ID。

---

## 十一、团队成员协作

### 获取最新代码

```bash
git pull origin master
```

### 提交更改

```bash
git add .
git commit -m "描述你的更改"
git push origin master
```

---

## 十二、说明

本 README 为项目当前业务化版本说明，后续若新增模块（如自动训练、模型评估、数据质量看板），请同步更新本文件，确保团队成员可快速上手与交接。
