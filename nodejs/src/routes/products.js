import { Router } from "express";
import ProductsController from "../controllers/products";

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get("/", productsController.getAllProducts);
productsRouter.get("/search", productsController.searchBooks); // ✅ Đặt trước `/:id`
productsRouter.get("/category/:id", productsController.getProductsByCategory);
productsRouter.get("/:id", productsController.getProductDetail);
productsRouter.post("/", productsController.createProduct);
productsRouter.put("/:id", productsController.updateProduct);
productsRouter.delete("/:id", productsController.deleteProduct);

export default productsRouter;
