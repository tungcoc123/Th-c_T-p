import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Inputs, ProductForm } from "../../components/ProductForm";
import { editProductDetail } from "../../services/Product";

export default function ProductEdit() {
  const { id } = useParams();
  const nav = useNavigate();

  const handleEditProduct: SubmitHandler<Inputs> = (values) => {
    if (!id) return;
    editProductDetail(id, values)
      .then(() => {
        toast.success("Edit Success");
        nav("/admin/product/list");
      })
      .catch(() => toast.error("Error"));
  };

  return (
    <div className="container">
      <h1>Product Edit</h1>
      <ProductForm onSubmit={handleEditProduct} productId={id} />
    </div>
  );
}