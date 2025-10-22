// import api from "./api";

// // This function should already exist
// export const getAllPlants = async () => {
//   const response = await api.get("/plants");
//   return response.data;
// };

// // --- ADD THE NEW FUNCTIONS BELOW ---

// /**
//  * Creates a new plant. (Admin only)
//  * @param {object} plantData - The details of the new plant.
//  * @returns {Promise<object>} The newly created plant object.
//  */
// export const createPlant = async (plantData) => {
//   const response = await api.post("/plants", plantData);
//   return response.data;
// };

// /**
//  * Updates the stock of a specific plant. (Admin only)
//  * @param {string} plantId - The ID of the plant to update.
//  * @param {number} stock - The new stock quantity.
//  * @returns {Promise<object>} The updated plant object.
//  */
// export const updatePlantStock = async (plantId, stock) => {
//   const response = await api.put(`/plants/${plantId}/stock`, { stock });
//   return response.data;
// };

// /**
//  * Deletes a plant from the database. (Admin only)
//  * @param {string} plantId - The ID of the plant to delete.
//  * @returns {Promise<object>} The success message from the server.
//  */
// export const deletePlant = async (plantId) => {
//   const response = await api.delete(`/plants/${plantId}`);
//   return response.data;
// };
// export const updatePlant = async (plantId, plantData) => {
//   const response = await api.put(`/plants/${plantId}`, plantData);
//   return response.data;
// };
import api from "./api";

/**
 * Fetches all plants from the server.
 * @returns {Promise<Array>} An array of plant objects.
 */
export const getAllPlants = async () => {
  const response = await api.get("/plants");
  return response.data;
};

/**
 * Fetches a single plant by its unique ID.
 * @param {string} plantId - The ID of the plant to fetch.
 * @returns {Promise<object>} The plant object from the server.
 */
export const getPlantById = async (plantId) => {
  const response = await api.get(`/plants/${plantId}`);
  return response.data;
};

/**
 * Creates a new plant. (Admin only)
 * @param {object} plantData - The details of the new plant.
 * @returns {Promise<object>} The newly created plant object.
 */
export const createPlant = async (plantData) => {
  const response = await api.post("/plants", plantData);
  return response.data;
};

/**
 * Updates the stock of a specific plant. (Admin only)
 * @param {string} plantId - The ID of the plant to update.
 * @param {number} stock - The new stock quantity.
 * @returns {Promise<object>} The updated plant object.
 */
export const updatePlantStock = async (plantId, stock) => {
  const response = await api.put(`/plants/${plantId}/stock`, { stock });
  return response.data;
};

/**
 * Deletes a plant from the database. (Admin only)
 * @param {string} plantId - The ID of the plant to delete.
 * @returns {Promise<object>} The success message from the server.
 */
export const deletePlant = async (plantId) => {
  const response = await api.delete(`/plants/${plantId}`);
  return response.data;
};

/**
 * Updates all details of a specific plant. (Admin only)
 * @param {string} plantId - The ID of the plant to update.
 * @param {object} plantData - The new data for the plant.
 * @returns {Promise<object>} The updated plant object.
 */
export const updatePlant = async (plantId, plantData) => {
  const response = await api.put(`/plants/${plantId}`, plantData);
  return response.data;
};
