# crud

[https://hendrixer.github.io/API-design-v4](https://hendrixer.github.io/API-design-v4)

## method

- GET - used to get information from an API
- POST - used to mutate or create new information on an API. Usually has data sent along with the request.
- PUT - used to replace existing information on an API. Usually has data sent along with the request.
- PATCH - used to update existing information on an API. Usually has data sent along with the request.
- DELETE- used to remove existing information on an API.
- OPTIONS - used with CORS by browsers to check to see if the client is able to actually communicate with an API

## router

- GET product/:id - get a product by a given ID
- GET product - get all the products (for an authenticated user)
- POST product - create a new product
- PUT product/:id - update or replace a product that matches a given ID
- DELETE product/:id - delete a product by a give ID

```ts
import { Router } from "express";

const router = Router();
/**
 * Product
 */
router.get("/product", (req, res) => {
  res.json({ message: "product" });
});

router.get("/product/:id", (req, res) => {});

router.post("/product", (req, res) => {});

router.put("/product/:id", (req, res) => {});

router.delete("/product/:id", (req, res) => {});

/**
 * Update
 */

router.get("/update", (req, res) => {});

router.get("/update/:id", (req, res) => {});

router.post("/update", (req, res) => {});

router.put("/update/:id", (req, res) => {});

router.delete("/update/:id", (req, res) => {});

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post("/updatepoint", (req, res) => {});

router.put("/updatepoint/:id", (req, res) => {});

router.delete("/updatepoint/:id", (req, res) => {});

export default router;
```
