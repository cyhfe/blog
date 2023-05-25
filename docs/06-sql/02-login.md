# SQL 必知必会

## 检索数据

```sql
-- 只返回不同行.唯一性,作用于所有列
SELECT DISTINCT vend_id
FROM Products;

-- 限制结果
SELECT prod_name
FROM Products
LIMIT 5;

```

## 排序检索数据

```sql
-- 排序数据
SELECT prod_name
FROM Products
ORDER BY prod_name;

-- 按多个列排序
SELECT prod_id, prod_price, prod_name
FROM Products
ORDER BY prod_price, prod_name;

-- 按列位置排序
SELECT prod_id, prod_price, prod_name
FROM Products
ORDER BY 2, 3;

-- 指定排序方向
SELECT prod_id, prod_price, prod_name
FROM Products
ORDER BY prod_price DESC;
```

## 过滤数据

```sql
-- 使用 WHERE 子句
SELECT prod_name, prod_price
FROM Products
WHERE prod_price = 3.49;

-- 检查单个值
SELECT prod_name, prod_price
FROM Products
WHERE prod_price < 10;

-- 不匹配检查
SELECT vend_id, prod_name
FROM Products
WHERE vend_id <> 'DLL01';

-- 范围值检查
SELECT prod_name, prod_price
FROM Products
WHERE prod_price BETWEEN 5 AND 10;

-- 空值检查
SELECT prod_name
FROM Products
WHERE prod_price IS NULL;

```

## 高级数据过滤
