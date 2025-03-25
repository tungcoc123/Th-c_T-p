import { StatusCodes } from "http-status-codes";
import Product from "../models/ProductModel";
import ApiError from "../utils/ApiError";

class ProductsController {
  // GET /products
  async getAllProducts(req, res, next) {
    try {
      const products = await Product.find();
      res.status(StatusCodes.OK).json(products);
    } catch (error) {
      next(error);
    }
  }
  // GET /products/:id
  async getProductDetail(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) throw new ApiError(404, "Product Not Found");
      res.status(StatusCodes.OK).json(product);
    } catch (error) {
      next(error);
    }
  }
  // POST /products
  async createProduct(req, res, next) {
    try {
      const newProduct = await Product.create(req.body);
      res.status(StatusCodes.CREATED).json({
        message: "Create Product Successfull",
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }
  // PUT /products/:id
  async updateProduct(req, res, next) {
    try {
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updateProduct) throw new ApiError(404, "Product Not Found");

      res.status(StatusCodes.OK).json({
        message: "Update Product Successfull",
        data: updateProduct,
      });
    } catch (error) {
      next(error);
    }
  }
  // DELETE /products/:id
  async deleteProduct(req, res, next) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) throw new ApiError(404, "Product Not Found");
      res.status(StatusCodes.OK).json({
        message: "Delete Product Done",
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductsByCategory(req, res, next) {
    try {
      const { categoryId } = req.params; // Nhận categoryId từ query string
  
      let products;
      if (categoryId) {
        // Nếu có categoryId, tìm sản phẩm theo categoryId
         products = await Product.findById({ category: categoryId }).populate("category")
      } else {
        // Nếu không có categoryId, lấy tất cả sản phẩm
        products = await Product.find();
      }
  
      res.json(products);  // Trả về danh sách sản phẩm
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi khi lấy sản phẩm" });
    }
  }



  async searchBooks(req, res) {
    try {
      const { keyword, author, category } = req.query;
      let query = {};
  
      if (keyword && keyword.trim() !== "") {
        query.title = { $regex: new RegExp(keyword, "i") };
      }
      if (author && author.trim() !== "") {
        query.author = { $regex: new RegExp(author, "i") };
      }
      if (category) {
        query.category = category;
      }
  
      console.log("🔍 Query gửi đến MongoDB:", query);
  
      const books = await Product.find(query).populate("category");
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi tìm kiếm sách", error });
    }
  }
  
};

  


export default ProductsController;
