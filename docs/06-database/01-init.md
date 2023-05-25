# docker Postgres 环境搭建

docker 搭建环境真是太方便了,不管是学 Nginx 还是 SQL.

## docker compose

```yaml
# compose.yaml

services:
  db:
    image: postgres
    container_name: postgres
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PW}
    volumes:
      - pgdata:/var/lib/postgresql/data
  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin4
    restart: always
    ports:
      - "5050:80"
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_MAIL}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_PW}
    volumes:
      - pgadmin-data:/var/lib/pgadmin

volumes:
  pgdata:
  pgadmin-data:
```

```txt
# .env
POSTGRES_USER=postgres
POSTGRES_PW=123
POSTGRES_DB=postgres
PGADMIN_MAIL=a@b.mail
PGADMIN_PW=123
```

```bash
docker-compose -p pg up --build -d
```

## pgadmin

pgadmin 通过 localhost 连接不上, 必须通过 docker ip

```bash
docker inspect postgres | grep IPAddress
```

## psql

psql

```bash
docker exec -it postgres bash

psql -U postgres

create database test

\c test

\d \g \l \q
```
