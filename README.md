# TimeNest 官方网站

这是 TimeNest 项目的官方网站，托管在 GitHub Pages 上。

## 🌐 网站地址

- **主站**: https://ziyi127.github.io/TimeNest/
- **备用**: https://timenest.github.io/ (如果配置了自定义域名)

## 📁 文件结构

```
docs/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # JavaScript 交互脚本
├── assets/             # 资源文件夹
│   ├── favicon.svg     # 网站图标
│   └── ...             # 其他图片资源
└── README.md           # 本说明文件
```

## 🚀 部署说明

### GitHub Pages 自动部署

1. 确保所有文件都在 `docs/` 文件夹中
2. 在 GitHub 仓库设置中启用 GitHub Pages
3. 选择 `docs` 文件夹作为源
4. 网站将自动部署到 `https://用户名.github.io/仓库名/`

### 本地开发

由于这是静态网站，可以直接在浏览器中打开 `index.html` 文件进行预览。

为了更好的开发体验，建议使用本地服务器：

```bash
# 使用 Python 3
python -m http.server 8000

# 使用 Node.js (需要安装 http-server)
npx http-server

# 使用 PHP
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`

## 🎨 设计特色

### 视觉设计
- **深色主题**: 采用深色背景配合霓虹色彩
- **渐变效果**: 使用现代CSS渐变营造科技感
- **动态背景**: Particles.js 粒子效果
- **响应式设计**: 完美适配移动端和桌面端

### 交互效果
- **平滑滚动**: 锚点链接平滑滚动
- **悬停动画**: 按钮和卡片悬停效果
- **加载动画**: 数字计数器动画
- **实时时钟**: 浮窗演示中的实时时间显示

### 技术特性
- **纯静态**: 无需服务器端处理
- **快速加载**: 优化的资源加载
- **SEO友好**: 完整的meta标签
- **无障碍**: 语义化HTML结构

## 🔧 自定义配置

### 修改内容

1. **项目信息**: 编辑 `index.html` 中的文本内容
2. **样式调整**: 修改 `style.css` 中的CSS变量
3. **交互功能**: 在 `script.js` 中添加新的JavaScript功能

### 颜色主题

在 `style.css` 的 `:root` 选择器中定义了颜色变量：

```css
:root {
    --primary-color: #00d4ff;      /* 主色调 */
    --secondary-color: #ff6b6b;    /* 次要色调 */
    --accent-color: #4ecdc4;       /* 强调色 */
    --bg-primary: #0a0a0a;         /* 主背景色 */
    --bg-secondary: #1a1a1a;       /* 次要背景色 */
    /* ... 更多颜色变量 */
}
```

### 添加新页面

1. 创建新的HTML文件
2. 引入相同的CSS和JS文件
3. 在导航菜单中添加链接

## 📱 响应式断点

- **桌面端**: > 768px
- **平板端**: 481px - 768px  
- **手机端**: ≤ 480px

## 🔗 外部依赖

- **Particles.js**: 粒子背景效果
- **Font Awesome**: 图标库
- **Google Fonts**: Orbitron 和 Rajdhani 字体

所有依赖都通过CDN加载，确保快速访问和高可用性。

## 🐛 问题排查

### 常见问题

1. **粒子效果不显示**
   - 检查 Particles.js CDN 是否正常加载
   - 确认浏览器支持 Canvas API

2. **字体未正确显示**
   - 检查 Google Fonts CDN 连接
   - 确认网络连接正常

3. **移动端显示异常**
   - 检查 viewport meta 标签
   - 验证CSS媒体查询

### 性能优化

- 图片使用 WebP 格式（如果支持）
- 启用 gzip 压缩
- 使用 CDN 加速静态资源
- 延迟加载非关键资源

## 📄 许可证

本网站代码遵循  许可证，可自由使用和修改。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进网站！

### 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

**TimeNest Team** - 让时间管理更智能 ⏰
