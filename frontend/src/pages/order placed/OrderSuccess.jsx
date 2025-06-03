
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const { url } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to get query params
  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      success: searchParams.get('success'),
      orderId: searchParams.get('orderId'),
    };
  };

  useEffect(() => {
    const { success, orderId } = getQueryParams();
    if (!orderId) {
      setStatus('Invalid order ID');
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const orderRes = await axios.get(url + '/api/order/details/' + orderId);
        if (orderRes.data.success) {
          setOrder(orderRes.data.data);
          setStatus(success === 'true' ? 'Payment Successful' : 'Payment Failed or Cancelled');
        } else {
          setStatus('Failed to fetch order details');
        }
      } catch (error) {
        setStatus('Error fetching order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location.search, url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-success-container">
      <h2 className="order-success-title">🎉 Order Placed Successfully!</h2>
      <p className="order-success-message">Thank you for ordering with us.</p>

      {order ? (
        <div className="order-summary">
          <h4>Order Summary</h4>
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Total Amount:</b> ₹{order.amount}</p>
          <h5>Items:</h5>
          <ul>
            {order.items.map((item, i) => (
              <li key={i}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Your order details will be sent to your email.</p>
      )}

      <Link to="/" className="go-home-link">Go Home</Link>
    </div>
  );
};

export default OrderSuccess;
