import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { getCategoryDetail } from "../services/Category";

export type Inputs = {
  _id:string
  name: string;
  description: string;
  
};

type Props = {
  productId?: string;
  onSubmit: SubmitHandler<Inputs>;
};

export function CategoryForm({ productId, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  
  useEffect(() => {
    if (!productId) return;
    getCategoryDetail(productId)
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
          {...register("name", { required: "Name is required" })}
        />
        {errors?.name && <small className="text-danger">{errors.name.message}</small>}
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

      

      

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}
