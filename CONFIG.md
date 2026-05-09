# Casdoor 前端登录系统配置指南

## 配置 Casdoor

在使用本系统之前，你需要配置正确的 Casdoor 服务器信息。

### 1. 修改 Casdoor 配置

编辑 `src/services/casdoor.js` 文件，修改以下配置：

```javascript
export const casdoorConfig = {
  serverUrl: 'https://your-casdoor-domain.com',  // 替换为你的 Casdoor 服务器地址
  clientId: 'your-client-id',                      // 替换为你的应用 Client ID
  appName: 'YourApp',                              // 替换为你的应用名称
  organizationName: 'your-org',                   // 替换为你的组织名称
  redirectPath: '/callback',
  scope: 'read',
  state: 'casdoor'
}
```

### 2. 获取配置信息

1. 登录 Casdoor 管理后台
2. 进入 "Applications" 页面
3. 找到你的应用，复制以下信息：
   - `Client ID`
   - `App Name`
4. 进入 "Organizations" 页面，获取 `Organization Name`

### 3. 配置应用回调地址

在 Casdoor 管理后台，配置应用的回调地址（Redirect URLs）：
- 开发环境：`http://localhost:5173/callback`
- 生产环境：`https://your-domain.com/callback`

### 4. 启动项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## API 端点说明

### 登录 API
- **端点**: `POST /api/login`
- **参数**: `username`, `password`, `responseType: 'login'`
- **返回**: Token 和用户信息

### 注册 API
- **端点**: `POST /api/signup`
- **参数**: `username`, `password`, `email`, `organization`, `app`

### 获取用户信息
- **端点**: `GET /api/get-account`
- **参数**: `owner`, `name`

### 修改密码
- **端点**: `POST /api/update-account`
- **参数**: `owner`, `name`, `oldPassword`, `newPassword`

### 忘记密码
- **端点**: `POST /api/reset-password`
- **参数**: `email`, `organization`

## 路由说明

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | - | 重定向到 `/login` |
| `/login` | 登录页 | 用户登录 |
| `/register` | 注册页 | 用户注册 |
| `/forgot-password` | 忘记密码页 | 重置密码 |
| `/profile` | 个人信息页 | 查看和修改个人信息（需登录）|

## 样式系统

本项目使用自定义的 Vilinko 样式系统：

- `.vilinko-control` - 基础控件样式
- `.vilinko-button` - 按钮样式
- `.vilinko-button-primary` - 主按钮样式
- `.vilinko-input` - 输入框样式
- `.vilinko-card` - 卡片样式

### CSS 变量

```css
:root {
    --vilinko-primary-color: #5279fb;
    --vilinko-bg-gray: #f9fafb;
    --vilinko-border-color: #e5e7eb;
    --vilinko-text-main: #1f2937;
    --vilinko-btn-radius: .75rem;
    --vilinko-nav-radius: 1.25rem;
}
```
