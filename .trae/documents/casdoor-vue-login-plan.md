# Casdoor 前端登录系统实现计划

## 一、需求概述

构建一套与 Casdoor 后端对接的 Vue 3 前端认证系统，包含登录页、注册页、个人信息页三个核心页面。

## 二、技术栈

- **前端框架**: Vue 3 (Composition API) + Vite
- **路由**: Vue Router 4
- **HTTP 客户端**: Axios
- **Casdoor SDK**: casdoor-js-sdk
- **样式**: 自定义 CSS (vilinko 样式系统)
- **CDN**: Cloudflare CDN

## 三、当前状态分析

- 工作区为空，需要从零创建项目
- 已提供详细的 CSS 样式系统 (vinaui.min.css)
- 已明确 Casdoor 配置和 API 对接方案
- 已提供三个页面的设计要求

## 四、项目结构

```
/workspace/
├── index.html                 # 入口 HTML
├── package.json               # 项目配置
├── vite.config.js             # Vite 配置
├── src/
│   ├── main.js                # 主入口文件
│   ├── App.vue                # 根组件
│   ├── router/
│   │   └── index.js           # 路由配置
│   ├── services/
│   │   ├── casdoor.js         # Casdoor SDK 配置与初始化
│   │   └── auth.js            # 认证服务封装
│   ├── views/
│   │   ├── Login.vue          # 登录页
│   │   ├── Register.vue       # 注册页
│   │   ├── Profile.vue        # 个人信息页
│   │   └── ForgotPassword.vue # 忘记密码页
│   ├── components/
│   │   └── Footer.vue         # 页脚组件
│   └── assets/
│       ├── min.css            # Vilinko 样式系统
│       └── styles.css         # 页面自定义样式
```

## 五、具体实现步骤

### 步骤 1: 初始化项目配置

**文件: package.json**
- 配置 Vue 3, Vite, Vue Router 4, Axios, casdoor-js-sdk 依赖

**文件: vite.config.js**
- 配置 Vue 插件、代理（开发环境）

**文件: index.html**
- 引入 Cloudflare CDN 的 Vue、Vue Router
- 引入 Vilinko 样式系统

### 步骤 2: Casdoor SDK 配置

**文件: src/services/casdoor.js**
- 初始化 Casdoor SDK
- 导出 `initCasdoor()` 方法
- 配置 serverUrl, clientId, appName, organizationName
- 配置 redirectPath

**文件: src/services/auth.js**
- `login(username, password)` - 登录方法
- `signup(user)` - 注册方法
- `getAccount()` - 获取当前用户信息
- `updateAccount(user)` - 更新用户信息
- `changePassword(oldPassword, newPassword)` - 修改密码
- `logout()` - 退出登录
- `forgotPassword(email)` - 忘记密码

### 步骤 3: 路由配置

**文件: src/router/index.js**
```
/login          -> Login.vue
/register       -> Register.vue
/profile        -> Profile.vue
/forgot-password -> ForgotPassword.vue
/               -> 重定向到 /login
```

### 步骤 4: 登录页实现

**文件: src/views/Login.vue**
- 用户名/邮箱输入框 (.vilinko-input)
- 密码输入框
- "记住我" 复选框
- 登录按钮 (.vilinko-button.vilinko-button-primary)
- "注册账号" 链接 -> /register
- "忘记密码" 链接 -> /forgot-password
- 调用 Casdoor SDK 登录
- 表单验证
- 错误提示
- Loading 状态

### 步骤 5: 注册页实现

**文件: src/views/Register.vue**
- 用户名输入框
- 邮箱输入框
- 密码输入框
- 确认密码输入框
- 注册按钮
- "已有账号? 去登录" 链接 -> /login
- 调用 Casdoor 注册 API
- 表单验证（密码匹配、邮箱格式）
- 错误提示

### 步骤 6: 忘记密码页实现

**文件: src/views/ForgotPassword.vue**
- 邮箱输入框
- 发送重置链接按钮
- "返回登录" 链接 -> /login
- 调用 Casdoor 忘记密码 API

### 步骤 7: 个人信息页实现

**文件: src/views/Profile.vue**
- 头像显示区域
- 用户名（只读）
- 邮箱（只读）
- 身份/角色显示
- 密码修改区域（当前密码、新密码、确认密码）
- 保存修改按钮
- 退出登录按钮
- 调用 Casdoor API 获取用户信息
- 更新用户信息
- 修改密码

### 步骤 8: 页脚组件

**文件: src/components/Footer.vue**
```
Copyright © 2019 - 2026 Vilinko Studio. All rights reserved
```

### 步骤 9: CSS 样式

**文件: src/assets/min.css**
- 使用提供的 Vilinko 样式系统

**文件: src/assets/styles.css**
- 页面通用样式
- 表单布局样式
- 响应式设计样式

### 步骤 10: 主入口和根组件

**文件: src/main.js**
- 引入 Vue、Vue Router
- 引入路由配置
- 引入 Casdoor SDK 初始化
- 挂载应用

**文件: src/App.vue**
- 路由视图
- 页脚组件

## 六、Casdoor 配置

```javascript
const casdoorConfig = {
  serverUrl: 'https://your-casdoor-domain.com',
  clientId: 'your-client-id',
  appName: 'YourApp',
  organizationName: 'your-org',
  redirectPath: '/callback',
}
```

## 七、设计规范

### 登录/注册页
- 居中卡片式布局
- 卡片最大宽度 400px
- 圆角卡片 + 微妙的阴影
- 适当的内边距和间距

### 个人信息页
- 顶部头像区域
- 表单式信息展示
- 分区块展示不同类型信息

### 响应式设计
- 移动端适配
- 最小宽度支持

## 八、验证步骤

1. 安装依赖: `npm install`
2. 启动开发服务器: `npm run dev`
3. 验证各页面功能:
   - 登录页面正常显示
   - 注册页面正常显示
   - 忘记密码页面正常显示
   - 个人信息页面正常显示
   - 路由跳转正常
   - 表单验证正常
   - Loading 状态正常
   - 错误提示正常
4. 样式验证:
   - Vilinko 样式系统正常应用
   - 响应式布局正常
   - 交互效果正常
