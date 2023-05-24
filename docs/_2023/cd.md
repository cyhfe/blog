# 自动化部署

```bash
server {
    listen       80;
    server_name  chenyuhao.site;

    root   /usr/share/nginx/html;
    index  index.html index.htm;

    location / {
        # 解决单页应用服务端路由的问题
        try_files  $uri $uri/ /index.html;

        # 非带 hash 的资源，需要配置 Cache-Control: no-cache，避免浏览器默认为强缓存
        expires -1;
    }

    location /assets {
        # 带 hash 的资源，需要配置长期缓存
        expires 1y;
    }
}

# 3000
server {
    listen       80;
    server_name  ui.chenyuhao.site;

    location / {
     proxy_pass http://43.156.65.234:3000;
    }
}
```

```bash
FROM node:18-alpine as builder

WORKDIR /code

ADD package.json package-lock.json /code/
RUN npm install

ADD . /code
RUN npm run build

FROM nginx:alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder code/dist /usr/share/nginx/html
```

```bash
version: "1"
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 80:80

```

自建 runner

```bash
name: Docker Image CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:

  build:

    runs-on: self-hosted

    steps:
    - uses: actions/checkout@v3
    - name: Build the Docker image
      run: sudo docker-compose up --build -d
```

https://docs.github.com/en/enterprise-server@3.4/actions/hosting-your-own-runners/managing-self-hosted-runners/configuring-the-self-hosted-runner-application-as-a-service