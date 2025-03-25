import { useEffect, useState } from "react";
import { getAllProduct } from "../services/Product";
import toast from "react-hot-toast";

interface Product {
    _id: string;
    title: string;
    author: string;
    price: number;
    oldPrice?: number;
    discount: number;
    featured: boolean;
    rating: number;
    rating1: {
        rate: number;
        count: number;
    };
    image: string;
}

export default function HomePage() {
    const [featuredBooks, setFeaturedBooks] = useState<Product[]>([]);
    const [discountBooks, setDiscountBooks] = useState<Product[]>([]);

    useEffect(() => {
        getAllProduct()
            .then(({ data }) => {
                // Lọc sách nổi bật
                const featured = data.filter((book: Product) => book.featured === true);
                // Lọc sách giảm giá
                const discount = data.filter((book: Product) => book.discount && book.discount > 0);

                setFeaturedBooks(featured);
                setDiscountBooks(discount);
                
            })
            .catch((error) => toast.error("Lỗi: " + error.message));
    }, []);

    const renderBookList = (books: Product[]) => {

        return (
            <>
                <section className="shop-section section-padding fix pt-0">
                    <div className="container">
                        <div className="swiper book-slider">
                            <div className="swiper-wrapper">
                                {books.map((product) => (
                                    <div key={product._id} className="swiper-slide">
                                        <div className="shop-box-items style-2">
                                            <div className="book-thumb center">
                                                <a href={`/shopdetail/${product._id}`}>
                                                    <img src={product.image} alt={product.title} style={{ width: "152px", height: "211px" }} />
                                                </a>
                                                <ul className="post-box">
                                                    {product.rating1?.rate >= 4.5 && <li>Hot</li>}
                                                    {product.discount > 0 && <li>{product.discount}%</li>}
                                                </ul>
                                            </div>
                                            <div className="shop-content">

                                                <h3><a href={`/shopdetail/${product._id}`}>{product.title}</a></h3>
                                                <ul className="price-list">
                                                    <li>${product.price}</li>
                                                    {product.oldPrice && <li><del>${product.oldPrice}</del></li>}
                                                </ul>
                                                <h5>{product.author}</h5>
                                            </div>
                                            <div className="shop-button">
                                                <a href={`/shopdetail/${product._id}`} className="theme-btn">
                                                    <i className="fa-solid fa-basket-shopping"></i> Add To Cart
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    };

    return (
        <section className="shop-section section-padding fix pt-0 ">
            <div className="container">
                <div className="section-title-pading">
                    <h2>Sách Nổi Bật</h2>
                </div>
                {renderBookList(featuredBooks)}

                <div className="section-title mt-5">
                    <h2>Sách Giảm Giá</h2>
                </div>
                {renderBookList(discountBooks)}
            </div>
        </section>
    );
}
