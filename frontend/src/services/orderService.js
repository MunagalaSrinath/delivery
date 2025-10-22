import api from "./api";

/**
 * Submits a new order to the backend.
 * @param {object} orderData - The order details (customerName, phone, address, plants, etc.)
 * @returns {Promise<object>} The saved order object from the server.
 */
export const createOrder = async (orderData) => {
  // This function sends a POST request to your backend's `/orders` endpoint
  const response = await api.post("/orders", orderData);
  return response.data;
};

/**
 * Fetches the order history for the currently logged-in user.
 * @returns {Promise<Array>} An array of the user's orders.
 */
export const getMyOrders = async () => {
  // This is the correct URL that matches your backend
  const response = await api.get("/orders/my-orders");
  return response.data;
};

/**
 * Fetches all orders from all users. (Admin only)
 * @returns {Promise<Array>} An array of all orders in the system.
 */
export const getAllOrders = async () => {
  // This function sends a GET request to your backend's `/orders` endpoint
  // The backend's isAdmin middleware will protect this route
  const response = await api.get("/orders");
  return response.data;
};

/**
 * Updates the status of a specific order. (Admin only)
 * @param {string} orderId - The ID of the order to update.
 * @param {string} status - The new status (e.g., "Shipped", "Delivered").
 * @returns {Promise<object>} The updated order object.
 */
export const updateOrderStatus = async (orderId, status) => {
  // This function sends a PATCH request to your backend's `/orders/:id/status` endpoint
  const response = await api.patch(`/orders/${orderId}/status`, { status });
  return response.data;
};
