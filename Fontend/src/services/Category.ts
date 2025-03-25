import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Cập nhật nếu cần

export type Category = {
    _id: string; // MongoDB thường dùng string thay vì number
    name: string;
    description: string;
    
};

export type NewCategory = Omit<Category, "_id">; // Dùng cho thêm sản phẩm

export const getAllCategory = () => {
    return axios.get(`${BASE_URL}/categories`);
};

export const getCategoryDetail = (id: string) => {
    return axios.get(`${BASE_URL}/categories/${id}`);
};

export const deleteCategory = (id: string) => {
    return axios.delete(`${BASE_URL}/categories/${id}`);
};

export const addCategory = (data: NewCategory) => {
    return axios.post(`${BASE_URL}/categories`, data);
};

export const editCategoryDetail = (id: string, data: NewCategory) => {
    return axios.put(`${BASE_URL}/categories/${id}`, data);
};


  