import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Cập nhật nếu cần

export type Product = {
    _id: string; // MongoDB thường dùng string thay vì number
    title: string;
    image: string;
    description: string;
    price: number;
    category?: string;
    discount?: number;
    featured?: boolean;
};

export type NewProduct = Omit<Product, "_id">; // Dùng cho thêm sản phẩm

export const getAllProduct = () => {
    return axios.get(`${BASE_URL}/products`);
};

export const getProductDetail = (id: string) => {
    return axios.get(`${BASE_URL}/products/${id}`);
};

export const deleteProduct = (id: string) => {
    return axios.delete(`${BASE_URL}/products/${id}`);
};

export const addProduct = (data: NewProduct) => {
    return axios.post(`${BASE_URL}/products`, data);
};

export const editProductDetail = (id: string, data: NewProduct) => {
    return axios.put(`${BASE_URL}/products/${id}`, data);
};

// Lấy sách nổi bật
export const getFeaturedBooks = () => {
    return axios.get(`${BASE_URL}/products?featured=true`);
};

// Lấy sách có giảm giá
export const getDiscountBooks = () => {
    return axios.get(`${BASE_URL}/products?discount_gte=1`); // Lấy sách có giảm giá > 0%
};
export const getProductsByCategory = (categoryId: string) => {
    return axios.get(`${BASE_URL}/products/categoryId/${categoryId}`);
  };
  