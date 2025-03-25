import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/cart";
import { useUser } from "../contexts/user";
import { useProductCart } from "../hooks/useProductCart";
import { useMemo } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

type CheckoutFormParams = {
    name: string;
    country: string;
    phone: string;
    address: string;
    payment: string;
    email: string;
    note: string;
};

export default function Checkout() {
    const nav = useNavigate();
    const { cart } = useCart();
    const { user } = useUser();
    const { getCartUser } = useProductCart();
    const { register, handleSubmit } = useForm<CheckoutFormParams>();

    const tongPrice = useMemo(
        () =>
            cart
                ? cart.products.reduce(
                    (total, { product, quantity }) => total + product.price * quantity,
                    0
                )
                : 0,
        [cart]
    );

    const onSubmit = async (values: CheckoutFormParams) => {
        if (!user || !cart || !cart?.products.length) return;
        try {
            await axios.post("/orders", {
                ...values,
                products: cart.products,
                user: user._id,
                tongPrice,
            });
            await getCartUser();
            alert("Đăng kí đơn hàng thành công");
            nav("/orders");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="breadcrumb-wrapper">
                <div className="container">
                    <div className="page-heading">
                        <h1>Checkout</h1>
                        <div className="page-header">
                            <ul className="breadcrumb-items wow fadeInUp" data-wow-delay=".3s">
                                <li><a href="index.html">Home</a></li>
                                <li><i className="fa-solid fa-chevron-right"></i></li>
                                <li>Checkout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <section className="checkout-section fix section-padding">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-5">
                            {/* Billing Details */}
                            <div className="col-lg-8">
                                <div className="checkout-single-wrapper">
                                    <div className="checkout-single boxshado-single">
                                        <h4>Billing Details</h4>
                                        <div className="checkout-single-form">
                                            <div className="row g-4">
                                                <div className="col-lg-12">
                                                    <div className="input-single">
                                                        <span>Họ và tên</span>
                                                        <input {...register("name")} placeholder="Họ và tên" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input-single">
                                                        <span>Country*</span>
                                                        <input {...register("country")} placeholder="Quốc gia" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input-single">
                                                        <span>Street Address*</span>
                                                        <input {...register("address")} placeholder="Địa chỉ cụ thể" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input-single">
                                                        <span>Phone*</span>
                                                        <input {...register("phone")} placeholder="Số điện thoại" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input-single">
                                                        <span>Email Address*</span>
                                                        <input {...register("email")} placeholder="Email" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input-single">
                                                        <span>Order notes (optional)</span>
                                                        <textarea {...register("note")} placeholder="Ghi chú về đơn đặt hàng của bạn" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Order Summary */}
                            <div className="col-lg-3">
                                <div className="checkout-order-area">
                                    <h3>Our Order</h3>
                                    <div className="product-checout-area">
                                        <div className="checkout-item d-flex align-items-center justify-content-between">

                                            <p>Subtotal</p>
                                            <p>{tongPrice.toLocaleString()}đ</p>
                                        </div>


                                        <div className="checkout-item d-flex align-items-center justify-content-between">
                                            <p>Total</p>
                                            <p>{tongPrice.toLocaleString()}đ</p>
                                        </div>
                                        <div className="checkout-item-2">
                                            <div className="form-check-2 d-flex align-items-center from-customradio-2">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    value="BANK"
                                                    {...register("payment")}
                                                    id="flexRadioDefault1222"
                                                />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1222">
                                                    Chuyển khoản ngân hàng trực tiếp
                                                </label>
                                            </div>
                                            <p>
                                                Thanh toán trực tiếp vào tài khoản ngân hàng của chúng tôi, vui lòng sử dụng ID đơn hàng của bạn làm tham chiếu thanh toán.
                                                Đơn đặt hàng của bạn sẽ không được vận chuyển cho đến khi tiền đã được thanh toán trong tài khoản của chúng tôi.
                                            </p>
                                            <div className="form-check-3 d-flex align-items-center from-customradio-2 mt-3">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    value="COD"
                                                    {...register("payment")}
                                                    id="flexRadioDefault12224"
                                                />
                                                <label className="form-check-label" htmlFor="flexRadioDefault12224">
                                                    Tiền mặt khi nhận hàng
                                                </label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="text-center mt-4">
                                    <button type="submit" className="btn btn-primary">Thanh toán</button>
                                </div>

                            </div>
                        </div>


                    </form>
                </div>
            </section>
        </>
    );
}
