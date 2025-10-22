import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPlants } from "../../services/plantService";
import { getAllOrders } from "../../services/orderService";

// This is a named export, so we will import it with {} in App.jsx
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPlants: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch plants and orders data at the same time for efficiency
        const [plantsData, ordersData] = await Promise.all([
          getAllPlants(),
          getAllOrders(),
        ]);

        // Calculate the stats
        const pending = ordersData.filter(
          (order) => order.status === "Pending"
        ).length;

        setStats({
          totalPlants: plantsData.length,
          totalOrders: ordersData.length,
          pendingOrders: pending,
        });
      } catch (err) {
        setError("Failed to load dashboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []); // The empty array [] means this effect runs only once when the component mounts

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Manage your nursery from here.</p>

      {/* Statistics Section */}
      <div className="stats-container">
        <div className="stat-card">
          <h2>{stats.totalPlants}</h2>
          <p>Total Plant Varieties</p>
        </div>
        <div className="stat-card">
          <h2>{stats.totalOrders}</h2>
          <p>Total Orders Received</p>
        </div>
        <div className="stat-card">
          <h2>{stats.pendingOrders}</h2>
          <p>Pending Orders</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="admin-navigation">
        <h3>Quick Links</h3>
        <ul>
          <li>
            <Link to="/admin/manage-plants">Manage Plants</Link>
          </li>
          <li>
            <Link to="/admin/view-orders">View All Orders</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Use a default export to avoid confusion
export default AdminDashboard;
