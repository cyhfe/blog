# 部署

<!-- ## pm2 进程管理

```bash
npm i pm2 -d
```

```json
{ "start": "tsc && pm2 start dist/index.js" }
``` -->

## docker compose

```yaml
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["node", "dist/index.js"]
EXPOSE 3000
```

```bash
docker build -t api
docker run -dp 3000:3000 api
```

## 切换到 compose

```yaml
FROM node:18-alpine
ENV PORT=3002
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["node", "dist/index.js"]
EXPOSE 3002
```

```yaml
services:
  app:
    build: .
    ports:
      - 3002:3002
    working_dir: /app
```
