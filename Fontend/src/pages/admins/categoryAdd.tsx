import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../services/Category";
import { CategoryForm, Inputs } from "../../components/CategoryForm";

export default function CategoryAdd() {
  const nav = useNavigate();

  const handleAddProduct: SubmitHandler<Inputs> = (values) => {
   
    addCategory(values)
      .then(() => {
        toast.success("Add Category Successfull");
        nav("/admin/category/list");
      })
      .catch(() => toast.error("Error"));
  };

  return (
    <div className="container">
      <h1>Category Add</h1>
      <CategoryForm onSubmit ={handleAddProduct} />
    </div>
  );
}