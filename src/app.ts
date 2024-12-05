import express, { NextFunction, Request, Response } from "express";

const app = express();

//Application routers
import productRoute from './app/module/product/product.route'
import ordertRoute from './app/module/order/order.route'

//parsers
app.use(express.json());

//middlewares 
app.use("/api/products",productRoute)
app.use("/api/orders",ordertRoute)

//Home route
app.get("/", (req: Request, res: Response) => {
  res.send("server is running!");
});

//Not found route
app.use("*", (req: Request, res: Response) => {
  res.send({
    Error: true,
    message: "Route not Found",
    validRoutes: "/api/products and /api/orders",
  });
});

//Error route
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({
    status: false,
    message: 'Internal Server Error',
    error: err.message,
  });
});
export default app;
