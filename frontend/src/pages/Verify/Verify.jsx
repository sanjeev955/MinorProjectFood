import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Verify = ({ url }) => {
  const location = useLocation();
  const [status, setStatus] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to get query params
  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      success: searchParams.get("success"),
      orderId: searchParams.get("orderId"),
    };
  };

  useEffect(() => {
    const { success, orderId } = getQueryParams();
    if (!orderId) {
      setStatus("Invalid order ID");
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const orderRes = await axios.get(url + "/api/order/details/" + orderId);
        if (orderRes.data.success) {
          setOrder(orderRes.data.data);
          setStatus(success === "true" ? "Payment Successful" : "Payment Failed or Cancelled");
        } else {
          setStatus("Failed to fetch order details");
        }
      } catch (error) {
        setStatus("Error fetching order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location.search, url]);

  if (!order) {
    return null;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Order Receipt</h2>
      <p>Order ID: {order._id}</p>
      <p>Amount Paid: ${order.amount.toFixed(2)}</p>
      <p>Delivery Address: {order.address}</p>
      <h3>Items:</h3>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Verify;
