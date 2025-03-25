import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
interface Product {
    _id: string;
    title: string;
    author: string;
    price: number;
    oldPrice?: number;
    discount?: number;
    featured: boolean;
    rating: number;
    rating1: {
        rate: number;
        count: number;
    };
    image: string;
    category?: { name: string }; // Thêm category
}
const SearchPage = () => {
  const [books, setBooks] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const author = searchParams.get("author") || "";
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/search?keyword=${keyword}&author=${author}`
        );
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm sách:", error);
      }
    };

    fetchBooks();
  }, [keyword, author]);

  return (
    <div>
      <h2>Kết quả tìm kiếm</h2>
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book._id}>
            <h3>{book.title}</h3>
            <p>Tác giả: {book.author}</p>
            <p>Thể loại: {book.category?.name || "Không có thể loại"}</p>
          </div>
        ))
      ) : (
        <p>Không tìm thấy sách nào</p>
      )}
    </div>
  );
};

export default SearchPage;
