// import React from "react";
// import { Routes, Route, Navigate, Outlet } from "react-router-dom";
// import { AuthProvider, AuthContext } from "./contexts/AuthContext";
// import { CartProvider } from "./contexts/CartContext";

// // Import all pages
// import Navbar from "./components/layout/Navbar";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import CartPage from "./pages/CartPage";
// import MyOrdersPage from "./pages/MyOrdersPage";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import ViewAllOrders from "./pages/admin/ViewAllOrders";
// import ManagePlants from "./pages/admin/ManagePlants"; // <-- CHANGE 1: Import the new ManagePlants page

// // A component to protect routes that require a user to be logged in
// const ProtectedRoute = () => {
//   const { isAuthenticated } = React.useContext(AuthContext);
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// };

// // A component to protect routes that require admin access
// const AdminRoute = () => {
//   const { isAdmin } = React.useContext(AuthContext);
//   return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <Navbar />
//         <main className="container">
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<HomePage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//             <Route path="/cart" element={<CartPage />} />

//             {/* Protected Customer Routes */}
//             <Route element={<ProtectedRoute />}>
//               <Route path="/my-orders" element={<MyOrdersPage />} />
//             </Route>

//             {/* Protected Admin Routes */}
//             <Route element={<AdminRoute />}>
//               <Route path="/admin/dashboard" element={<AdminDashboard />} />
//               <Route path="/admin/view-orders" element={<ViewAllOrders />} />
//               {/* CHANGE 2: Add the new route for managing plants */}
//               <Route path="/admin/manage-plants" element={<ManagePlants />} />
//             </Route>

//             {/* Not Found Route */}
//             <Route path="*" element={<h1>404 Not Found</h1>} />
//           </Routes>
//         </main>
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;
import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// Import all pages
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ViewAllOrders from "./pages/admin/ViewAllOrders";
import ManagePlants from "./pages/admin/ManagePlants";
import PlantDetailPage from "./pages/PlantDetailPage"; // 1. Import the new page

// A component to protect routes that require a user to be logged in
const ProtectedRoute = () => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// A component to protect routes that require admin access
const AdminRoute = () => {
  const { isAdmin } = React.useContext(AuthContext);
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <main className="container">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/plant/:id" element={<PlantDetailPage />} />{" "}
            {/* 2. Add the new route */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            {/* Protected Customer Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/my-orders" element={<MyOrdersPage />} />
            </Route>
            {/* Protected Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/view-orders" element={<ViewAllOrders />} />
              <Route path="/admin/manage-plants" element={<ManagePlants />} />
            </Route>
            {/* Not Found Route */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </main>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
