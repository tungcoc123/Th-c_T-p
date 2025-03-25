import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CategoryPage = () => {
    const { categoryId } = useParams(); // Lấy tên danh mục từ URL
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Gọi API để lấy sản phẩm theo danh mục
        fetch(`http://localhost:3000/products/category/${categoryId}`)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Lỗi khi tải sản phẩm:", err));
    }, [categoryId]);

    return (
        <div>
            <h2>Sản phẩm trong danh mục: {categoryId}</h2>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-item">
                            <h3>{product.name}</h3>
                            <p>Giá: {product.price} VND</p>
                        </div>
                    ))
                ) : (
                    <p>Không có sản phẩm nào.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
