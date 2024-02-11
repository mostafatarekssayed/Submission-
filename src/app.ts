import express, { Request, Response, NextFunction } from "express";
import json from "body-parser";
import { Product } from "./types";
import { getProducts } from "./controllers/product/product.controller";
import { sortArray } from "./utils/sorting";
import { logUser } from "./controllers/login/loginController";
import addUserCart from "./controllers/cart/cart-controller";
import onlineAuthMiddleware from "./middleware/online-auth-middleware";
import { status_code } from "./status-codes";
import { INVALID_CREDENTIALS, NOT_IMPLEMENTED } from "./error-msgs";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
const app = express();
import * as swaggerSpecs from "./swagger-specs.json";


const specs = swaggerJsdoc(swaggerSpecs)
// Serve Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.get("/products", async (req: Request, res: Response) => {
  // put your code here
  const products: Product[] = await getProducts();
  const sortedProducts: Product[] = sortArray<Product>(products, "title", true);
  res.send(sortedProducts);
});

app.post("/products", async (req: Request, res: Response) => {
  res.send(NOT_IMPLEMENTED);
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const loggedUser = await logUser(req.body.username, req.body.password);
    res.send(loggedUser.data);
  } catch (e) {
    res.status(status_code.NOT_AUTHORIZED).send(INVALID_CREDENTIALS);
  }
});

app.post("/cart", onlineAuthMiddleware, async (req: Request, res: Response) => {
  const updatedCart = addUserCart(req.user?.id as number, req.body.productId);
  res.send(updatedCart);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(status_code.NOT_FOUND).send();
});

export default app;
