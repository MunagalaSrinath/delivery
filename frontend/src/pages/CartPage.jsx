// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";
// import { useAuth } from "../hooks/useAuth"; // Correctly import the useAuth hook
// import { createOrder } from "../services/orderService";
// import { jwtDecode } from "jwt-decode"; // Import jwt-decode
// import { getToken } from "../utils/localStorage"; // Import getToken

// const CartPage = () => {
//   const { cartItems, removeFromCart, clearCart } = useCart();
//   const { isAuthenticated } = useAuth(); // Use isAuthenticated from the context
//   const navigate = useNavigate();

//   const totalAmount = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const handlePlaceOrder = async () => {
//     if (!isAuthenticated) {
//       alert("Please log in to place an order.");
//       navigate("/login");
//       return;
//     }

//     // --- FIX STARTS HERE ---
//     // Decode the token to get the user's name
//     const token = getToken();
//     if (!token) {
//       alert("Authentication error. Please log in again.");
//       return;
//     }
//     const decodedUser = jwtDecode(token);
//     console.log("DECODED USER FROM TOKEN:", decodedUser); // <-- THIS LINE IS CRITICAL

//     // --- FIX ENDS HERE ---

//     const orderData = {
//       // Use the name from the decoded token
//       customerName: decodedUser.name,
//       phone: "1234567890", // We will replace this with a form later
//       address: "123 Nursery Lane", // We will replace this with a form later
//       plants: cartItems.map((item) => ({
//         name: item.name,
//         quantity: item.quantity,
//         price: item.price,
//       })),
//       totalAmount: totalAmount,
//       deliveryCharge: 50, // Example delivery charge
//     };

//     try {
//       // Use the correct service URL
//       await createOrder(orderData);
//       alert("Order placed successfully!");
//       clearCart();
//       navigate("/my-orders");
//     } catch (error) {
//       alert("Failed to place order. Please try again.");
//       console.error("Order placement error:", error);
//     }
//   };

//   return (
//     <div className="cart-page">
//       <h1>Your Shopping Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           {cartItems.map((item) => (
//             <div key={item._id} className="cart-item">
//               <p>
//                 {item.name} (x{item.quantity}) - ₹{item.price * item.quantity}
//               </p>
//               <button onClick={() => removeFromCart(item._id)}>Remove</button>
//             </div>
//           ))}
//           <hr />
//           <h3>Total: ₹{totalAmount}</h3>
//           <button onClick={handlePlaceOrder}>Place Order</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartPage;
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../hooks/useAuth";
import { createOrder } from "../services/orderService";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/localStorage";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // State for the delivery details form
  const [deliveryDetails, setDeliveryDetails] = useState({
    phone: "",
    address: "",
  });

  // Pre-fill phone number when the component loads if the user is logged in
  useEffect(() => {
    if (isAuthenticated) {
      const token = getToken();
      if (token) {
        try {
          const decodedUser = jwtDecode(token);
          setDeliveryDetails((prev) => ({
            ...prev,
            phone: decodedUser.phone || "",
          }));
        } catch (error) {
          console.error("Failed to decode token on cart page:", error);
        }
      }
    }
  }, [isAuthenticated]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = 50; // Example fixed delivery charge
  const totalAmount = subtotal + deliveryCharge;

  const handleDetailsChange = (e) => {
    setDeliveryDetails({
      ...deliveryDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!isAuthenticated) {
      alert("Please log in to place an order.");
      navigate("/login");
      return;
    }
    if (!deliveryDetails.address.trim()) {
      alert("Please enter a delivery address.");
      return;
    }

    const token = getToken();
    const decodedUser = jwtDecode(token);

    const orderData = {
      customerName: decodedUser.name,
      phone: deliveryDetails.phone,
      address: deliveryDetails.address,
      plants: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: totalAmount,
      deliveryCharge: deliveryCharge,
    };

    try {
      await createOrder(orderData);
      alert("Order placed successfully!");
      clearCart();
      navigate("/my-orders");
    } catch (error) {
      // Show the specific error message from the backend (e.g., "out of stock")
      const message =
        error.response?.data?.message ||
        "Failed to place order. Please try again.";
      alert(message);
      console.error("Order placement error:", error);
    }
  };

  return (
    <div className="cart-page-container">
      <h1>Your Cart & Checkout</h1>
      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          Your cart is empty. <Link to="/">Continue Shopping</Link>
        </p>
      ) : (
        <div className="cart-grid">
          {/* Column 1: Cart Items */}
          <div className="cart-items-list">
            <h2>Order Items</h2>
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-details">
                  <img
                    src={
                      item.imageUrl ||
                      `https://placehold.co/100x100/e2e8f0/333333?text=${item.name.replace(
                        " ",
                        "+"
                      )}`
                    }
                    alt={item.name}
                  />
                  <div className="cart-item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">
                      {item.quantity} x ₹{item.price}
                    </p>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => removeFromCart(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Checkout Form & Summary */}
          <div className="checkout-container">
            <h2>Delivery Details</h2>
            <form onSubmit={handlePlaceOrder}>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={deliveryDetails.phone}
                  onChange={handleDetailsChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Delivery Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={deliveryDetails.address}
                  onChange={handleDetailsChange}
                  required
                  placeholder="Enter your full address here..."
                ></textarea>
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Charge</span>
                  <span>₹{deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="form-button"
                style={{ marginTop: "1.5rem" }}
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
