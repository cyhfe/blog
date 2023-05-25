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

```sql
-- AND操作符
SELECT prod_id, prod_price, prod_name
FROM Products
WHERE vend_id = 'DLL01' AND prod_price <= 4;

-- OR操作符
SELECT prod_id, prod_price, prod_name
FROM Products
WHERE vend_id = 'DLL01' OR vend_id = 'BRS01';

-- 在处理 OR 操作符前，优先处理 AND 操作符, 括号对操作符进行明确分组

-- IN操作符
SELECT prod_name, prod_price
FROM Products
WHERE vend_id  IN ('DLL01','BRS01')
ORDER BY prod_name;


-- NOT操作符
SELECT prod_name
FROM Products
WHERE NOT vend_id = 'DLL01'
ORDER BY prod_name;

```

## 用通配符进行过滤

```sql
-- 百分号(%)通配符
SELECT prod_id, prod_name
FROM Products
WHERE prod_name LIKE '%bean bag%';

-- 下划线(_)通配符,只匹配单个
SELECT prod_id, prod_name
FROM Products
WHERE prod_name LIKE '__ inch teddy bear';

-- 方括号([])通配符
SELECT cust_contact
FROM Customers
WHERE cust_contact LIKE '[^JM]%' ORDER BY cust_contact;
```

## 计算字段

> 客户端与服务器的格式
> 在 SQL 语句内可完成的许多转换和格式化工作都可以直接在客户端 应用程序内完成。但一般来说，在数据库服务器上完成这些操作比在 客户端中完成要快得多。

```sql
-- 拼接字段
SELECT vend_name || '(' || vend_country || ')'
FROM Vendors
ORDER BY vend_name;

SELECT RTRIM(vend_name) || ' (' || RTRIM(vend_country) || ')'
FROM Vendors
ORDER BY vend_name;

-- 别名
SELECT RTRIM(vend_name) || ' (' || RTRIM(vend_country) || ')'
 AS vend_title
FROM Vendors
ORDER BY vend_name;

-- 执行算术计算
SELECT prod_id,
       quantity,
item_price,
       quantity*item_price AS expanded_price
FROM OrderItems
WHERE order_num = 20008;
```

## \_函数

## 汇总数据

```sql
-- AVG()函数
SELECT AVG(prod_price) AS avg_price
FROM Products;

-- 使用 COUNT(*)对表中行的数目进行计数，不管表列中包含的是空值 (NULL)还是非空值。
SELECT COUNT(*) AS num_cust
FROM Customers;

-- 使用 COUNT(column)对特定列中具有值的行进行计数，忽略 NULL 值。
SELECT COUNT(cust_email) AS num_cust
FROM Customers;

-- MAX()函数
SELECT MAX(prod_price) AS max_price
FROM Products;

-- SUM()函数
SELECT SUM(quantity) AS items_ordered
FROM OrderItems
WHERE order_num = 20005;

-- 平均值只考虑各个不同的价格
SELECT AVG(DISTINCT prod_price) AS avg_price
FROM Products
WHERE vend_id = 'DLL01';

-- 聚合
SELECT COUNT(*) AS num_items,
       MIN(prod_price) AS price_min,
       MAX(prod_price) AS price_max,
       AVG(prod_price) AS price_avg
FROM Products;
```
