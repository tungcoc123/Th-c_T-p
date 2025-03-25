import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/user";

type Order = {
    _id: string;
    products: { product: { name: string; price: number }; quantity: number }[];
    tongPrice: number;
    status: string;
    createdAt: string;
};

export default function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("/orders", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setOrders(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách đơn hàng", error);
            }
        };

        if (user) fetchOrders();
    }, [user]);

    return (
        <div className="container mt-4">
            <h2>Danh sách đơn hàng</h2>
            {orders.length === 0 ? (
                <p>Bạn chưa có đơn hàng nào.</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Sản phẩm</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Ngày đặt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>
                                    {order.products.map((item, index) => (
                                        <p key={index}>{item.product.name} x {item.quantity}</p>
                                    ))}
                                </td>
                               <td>{order.tongPrice.toLocaleString()}đ</td>
                                <td>
                                    <span className={`badge bg-${order.status === "completed" ? "success" : "warning"}`}>
                                        {order.status === "completed" ? "Hoàn thành" : "Đang xử lý"}
                                    </span>
                                </td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
