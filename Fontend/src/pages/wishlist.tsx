export default function Wishlist() {
   

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
                <h1>Wishlist</h1>
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
                            Wishlist
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div className="cart-section section-padding">
        <div className="container">
            <div className="main-cart-wrapper">
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className="d-flex gap-5 align-items-center">
                                                <a href="wishlist.html" className="remove-icon">
                                                    <img src="./src/assets/img/icon/icon-9.svg" alt="img"/>
                                                </a>
                                                <span className="cart">
                                                    <img src="./src/assets/img/shop-cart/01.png" alt="img"/>
                                                </span>
                                                <span className="cart-title">
                                                    simple Things You To Save Book
                                                </span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="cart-price">$30.00</span>
                                        </td>
                                        <td>
                                            <span className="stock-title">
                                                In Stock
                                            </span>
                                        </td>
                                        <td>
                                            <span className="subtotal-price">$120.00</span>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>

    )
}