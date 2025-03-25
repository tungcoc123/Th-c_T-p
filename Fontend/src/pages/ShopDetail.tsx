import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "./types/Product";
import axios from "axios";
import { useProductCart } from "../hooks/useProductCart";
import Stack from "@mui/material/Stack";
import { IconButton, TextField, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Remove";



export default function ShopDetail() {
  const { addToCart } = useProductCart();
  const { id } = useParams(); 
  const [product, setProduct] = useState<Product | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const getProduct = async (id: string) => {
    try {
      console.log(`🔍 Fetching product with ID: ${id}`);
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  const handleAddToCart = (product: Product) => {
    if (quantity <= 0) return;
    addToCart({ product, quantity });
    
  }
  if (!product) {
    console.error("Sản phẩm không tồn tại!");     
    return;
  };
  return (
    <>
      {/* Banner */}

      <div className="breadcrumb-wrapper">
        <div className="book1">
          <img src="/src/assets/img/hero/book1.png" alt="book" />
        </div>
        <div className="book2">
          <img src="/src/assets/img/hero/book2.png" alt="book" />
        </div>
        <div className="container">
          <div className="page-heading">
            <h1>Shop Detail</h1>
            <div className="page-header">
              <ul className="breadcrumb-items">
                <li><a href="/">Home</a></li>
                <li><i className="fa-solid fa-chevron-right"></i></li>
                <li>{product?.title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="shop-details-section fix section-padding">
        <div className="container">
          <div className="shop-details-wrapper">
            <div className="row g-4">
              <div className="col-lg-5">
                <div id="thumb1" className="shop-details-image">
                  <div className="tab-content">
                    <div className="tab-pane fade show active">
                      <div className="shop-details-thumb">
                        <img src={product?.image} alt={product?.title} style={{width:"315px", height:"402px"}}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="shop-details-content">
                  <h2>{product?.title}</h2>
                  <p>{product?.description}</p>
                  <h3>${product?.price}</h3>

                  {/* Thêm vào giỏ hàng */}
                  <div className="cart-wrapper">
                    <Stack direction={"row"} gap={2} alignItems={"center"}>
                      <Typography>Quantity: </Typography>
                      <IconButton
                        onClick={() => setQuantity(quantity === 0 ? 0 : quantity - 1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        id="outlined-basic"
                        label="quantity"
                        variant="outlined"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                      />
                      <IconButton onClick={() => setQuantity(quantity + 1)}>
                        <AddIcon />
                      </IconButton>
                    </Stack>
                    <button
                      type="button"
                      className="theme-btn style-2"
                      data-bs-toggle="modal"
                      data-bs-target="#readMoreModal"
                    >
                      Read A little
                    </button>
                    {/* Read More Modal */}
                    <div
                      className="modal fade"
                      id="readMoreModal"
                      tabIndex={-1}
                      aria-labelledby="readMoreModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div
                            className="modal-body"
                            style={{ backgroundImage: "url(assets/img/popupBg.png)" }}
                          >
                            <div className="close-btn">
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              />
                            </div>
                            <div className="readMoreBox">
                              <div className="content">
                                <h3 id="readMoreModalLabel">The Role Of Book</h3>
                                <p>
                                  Educating the Public <br />
                                  Political books play a crucial role in educating the public
                                  about political theories, historical events, policies, and the
                                  workings of governments. They provide readers with insights into
                                  complex political concepts and the historical context behind
                                  current events, helping to foster a more informed citizenry.{" "}
                                  <br />
                                  <br />
                                  Shaping Public Opinion <br />
                                  Authors of political books often aim to influence public opinion
                                  by presenting arguments and perspectives on various issues.
                                  These books can sway readers' views, either reinforcing their
                                  existing beliefs or challenging them to consider alternative
                                  viewpoints. This influence can extend to political debates and
                                  discussions in the public sphere. <br />
                                  <br />
                                  Documenting History <br />
                                  Political books serve as valuable records of historical events
                                  and political movements. They document the thoughts, actions,
                                  and decisions of political leaders and activists, providing
                                  future generations with a detailed account of significant
                                  periods and events. This historical documentation is essential
                                  for understanding the evolution of political systems and
                                  ideologies.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a onClick={() => handleAddToCart(product)} className="theme-btn">
                      <i className="fa-solid fa-basket-shopping" /> Add To Cart
                    </a>
                    <div className="icon-box">
                      <a href="shop-details.html" className="icon">
                        <i className="far fa-heart" />
                      </a>
                      <a href="shop-details.html" className="icon-2">
                        <img src="/src/assets/img/icon/shuffle.svg" alt="svg-icon" />
                      </a>
                    </div>
                  </div>


                  {/* Thông tin chi tiết */}
                  <div className="category-box">
                    <div className="category-list">

                      <ul><li><span>Category:</span>{product?.category}</li></ul>
                      <ul><li><span>Format:</span> {product?.format}</li></ul>
                      <ul><li><span>Total Pages:</span> {product?.pages}</li></ul>
                      <ul><li><span>Language:</span> {product?.language}</li></ul>
                      <ul><li><span>Publish Year:</span> {product?.year}</li></ul>
                      <ul><li><span>Country:</span> {product?.country}</li></ul>

                    </div>
                  </div>

                  {/* Đánh giá */}
                  <div className="star">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={i < product?.rating ? "fas fa-star" : "far fa-star"}></i>
                    ))}
                    <span>({product?.reviews} Customer Reviews)</span>
                  </div>

                  {/* Chính sách */}
                  <div className="box-check">
                    <ul>
                      <li><i className="fa-solid fa-check"></i> Free shipping orders from $150</li>
                      <li><i className="fa-solid fa-check"></i> 30 days exchange & return</li>
                      <li><i className="fa-solid fa-check"></i> Safe & Secure online shopping</li>
                    </ul>
                  </div>

                  {/* Mạng xã hội */}
                  <div className="social-icon">
                    <h6>Also Available On:</h6>
                    <a href="https://www.amazon.com/"><img src="/src/assets/img/amazon.png" alt="amazon" /></a>
                    <a href="https://www.dropbox.com/"><img src="/src/assets/img/dropbox.png" alt="dropbox" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
