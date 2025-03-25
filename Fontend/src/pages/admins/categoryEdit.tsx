import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { editCategoryDetail } from "../../services/Category";
import { CategoryForm, Inputs } from "../../components/CategoryForm";

export default function CategoryEdit() {
  const { id } = useParams();
  const nav = useNavigate();

  const handleEditProduct: SubmitHandler<Inputs> = (values) => {
    if (!id) return;
    editCategoryDetail(id, values)
      .then(() => {
        toast.success("Edit Success");
        nav("/admin/product/list");
      })
      .catch(() => toast.error("Error"));
  };

  return (
    <div className="container">
      <h1>Product Edit</h1>
      <CategoryForm onSubmit={handleEditProduct} productId={id} />
    </div>
  );
}