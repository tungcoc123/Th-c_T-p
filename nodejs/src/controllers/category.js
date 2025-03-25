import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError.js";
import Category from "../models/CategoryModel.js";

class CategoryController {
  // Lấy tất cả danh mục
  async getAllCategories(req, res, next) {
    try {
      const categories = await Category.find();
      res.status(StatusCodes.OK).json(categories);
    } catch (error) {
      next(error);
    }
  }

  // Lấy danh mục theo ID
  async getCategoryById(req, res, next) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) throw new ApiError(404, "Category not found");
      res.status(StatusCodes.OK).json(category);
    } catch (error) {
      next(error);
    }
  }

  // Tạo danh mục mới
  async createCategory(req, res, next) {
    try {
      const newCategory = await Category.create(req.body);
      res.status(StatusCodes.CREATED).json({
        message: "Category created successfully",
        data: newCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  // Cập nhật danh mục
  async updateCategory(req, res, next) {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedCategory) throw new ApiError(404, "Category not found");
      res.status(StatusCodes.OK).json({
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  // Xóa danh mục
  async deleteCategory(req, res, next) {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) throw new ApiError(404, "Category not found");
      res.status(StatusCodes.OK).json({ message: "Category deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
