// import React, { useState, useEffect } from "react";
// import { getAllOrders, updateOrderStatus } from "../../services/orderService";

// const ViewAllOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch all orders
//   const fetchAllOrders = async () => {
//     try {
//       setLoading(true);
//       const ordersData = await getAllOrders();
//       setOrders(ordersData);
//     } catch (err) {
//       setError("Failed to fetch orders.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch orders when the component first loads
//   useEffect(() => {
//     fetchAllOrders();
//   }, []);

//   // Function to handle changing an order's status
//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       const updatedOrder = await updateOrderStatus(orderId, newStatus);
//       setOrders(orders.map((o) => (o._id === orderId ? updatedOrder : o)));
//     } catch (err) {
//       alert("Failed to update order status.");
//       console.error(err);
//     }
//   };

//   if (loading) return <p>Loading all orders...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div className="admin-page">
//       <h1>Manage All Orders</h1>
//       {orders.length === 0 ? (
//         <p>No orders have been placed yet.</p>
//       ) : (
//         <table className="orders-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Customer Name</th>
//               <th>Phone Number</th>
//               <th>Date</th>
//               <th>Total</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>{order._id}</td>
//                 <td>{order.customerName}</td>
//                 <td>{order.phone}</td>
//                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//                 <td>₹{order.totalAmount}</td>
//                 <td>
//                   <select
//                     value={order.status}
//                     onChange={(e) =>
//                       handleStatusChange(order._id, e.target.value)
//                     }
//                     className={`status-${order.status.toLowerCase()}`}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Shipped">Shipped</option>
//                     <option value="Delivered">Delivered</option>
//                     <option value="Cancelled">Cancelled</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewAllOrders;
import React, { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/orderService";

const ViewAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setLoading(true);
        const ordersData = await getAllOrders();
        // Sort by most recent first
        const sortedOrders = ordersData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
      } catch (err) {
        setError("Failed to fetch orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map((o) => (o._id === orderId ? updatedOrder : o)));
    } catch (err) {
      alert("Failed to update order status.");
      console.error(err);
    }
  };

  if (loading) return <p className="loading-message">Loading all orders...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="admin-page-container">
      <h1>Manage All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders have been placed yet.</p>
      ) : (
        <div className="admin-orders-list">
          {orders.map((order) => (
            <div key={order._id} className="admin-order-card">
              <div className="admin-order-card-header">
                <div className="info-item">
                  <span>Order ID</span>
                  <strong>{order._id}</strong>
                </div>
                <div className="info-item">
                  <span>Date</span>
                  <strong>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </strong>
                </div>
                <div className="info-item">
                  <span>Total</span>
                  <strong>₹{order.totalAmount.toFixed(2)}</strong>
                </div>
                <div className="info-item">
                  <span>Status</span>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className={`order-card-status status-${order.status.toLowerCase()}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="admin-order-card-body">
                <h4>Items Ordered</h4>
                {order.plants.map((plant, index) => (
                  <div key={index} className="order-item">
                    <img
                      className="order-item-image"
                      src={`https://placehold.co/100x100/e2e8f0/333333?text=${plant.name.charAt(
                        0
                      )}`}
                      alt={plant.name}
                    />
                    <div className="order-item-details">
                      <p className="order-item-name">{plant.name}</p>
                      <p className="order-item-quantity">
                        Quantity: {plant.quantity}
                      </p>
                    </div>
                    <p className="order-item-price">
                      ₹{(plant.price * plant.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="order-shipping-details">
                  <h4>Shipping Information</h4>
                  <p>
                    <strong>Customer:</strong> {order.customerName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllOrders;
