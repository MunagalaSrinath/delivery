// import React, { useState, useEffect } from "react";
// import { getMyOrders } from "../services/orderService";

// const MyOrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const userOrders = await getMyOrders();
//         setOrders(userOrders);
//       } catch (err) {
//         setError("Failed to fetch your orders. Please try again later.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   if (loading) return <p className="loading-message">Loading your orders...</p>;
//   if (error) return <p className="error-message">{error}</p>;

//   return (
//     <div className="account-page-container">
//       <h1>My Order History</h1>
//       {orders.length === 0 ? (
//         <p style={{ textAlign: "center" }}>
//           You haven't placed any orders yet.
//         </p>
//       ) : (
//         <div className="order-history-list">
//           {orders.map((order) => (
//             <div key={order._id} className="order-card">
//               <div className="order-card-header">
//                 {/* --- THIS IS THE CORRECTED STRUCTURE --- */}
//                 <div className="order-card-header-info">
//                   <div className="info-item">
//                     <span>ORDER PLACED</span>
//                     <strong>
//                       {new Date(order.createdAt).toLocaleDateString()}
//                     </strong>
//                   </div>
//                   <div className="info-item">
//                     <span>TOTAL</span>
//                     <strong>₹{order.totalAmount.toFixed(2)}</strong>
//                   </div>
//                   <div className="info-item">
//                     <span>ORDER #</span>
//                     <strong>{order._id}</strong>
//                   </div>
//                 </div>
//                 <div
//                   className={`order-card-status status-${order.status.toLowerCase()}`}
//                 >
//                   {order.status}
//                 </div>
//               </div>
//               <div className="order-card-body">
//                 {order.plants.map((plant, index) => (
//                   <div key={index} className="order-item">
//                     <img
//                       className="order-item-image"
//                       src={`https://placehold.co/100x100/e2e8f0/333333?text=${plant.name.charAt(
//                         0
//                       )}`}
//                       alt={plant.name}
//                     />
//                     <div className="order-item-details">
//                       <p className="order-item-name">{plant.name}</p>
//                       <p className="order-item-quantity">
//                         Quantity: {plant.quantity}
//                       </p>
//                     </div>
//                     <div className="order-item-price">
//                       ₹{(plant.price * plant.quantity).toFixed(2)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrdersPage;
import React, { useState, useEffect } from "react";
import { getMyOrders } from "../services/orderService";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userOrders = await getMyOrders();
        // Sort orders by most recent first for a better user experience
        const sortedOrders = userOrders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
      } catch (err) {
        setError("Failed to fetch your orders. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="loading-message">Loading your orders...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="account-page-container">
      <h1>My Order History</h1>
      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="order-history-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-card-header">
                <div className="order-card-header-info">
                  <div className="info-item">
                    <span>ORDER PLACED</span>
                    <strong>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </strong>
                  </div>
                  <div className="info-item">
                    <span>TOTAL</span>
                    <strong>₹{order.totalAmount.toFixed(2)}</strong>
                  </div>
                  <div className="info-item">
                    <span>ORDER ID</span>
                    <strong>{order._id}</strong>
                  </div>
                </div>
                <div
                  className={`order-card-status status-${order.status.toLowerCase()}`}
                >
                  {order.status}
                </div>
              </div>
              <div className="order-card-body">
                {order.plants.map((plant, index) => (
                  <div key={index} className="order-item">
                    {/* Since image URLs aren't stored in the order, we use a placeholder */}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
