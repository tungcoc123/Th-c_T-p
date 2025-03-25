import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Inputs, ProductForm } from "../../components/ProductForm";
import { addProduct } from "../../services/Product";


export default function ProductAdd() {
  const nav = useNavigate();

  const handleAddProduct: SubmitHandler<Inputs> = (values) => {
   
    addProduct(values)
      .then(() => {
        toast.success("Add Product Successfull");
        nav("/admin/product/list");
      })
      .catch(() => toast.error("Error"));
  };

  return (
    <div className="container">
      <h1>Product Add</h1>
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
}