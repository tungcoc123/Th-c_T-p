import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Category, deleteCategory, getAllCategory } from "../../services/Category";


export default function CategoryList() {
  
  const [products, setProducts] = useState<[Category]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllCategory()
      .then(({ data }) => {
        toast.success("Danh mục đã được tải thành công");
        setProducts(data);
      })
      .catch((error) => toast.error("Lỗi: " + error.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Bạn có chắc muốn xoá sản phẩm này không?")) {
      deleteCategory(id)
        .then(() => {
          toast.success(`Xoá sản phẩm Id: ${id} thành công`);
         
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== id)
          );
        })
        .catch((error) => toast.error("Lỗi: " + error.message));
    }
  };

  return (
    <div className="container">
      <a href="/">
      <button className="btn btn-outline-primary">Home</button></a>
      <h1>Danh sách sản phẩm</h1>
      <Link to="/admin/category/add">
        <button className="btn btn-outline-primary">Add Category</button>
      </Link>
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <th scope="row">{index +1}</th>
              <td>{product.name}</td>
              <td>{product.description} VND</td>
              
              
              <td>
                <Link to={`/admin/category/edit/${product._id}`}>
                  <button className="btn btn-outline-danger">Edit</button>
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
