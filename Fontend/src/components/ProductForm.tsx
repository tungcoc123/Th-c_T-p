import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getProductDetail } from "../services/Product";
import axios from "axios";

export type Inputs = {
  _id:string
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  author: string;
  featured: boolean;
  discount: number;
  name:string
};

type Props = {
  productId?: string;
  onSubmit: SubmitHandler<Inputs>;
};

export function ProductForm({ productId, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  useEffect(() => {
    axios.get("http://localhost:3000/categories")
      .then((res) => setCategories(res.data))
      .catch(() => console.error("Error fetching categories"));
  }, []);
  useEffect(() => {
    if (!productId) return;
    getProductDetail(productId)
      .then(({ data }) => {
        reset(data);
      })
      .catch(() => toast.error("Error"));
  }, [productId, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          {...register("title", { required: "Title is required" })}
        />
        {errors?.title && <small className="text-danger">{errors.title.message}</small>}
      </div>

      <div className="mb-3">
        <label className="form-label">Sản phẩm nổi bật</label>
        <input type="checkbox" {...register("featured")} />
      </div>

      <div className="mb-3">
        <label className="form-label">Giảm giá (%)</label>
        <input
          type="number"
          className="form-control"
          {...register("discount", { min: 0, max: 100 })}
        />
        {errors?.discount && <small className="text-danger">Discount phải từ 0 - 100</small>}
      </div>

      <div className="mb-3">
        <label className="form-label">Author</label>
        <input
          type="text"
          className="form-control"
          {...register("author", { required: "Author is required" })}
        />
        {errors?.author && <small className="text-danger">{errors.author.message}</small>}
      </div>

      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          className="form-control"
          {...register("price", { required: "Price is required" })}
        />
        {errors?.price && <small className="text-danger">{errors.price.message}</small>}
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          {...register("description", { required: "Description is required" })}
        />
        {errors?.description && <small className="text-danger">{errors.description.message}</small>}
      </div>

      <div className="mb-3">
        <label className="form-label">Image</label>
        <input
          type="text"
          className="form-control"
          {...register("image", { required: "Image is required" })}
        />
        {errors?.image && <small className="text-danger">{errors.image.message}</small>}
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select className="form-select" {...register("category", { required: "Category is required" })}>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors?.category && <small className="text-danger">{errors.category.message}</small>}
      </div>


      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}
