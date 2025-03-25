import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { deleteProduct, getAllProduct, Product } from "../../services/Product";


export default function ProductList() {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllProduct()
      .then(({ data }) => {
        toast.success("Sản phẩm đã được tải thành công");
        setProducts(data);
      })
      .catch((error) => toast.error("Lỗi: " + error.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Bạn có chắc muốn xoá sản phẩm này không?")) {
      deleteProduct(id)
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
      <a href="/admin/category/list">
      <button className="btn btn-outline-primary">Danh muc</button></a>
      <h1>Danh sách sản phẩm</h1>
      <Link to="/admin/product/add">
        <button className="btn btn-outline-primary">Add Product</button>
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
            <th scope="col">Tiêu đề</th>
            <th scope="col">Giá</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Category</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <th scope="row">{index +1}</th>
              <td>{product.title}</td>
              <td>{product.price} VND</td>
              <td>
                <img src={product.image} alt="" width={80} />
              </td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>
                <Link to={`/admin/product/edit/${product._id}`}>
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
