import React, { useEffect, useState } from "react";
import { getMyOrders } from "../service/authService";
import "../styles/Orders.css";

interface Orchid {
  orchidId: number;
  orchidName: string;
  orchidUrl: string;
  price: number;
}

interface OrderDetail {
  id: number;
  orchid: Orchid;
  price: number;
  quantity: number;
}

interface Order {
  orderId: number;
  orderDate: string;
  orderStatus: string;
  totalAmount: number;
  orderDetails: OrderDetail[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getMyOrders();
        setOrders(data);
      } catch (err: unknown) {
        setError("Không thể tải đơn hàng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2>Đơn hàng của tôi</h2>
      {loading && <div>Đang tải...</div>}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && orders.length === 0 && (
        <div>Bạn chưa có đơn hàng nào.</div>
      )}
      {!loading && !error && orders.length > 0 && (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.orderId}>
              <div className="order-header">
                <span>
                  <b>Mã đơn:</b> {order.orderId}
                </span>
                <span>
                  <b>Ngày đặt:</b>{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </span>
                <span>
                  <b>Trạng thái:</b> {order.orderStatus}
                </span>
                <span>
                  <b>Tổng tiền:</b> {order.totalAmount?.toLocaleString()} VND
                </span>
              </div>
              <table className="order-details-table">
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên hoa</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderDetails.map((detail) => (
                    <tr key={detail.id}>
                      <td>
                        <img
                          src={detail.orchid.orchidUrl}
                          alt={detail.orchid.orchidName}
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: "cover",
                            borderRadius: 8,
                          }}
                        />
                      </td>
                      <td>{detail.orchid.orchidName}</td>
                      <td>{detail.price.toLocaleString()} VND</td>
                      <td>{detail.quantity}</td>
                      <td>
                        {(detail.price * detail.quantity).toLocaleString()} VND
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
