import express from "express";
import CategoryController from "../controllers/category";

const categoryRouter = express.Router();
const categoryController = new CategoryController()
categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getCategoryById);
categoryRouter.post("/", categoryController.createCategory);
categoryRouter.put("/:id", categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);

export default categoryRouter;
