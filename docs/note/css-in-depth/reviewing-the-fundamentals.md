---
sidebar_position: 1
---

# Reviewing the fundamentals

## 1. cascade, specificity and inheritance

### 1.1 cascade

![](./images/cascade.png)

#### 1.1.1 understanding stylesheet origin

1. author important
2. author
3. user agent
   
#### 1.1.2 understanding specificity

the browser evaluates specifity in two parts: 
- inline styles
  - no selector, directly to the element 
- selector specificity
  - id
  - class
  - element
