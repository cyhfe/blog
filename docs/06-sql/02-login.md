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

##
