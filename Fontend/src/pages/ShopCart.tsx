import { useMemo } from "react";
import { useCart } from "../contexts/cart";
import { useProductCart } from "../hooks/useProductCart";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";



export default function ShopCart() {
    const { cart } = useCart();
    const { removeToCart } = useProductCart();


    const totalPrice = useMemo(() => {
        return (cart?.products || []).reduce((total, { product, quantity }) => {
            return total + product.price * quantity;
        }, 0);
    }, [cart]);

    return (
        <>
            <div className="breadcrumb-wrapper">
            <div className="book1">
                    <img src="./src/assets/img/hero/book1.png" alt="book"  />
                </div>
                <div className="book2">
                    <img src="./src/assets/img/hero/book2.png" alt="book"  />
                </div>
                <div className="container">
                    <div className="page-heading">
                        <h1>Shop Cart</h1>
                        <div className="page-header">
                            <ul className="breadcrumb-items wow fadeInUp" data-wow-delay=".3s">
                                <li>
                                    <a href="index.html">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </li>
                                <li>
                                    Shop Cart
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cart-section section-padding">
                <div className="container">
                    <div className="main-cart-wrapper">
                        <div className="row g-5">
                            <div className="col-xl-9">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart?.products.map((item, index) => {
                                                const subtotal = item.product.price * item.quantity; // Tính tổng tiền cho từng sản phẩm
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <span className="d-flex gap-5 align-items-center">
                                                                <button onClick={() => removeToCart(item.product._id)} className="remove-icon">
                                                                    <img src="./src/assets/img/icon/icon-9.svg" alt="remove" />
                                                                </button>
                                                                <span className="cart">
                                                                    <img src={item.product.image} alt={item.product.title} style={{ width: "52px", height: "52px" }} />
                                                                </span>
                                                                <span className="cart-title">
                                                                    {item.product.title}
                                                                </span>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="cart-price">${item.product.price.toLocaleString()}</span>
                                                        </td>
                                                        <td>
                                                            <span className="quantity-basket">
                                                                <span className="qty">
                                                                    <button className="qtyminus" aria-hidden="true">−</button>
                                                                    <input type="number" value={item.quantity} readOnly />
                                                                    <button className="qtyplus" aria-hidden="true">+</button>
                                                                </span>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="subtotal-price">${subtotal.toLocaleString()}</span> {/* Hiển thị subtotal đúng */}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div className="col-xl-3">
                                <div className="table-responsive cart-total">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Cart Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="d-flex gap-5 align-items-center justify-content-between">
                                                        <span className="sub-title">Subtotal:</span>
                                                        <span className="sub-price">{totalPrice.toLocaleString()}đ</span>
                                                    </span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <span className="d-flex gap-5 align-items-center  justify-content-between">
                                                        <span className="sub-title">Total:  </span>
                                                        <span className="sub-price sub-price-total">{totalPrice.toLocaleString()}$</span>
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Stack alignItems={"center"}>
                                        <Link to="/checkout">
                                            <Button variant="contained" className="theme-btn">
                                                Checkout
                                            </Button>
                                        </Link>
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}