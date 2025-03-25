import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
}

interface SidebarProps {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

export function Sidebar({ setSelectedCategory }: SidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]); // Lưu trữ danh sách danh mục

  // Fetch danh mục từ API
  useEffect(() => {
    fetch("http://localhost:3000/categories") // API lấy danh mục
      .then((res) => res.json())
      .then((data) => setCategories(data)) // Cập nhật danh mục vào state
      .catch((error) => console.error("Lỗi khi tải danh mục:", error));
  }, []);

  // Hàm để thay đổi danh mục khi người dùng chọn
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category); // Cập nhật danh mục đã chọn
    
  };

  return (
    <div className="col-xl-3 col-lg-4 order-2 order-md-1 wow fadeInUp" data-wow-delay=".3s">
      <div className="main-sidebar">
        <div className="single-sidebar-widget">
          <div className="wid-title">
            <h5>Search</h5>
          </div>
          <form action="#" className="search-toggle-box">
            <div className="input-area search-container">
              <input className="search-input" type="text" placeholder="Search here" />
              <button className="cmn-btn search-icon">
                <i className="far fa-search"></i>
              </button>
            </div>
          </form>
        </div>

        <div className="single-sidebar-widget">
          <div className="wid-title">
            <h5>Categories</h5>
          </div>
          <div className="categories-list">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              {categories.map((category) => (
                <li className="nav-item" role="presentation" key={category._id}>
                  <button
                    className="nav-link"
                    type="button"
                    onClick={() => handleCategoryChange(category.name)} // Khi nhấn vào danh mục
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
