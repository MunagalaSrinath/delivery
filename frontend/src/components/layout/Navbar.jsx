// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../contexts/AuthContext";
// import { useCart } from "../../contexts/CartContext";
// import mainLogo from "../../assets/images/mainlogo.png";

// const Navbar = () => {
//   const { user, logout, isAdmin } = useContext(AuthContext);
//   const { cartItems } = useCart();
//   const navigate = useNavigate();

//   const totalCartItems = cartItems.reduce(
//     (sum, item) => sum + item.quantity,
//     0
//   );

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <header className="navbar">
//       <div className="nav-container">
//         {/* <Link to="/" className="nav-logo">
//           <img src="C:\Users\SEC\OneDrive\Desktop\delivery\frontend\src\assets\images\mainlogo.png" />
//           Plant Delivery🪴
//         </Link> */}
//         <Link to="/" className="nav-logo">
//           {/* Moved the image above the text and added a class */}
//           <img
//             src={mainLogo}
//             alt="Plant Delivery Logo" // Always add alt text for accessibility
//             className="logo-image"
//           />
//           <span className="logo-text">Munagala Plant Delivery🪴</span>{" "}
//           {/* Wrap text for easier styling */}
//         </Link>
//         <nav className="nav-links">
//           <Link to="/cart" className="cart-link">
//             Cart ({totalCartItems})
//           </Link>
//           {user ? (
//             <>
//               {isAdmin ? (
//                 <Link to="/admin/dashboard">Admin Panel</Link>
//               ) : (
//                 <Link to="/my-orders">My Orders</Link>
//               )}
//               <button onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/login">Login</Link>
//               <Link to="/register">Register</Link>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../../utils/localStorage";

const Navbar = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  // This effect runs when the user logs in or out
  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUserName("");
      }
    } else {
      setUserName("");
    }
  }, [user]); // The dependency array ensures this runs on login/logout

  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Munagala Plant Delivery 🌱
        </Link>
        <nav className="nav-links">
          <span className="welcome-message">Welcome, {userName}!</span>
          <Link to="/cart" className="cart-link">
            Cart ({totalCartItems})
          </Link>
          {user ? (
            <>
              {isAdmin ? (
                <Link to="/admin/dashboard">Admin Panel</Link>
              ) : (
                <Link to="/my-orders">My Account</Link>
              )}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
