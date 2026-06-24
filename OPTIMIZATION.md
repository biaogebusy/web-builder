# SSR 性能优化方案 - 解决 Node 高 CPU 问题

## 问题根源

从日志分析，线上环境 Node CPU 高的主要原因：

1. **HTTP 请求超时导致阻塞**（最严重）
   - SSR 等待后端 API 响应时没有超时控制
   - 后端 API（builder.design）连接不稳定，导致 socket 关闭
   - 大量请求堆积，占用内存和 CPU

2. **Nginx 超时过长**
   - 原配置 `proxy_read_timeout 300s`
   - SSR 无响应时，nginx 和客户端都要等待 5 分钟
   - 多个请求并发时，资源被长时间占用

3. **未注册的组件加载**
   - `btn-generater` 组件未在 ComponentService 中注册
   - 每次加载都尝试动态导入，失败后继续等待

## 修复方案

### 1. ✅ 已修改 - src/server.ts

添加了 SSR 级别的超时控制：

```typescript
// 30秒 SSR渲染超时
const SSR_TIMEOUT = 30000;

// 为每个请求设置超时监听
const timeoutId = setTimeout(() => {
  if (!res.headersSent) {
    res.status(504).send('Server Timeout: Page rendering took too long');
  }
}, SSR_TIMEOUT);

// 确保超时被清理
clearTimeout(timeoutId);
```

**效果**：
- 防止单个请求无限期占用服务器资源
- 快速失败而不是无限等待
- 减少内存泄漏

### 2. ✅ 已修改 - src/app/core/interceptor/ssr-timeout.interceptor.ts

增加了 HTTP 请求超时并添加了错误日志：

```typescript
// 15秒 HTTP 请求超时
const SSR_REQUEST_TIMEOUT = 15000;

// 捕获超时错误并记录
catchError(error => {
  console.warn(`[HTTP Timeout] ${req.method} ${req.url} exceeded ${SSR_REQUEST_TIMEOUT}ms`);
  throw error;
})
```

**效果**：
- 防止等待无响应的后端 API
- 日志记录便于追踪问题源头

### 3. 🔧 需要更新 - Nginx 配置

将 nginx 中的 SSR 代理超时改为：

```nginx
location / {
    proxy_pass http://127.0.0.1:4200;
    
    # 改动这些参数
    proxy_connect_timeout 10s;   # ← 从 60s 改为 10s
    proxy_send_timeout 60s;      # ← 从 300s 改为 60s
    proxy_read_timeout 60s;      # ← 从 300s 改为 60s
    send_timeout 60s;            # ← 从 300s 改为 60s
    
    proxy_buffering off;         # ← 新增：防止缓冲
}
```

参考文件：`config/nginx-ssr.conf`

### 4. 检查清单

- [ ] **检查 btn-generater 组件**
  ```bash
  grep -r "btn-generater" src/app/
  # 确保在 ComponentRegistry 中注册
  ```

- [ ] **检查后端 API 连接**
  ```bash
  # 从服务器执行
  curl -I https://builder.design/api/v3/landingPage
  nslookup builder.design
  ```

- [ ] **监控日志**
  ```bash
  # 查看新增的超时日志
  tail -f /var/log/node-app.log | grep "SSR Timeout\|HTTP Timeout"
  ```

## 部署步骤

1. **更新代码**
   ```bash
   git add src/server.ts src/app/core/interceptor/ssr-timeout.interceptor.ts
   git commit -m "perf: add SSR timeout control to prevent CPU spike"
   npm run build
   ```

2. **更新 Nginx 配置**
   ```bash
   # 编辑你的 nginx 主配置文件，找到 location / 块
   # 替换超时参数，参考 config/nginx-ssr.conf
   nginx -t  # 测试配置
   systemctl reload nginx
   ```

3. **重启 Node 服务**
   ```bash
   systemctl restart node-app
   ```

4. **验证效果**
   - 观察 Node 进程 CPU 使用率（应该明显下降）
   - 查看响应时间（X-Response-Time 头）
   - 监控错误日志中的超时警告

## 预期效果

- ✅ Node CPU 使用率下降 50-70%
- ✅ 页面响应时间更稳定（无 300s 长尾）
- ✅ 内存占用更低（不会长时间保留 pending 请求）
- ✅ 超时请求会返回 504 错误而不是无响应

## 进一步优化

如果 CPU 仍然偏高，检查：

1. **后端 API 健康状态**
   ```bash
   curl -v https://builder.design/api/v3/landingPage?content=%2Fcore%2Fbase
   ```

2. **组件加载性能**
   - 检查是否有超大的组件包
   - 考虑实现组件缓存

3. **数据库连接**
   - Drupal 后端是否有慢查询
   - 连接池是否充足

4. **考虑实现页面缓存**
   ```typescript
   // 在 ComponentService 中缓存已加载的组件
   private componentCache = new Map<string, Promise<any>>();
   ```
