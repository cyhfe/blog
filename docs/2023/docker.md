# Docker

## cheat sheet

```bash
# --rm 停止后删除container. 每次 docker run都会产生一个 container
# -p host:contianer
# -d 以分离模式运行
# -i Keep STDIN open even if not attached
# -t Allocate a pseudo-TTY

docker run -d -it --rm -p 3000:80 nginx:alpine


docker attach <contianerId>
docker logs 9b9
docker exec -it 9b9 sh

# Nginx 配置文件
cat /etc/nginx/conf.d/default.conf

# 将 commitId 作为Tag
docker build -t simple-app:$(git rev-parse --short HEAD)
```

## simple app

### dockerfile

```bash
# Dockerfile

FROM node:18-alpine

WORKDIR /code

ADD . /code/

RUN npm install

EXPOSE 3000

CMD npm start

```

```bash
# build image
docker build -t simple-app .

# run container
docker run --rm -p 3000:3000 simple-app
```

### docker-compose

```bash
version: "3"
services:
  app:
    # build: 从当前路径构建镜像
    build: .
    ports:
      - 3000:3000
```

```bash
# up: 创建并启动容器
# --build: 每次启动容器前构建镜像
docker-compose up --build
```

```bash
version: "3"
services:
  node-app:
    build:
      context: .
      dockerfile: node.Dockerfile
    ports:
      - 3000:3000
  nginx-app:
    build:
      context: .
      dockerfile: nginx.Dockerfile
    ports:
      - 4000:80
```
