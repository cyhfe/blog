# express-validator 校验参数

```ts
app.post(
  "/user",
  body(["password", "username"]).notEmpty(),
  inputValidate,
  createNewUser
);

export const inputValidate: RequestHandler = function (req, res, next) {
  const result = validationResult(req);
  console.log(result.isEmpty());
  if (!result.isEmpty()) {
    return res.send({ errors: result.array(), code: 400 });
  }
  next();
};
```
