import { useEffect, useMemo, useState } from "react";
import { useCart } from "../contexts/cart";
import Login from "../pages/Login";
import { Register } from "../pages/Register";
import { Badge } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export function Header() {
    const { cart } = useCart();
    const username = localStorage.getItem('username');
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
    // Lưu danh mục từ database
    const [category, setCategory] = useState("");


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:3000/categories");
                const data = await response.json();
                console.log("Dữ liệu danh mục từ API:", data);
                setCategories(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryId = e.target.value;
        setCategory(selectedCategoryId);
        if (selectedCategoryId) {
            navigate(`/category/${selectedCategoryId}`); // Chuyển hướng đến trang danh mục
        }
    };


    // Hàm xử lý tìm kiếm
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search?keyword=${encodeURIComponent(search)}`);

        }
    };


    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        toast.success("Bạn đã đăng xuất tài khoản!");
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const cartQuantity = useMemo(
        () =>
            cart
                ? cart.products.reduce((total, { quantity }) => total + quantity, 0)
                : 0,
        [cart]
    );
    return (
        <>
            <div className="cursor-follower"></div>

            <div className="fix-area">
                <div className="offcanvas__info">
                    <div className="offcanvas__wrapper">
                        <div className="offcanvas__content">
                            <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                                <div className="offcanvas__logo">
                                    <a href="index.html">
                                        <img src="/src/assets/img/logo/logo.png" alt="logo-img" />
                                    </a>
                                </div>
                                <div className="offcanvas__close">
                                    <button>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            <p className="text d-none d-xl-block">
                                Nullam dignissim, ante scelerisque the is euismod fermentum odio sem semper the is erat, a
                                feugiat leo urna eget eros. Duis Aenean a imperdiet risus.
                            </p>
                            <div className="mobile-menu fix mb-3"></div>
                            <div className="offcanvas__contact">
                                <h4>Contact Info</h4>
                                <ul>
                                    <li className="d-flex align-items-center">
                                        <div className="offcanvas__contact-icon">
                                            <i className="fal fa-map-marker-alt"></i>
                                        </div>
                                        <div className="offcanvas__contact-text">
                                            <a target="_blank" href="index.html">Main Street, Melbourne, Australia</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="offcanvas__contact-icon mr-15">
                                            <i className="fal fa-envelope"></i>
                                        </div>
                                        <div className="offcanvas__contact-text">
                                            <a href="mailto:info@example.com"><span
                                                className="mailto:info@example.com">info@example.com</span></a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="offcanvas__contact-icon mr-15">
                                            <i className="fal fa-clock"></i>
                                        </div>
                                        <div className="offcanvas__contact-text">
                                            <a target="_blank" href="index.html">Mod-friday, 09am -05pm</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="offcanvas__contact-icon mr-15">
                                            <i className="far fa-phone"></i>
                                        </div>
                                        <div className="offcanvas__contact-text">
                                            <a href="tel:+11002345909">+11002345909</a>
                                        </div>
                                    </li>
                                </ul>
                                <div className="header-button mt-4">
                                    <a href="contact.html" className="theme-btn text-center">
                                        Get A Quote <i className="fa-solid fa-arrow-right-long"></i>
                                    </a>
                                </div>
                                <div className="social-icon d-flex align-items-center">
                                    <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                                    <a href="https://x.com/"><i className="fab fa-twitter"></i></a>
                                    <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
                                    <a href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="offcanvas__overlay"></div>


            <div className="header-top-1">
                <div className="container">
                    <div className="header-top-wrapper">
                        <ul className="contact-list">
                            <li>
                                <i className="fa-regular fa-phone"></i>
                                <a href="tel:+20866660112">+208-6666-0112</a>
                            </li>
                            <li>
                                <i className="far fa-envelope"></i>
                                <a href="mailto:info@example.com">info@example.com</a>
                            </li>
                            <li>
                                <i className="far fa-clock"></i>
                                <span>Sunday - Fri: 9 aM - 6 pM</span>
                            </li>
                        </ul>
                        <ul className="list">
                            <li><i className="fa-light fa-comments"></i><a href="contact.html">Live Chat</a></li>
                            <li className="nav-item dropdown d-flex align-items-center">
                                {isLoggedIn ? (
                                    <>
                                        {/* Nếu đã đăng nhập, cho phép vào trang admin */}
                                        <a href="/admin/product/list">
                                            <i className="fa-light fa-user"></i>
                                        </a>
                                        <a
                                            className="nav-link dropdown-toggle p-0"
                                            href="#"
                                            id="userDropdown"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {username}
                                        </a>

                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    <i className="bi bi-person-circle me-2"></i>Thông tin tài khoản
                                                </a>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <a className="dropdown-item text-danger" onClick={handleLogout} style={{ cursor: "pointer" }}>
                                                    <i className="bi bi-box-arrow-right me-2"></i>Đăng xuất
                                                </a>
                                            </li>
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        {/* Nếu chưa đăng nhập, không cho vào trang admin, thay vào đó mở modal login */}
                                        <button
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#loginModal"
                                            className="btn btn-link p-0"
                                            style={{ border: "none", background: "none" }}
                                        >
                                            <i className="fa-light fa-user"></i>
                                        </button>

                                        <button data-bs-toggle="modal" data-bs-target="#loginModal" >
                                            Login
                                        </button>
                                    </>
                                )}
                            </li>




                        </ul>
                    </div>
                </div>
            </div>


            <header className="header-1 sticky-header">
                <div className="mega-menu-wrapper">
                    <div className="header-main">
                        <div className="container">
                            <div className="row">
                                <div className="col-6 col-md-6 col-lg-10 col-xl-8 col-xxl-10">
                                    <div className="header-left">
                                        <div className="logo">
                                            <a href="/" className="header-logo">
                                                <img src="/src/assets/img/logo/logo.png" alt="logo-img" style={{ width: "100px", height: "70px" }} />
                                            </a>
                                        </div>
                                        <div className="mean__menu-wrapper">
                                            <div className="main-menu">
                                                <nav>
                                                    <ul>
                                                        <li>
                                                            <a href="/">
                                                                Home
                                                                <i className="fas fa-angle-down"></i>
                                                            </a>
                                                            <ul className="submenu">
                                                                <li><a href="/">Home 01</a></li>
                                                                <li><a href="/">Home 02</a></li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <a href="/shop">
                                                                Shop
                                                                <i className="fas fa-angle-down"></i>
                                                            </a>
                                                            <ul className="submenu">
                                                                <li><a href="/shop">Shop Default</a></li>
                                                                <li><a href="/shoplist">Shop List</a></li>
                                                                <li><a href="/shopcart">Shop Cart</a></li>
                                                                <li><a href="/wishlist">Wishlist</a></li>
                                                                <li><a href="/checkout">Checkout</a></li>
                                                            </ul>
                                                        </li>
                                                        <li className="has-dropdown">
                                                            <a href="about.html">
                                                                Pages
                                                                <i className="fas fa-angle-down"></i>
                                                            </a>
                                                            <ul className="submenu">
                                                                <li><a href="about.html">About Us</a></li>
                                                                <li className="has-dropdown">
                                                                    <a href="team.html">
                                                                        Author
                                                                        <i className="fas fa-angle-down"></i>
                                                                    </a>
                                                                    <ul className="submenu">
                                                                        <li><a href="team.html">Author</a></li>
                                                                        <li><a href="team-details.html">Author Profile</a></li>
                                                                    </ul>
                                                                </li>
                                                                <li><a href="faq.html">Faq's</a></li>
                                                                <li><a href="404.html">404 Page</a></li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <a href="news.html">
                                                                Blog
                                                                <i className="fas fa-angle-down"></i>
                                                            </a>
                                                            <ul className="submenu">
                                                                <li><a href="news-grid.html">Blog Grid</a></li>
                                                                <li><a href="news.html">Blog List</a></li>
                                                                <li><a href="news-details.html">Blog Details</a></li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <a href="contact.html">Contact</a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-md-6 col-lg-2 col-xl-4 col-xxl-2">

                                    <div className="header-right">
                                        <div className="category-oneadjust gap-6 d-flex align-items-center">
                                            <div className="icon">
                                                <i className="fa-sharp fa-solid fa-grid-2"></i>
                                            </div>


                                            {categories.length > 0 ? (
                                                <select className="nice-select" value={category} onChange={handleCategoryChange}>
                                                    <option value="">Chọn danh mục</option>
                                                    {categories.map((cate) => (
                                                        <option key={cate._id} value={cate.name}>
                                                            {cate.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <p>Đang tải danh mục...</p>
                                            )}




                                            <form onSubmit={handleSearch} action="#" className="search-toggle-box d-md-block">
                                                <div className="input-area">
                                                    <input type="text" placeholder="Tìm kiếm sách..."
                                                        value={search}
                                                        onChange={(e) => setSearch(e.target.value)} />
                                                    <button className="cmn-btn">
                                                        <i className="far fa-search"></i>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="menu-cart">
                                            <a href="wishlist" className="cart-icon">
                                                <i className="fa-regular fa-heart"></i>
                                            </a>
                                            <Badge badgeContent={cartQuantity} color="secondary">
                                                <a href="/shopcart" className="cart-icon">

                                                    <i className="fa-regular fa-cart-shopping"></i>

                                                </a>
                                            </Badge>
                                            <div className="header-humbager ml-30">
                                                <a className="sidebar__toggle" >
                                                    <div className="bar-icon-2">
                                                        <img src="/src/assets/img/icon/icon-13.svg" alt="img" />
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </header>


            <header className="header-1">
                <div className="mega-menu-wrapper">
                    <div className="header-main">
                        <div className="container">
                            <div className="row">
                                <div className="col-6 col-md-6 col-lg-10 col-xl-8 col-xxl-10">
                                    <div className="header-left">
                                        <div className="logo">
                                            <a href="/" className="header-logo">
                                                <img src="/src/assets/img/logo/logo.png" alt="logo-img" style={{ width: "100px", height: "70px" }} />
                                            </a>
                                        </div>
                                        <div className="mean__menu-wrapper">
                                            <div className="main-menu">
                                                <nav id="mobile-menu">
                                                    <ul>
                                                        <li>
                                                            <a href="/">
                                                                Home
                                                                <i className="fas fa-angle-down"></i>
                                                            </a>
                                                            <ul className="submenu">
                                                                <li><a href="/">Home 01</a></li>
                                                                <li><a href="/">Home 02</a></li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <a href="/shop">
                                                                Shop
                                                                <i className="fas fa-angle-down"></i>
                                                            </a>
                                                            <ul className="submenu">
                                                                <li><a href="/shop">Shop Default</a></li>
                                                                <li><a href="/shoplist">Shop List</a></li>
                                                                <li><a href="/shopcart">Shop Cart</a></li>
                                                                <li><a href="/wishlist">Wishlist</a></li>
                                                                <li><a href="/checkout">Checkout</a></li>
                                                            </ul>
                                                        </li>
                                                        <li className="has-dropdown">
                                                            <a href="about.html">
                                                                Pages
                                                                <i className="fas fa-angle-down"></i>
                                                            </a>
                                                            <ul className="submenu">
                                                                <li><a href="about.html">About Us</a></li>
                                                                <li className="has-dropdown">
                                                                    <a href="team.html">
                                                                        Author
                                                                        <i className="fas fa-angle-down"></i>
                                                                    </a>
                                                                    <ul className="submenu">
                                                                        <li><a href="team.html">Author</a></li>
                                                                        <li><a href="team-details.html">Author Profile</a></li>
                                                                    </ul>
                                                                </li>
                                                                <li><a href="faq.html">Faq's</a></li>
                                                                <li><a href="404.html">404 Page</a></li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <a href="news.html">
                                                                Blog
                                                                <i className="fas fa-angle-down"></i>
                                                            </a>
                                                            <ul className="submenu">
                                                                <li><a href="news-grid.html">Blog Grid</a></li>
                                                                <li><a href="news.html">Blog List</a></li>
                                                                <li><a href="news-details.html">Blog Details</a></li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <a href="contact.html">Contact</a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-md-6 col-lg-2 col-xl-4 col-xxl-2">
                                    <div className="header-right">
                                        <div className="category-oneadjust gap-6 d-flex align-items-center">
                                            <div className="icon">
                                                <i className="fa-sharp fa-solid fa-grid-2"></i>
                                            </div>
                                            {categories.length > 0 ? (
                                                <select className="nice-select" value={category} onChange={handleCategoryChange}>
                                                    <option value="">Chọn danh mục</option>
                                                    {categories.map((cate) => (
                                                        <option key={cate._id} value={cate.name}>
                                                            {cate.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <p>Đang tải danh mục...</p>
                                            )}
                                            <form onSubmit={handleSearch} action="#" className="search-toggle-box d-md-block">
                                                <div className="input-area">
                                                    <input type="text" placeholder="Tìm kiếm sách..."
                                                        value={search}
                                                        onChange={(e) => setSearch(e.target.value)} />
                                                    <button className="cmn-btn">
                                                        <i className="far fa-search"></i>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="menu-cart">
                                            <a href="wishlist" className="cart-icon">
                                                <i className="fa-regular fa-heart"></i>
                                            </a>
                                            <Badge badgeContent={cartQuantity} color="secondary">
                                                <a href="/shopcart" className="cart-icon">

                                                    <i className="fa-regular fa-cart-shopping"></i>

                                                </a>
                                            </Badge>
                                            <div className="header-humbager ml-30">
                                                <a className="sidebar__toggle" >
                                                    <div className="bar-icon-2">
                                                        <img src="/src/assets/img/icon/icon-13.svg" alt="img" />
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </header>

            <Login />
            <Register />



        </>
    )
}
