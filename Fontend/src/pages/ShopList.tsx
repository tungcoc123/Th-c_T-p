import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Định nghĩa kiểu dữ liệu của sản phẩm
interface Product {
    _id: string;
    title: string;
    author: string;
    price: number;
    oldPrice?: number;  // Có thể không có
    discount?: number;  // Có thể không có
    image: string;
    description: string;
    rating: number;
    rating1: {
        rate: number;
        count: number;
    };
}

export default function ShopList() {
    const [products, setProducts] = useState<Product[]>([]); // 🛠 Khai báo kiểu dữ liệu rõ ràng

    useEffect(() => {
        axios.get<Product[]>("http://localhost:3000/products")
            .then(response => setProducts(response.data))
            .catch(error => console.error("Lỗi khi lấy danh sách sản phẩm:", error));
    }, []);

    return (
        <>
            <div className="breadcrumb-wrapper">
            <div className="book1">
                    <img src="./src/assets/img/hero/maytinh1.png" alt="book" style={{width:"402px", height:"305px"}}/>
                </div>
                <div className="book2">
                    <img src="./src/assets/img/hero/maytinh2.png" alt="book" style={{width:"402px", height:"280px"}}/>
                </div>
                <div className="container">
                    <div className="page-heading">
                        <h1>Shop List</h1>
                        <div className="page-header">
                            <ul className="breadcrumb-items">
                                <li><Link to="/">Home</Link></li>
                                <li><i className="fa-solid fa-chevron-right" /></li>
                                <li>Shop List</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Danh sách sản phẩm */}
            <section className="shop-section fix section-padding">
                <div className="container">
                    <div className="shop-default-wrapper">
                        <div className="row g-4">
                            <div className="col-xl-12">
                                <div className="woocommerce-notices-wrapper">
                                    <p>Showing {products.length} of {products.length} Results</p>
                                </div>
                            </div>

                            <div className="row">
                                {products.map((product) => (
                                    <div className="col-lg-12" key={product._id}>
                                        <div className="shop-list-items">
                                            <div className="shop-list-thumb">
                                                <img src={product.image} alt={product.title} />
                                                <ul className="post-box">
                                                    {product.rating1?.rate >= 4.5 && <li>Hot</li>}
                                                    {product.discount >= 5 && <li>{product.discount}%</li>}
                                                    
                                                </ul>
                                            </div>

                                            <div className="shop-list-content">
                                                <h3>
                                                    <Link to={`/shopdetail/${product._id}`}>{product.title}</Link>
                                                </h3>
                                                <h5>${product.price}</h5>
                                                <div className="star">
                                                    {[...Array(5)].map((_, i) => (
                                                        <i key={i} className={i < product.rating ? "fa-solid fa-star" : "fa-regular fa-star"} />
                                                    ))}
                                                </div>
                                                <p>{product.description}</p>
                                                <div className="shop-btn">
                                                    <Link to={`/shopdetail/${product._id}`} className="theme-btn">
                                                        <i className="fa-solid fa-basket-shopping" /> Add To Cart
                                                    </Link>
                                                    <ul className="shop-icon d-flex">
                                                        <li><a href="#"><i className="far fa-heart" /></a></li>
                                                        <li><a href="#"><img className="icon" src="/src/assets/img/icon/shuffle.svg" alt="shuffle" /></a></li>
                                                        <li><Link to={`/shopdetail/${product._id}`}><i className="far fa-eye" /></Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Phân trang */}
                            <div className="page-nav-wrap text-center">
                                <ul>
                                    <li><a className="previous" href="#">Previous</a></li>
                                    <li><a className="page-numbers" href="#">1</a></li>
                                    <li><a className="page-numbers" href="#">2</a></li>
                                    <li><a className="page-numbers" href="#">3</a></li>
                                    <li><a className="page-numbers" href="#">...</a></li>
                                    <li><a className="next" href="#">Next</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
