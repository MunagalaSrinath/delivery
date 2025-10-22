// import React, { useState, useEffect } from "react";
// import {
//   getAllPlants,
//   createPlant,
//   deletePlant,
// } from "../../services/plantService";

// const ManagePlants = () => {
//   const [plants, setPlants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Add imageUrl to the new plant state
//   const [newPlant, setNewPlant] = useState({
//     name: "",
//     price: "",
//     stock: "",
//     category: "",
//     imageUrl: "", // <-- ADD THIS LINE
//   });

//   const fetchPlants = async () => {
//     try {
//       setLoading(true);
//       const data = await getAllPlants();
//       setPlants(data);
//     } catch (err) {
//       setError("Could not fetch plants.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const handleInputChange = (e) => {
//     setNewPlant({ ...newPlant, [e.target.name]: e.target.value });
//   };

//   const handleAddPlant = async (e) => {
//     e.preventDefault();
//     try {
//       await createPlant(newPlant);
//       // Reset form including the new imageUrl field
//       setNewPlant({
//         name: "",
//         price: "",
//         stock: "",
//         category: "",
//         imageUrl: "",
//       });
//       fetchPlants();
//     } catch (err) {
//       alert("Failed to add plant.");
//     }
//   };

//   const handleDeletePlant = async (plantId) => {
//     if (window.confirm("Are you sure you want to delete this plant?")) {
//       try {
//         await deletePlant(plantId);
//         fetchPlants();
//       } catch (err) {
//         alert("Failed to delete plant.");
//       }
//     }
//   };

//   if (loading) return <p>Loading plants...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div className="admin-page">
//       <h1>Manage Plants</h1>

//       <div className="add-plant-form">
//         <h3>Add New Plant</h3>
//         <form onSubmit={handleAddPlant}>
//           <input
//             name="name"
//             value={newPlant.name}
//             onChange={handleInputChange}
//             placeholder="Plant Name"
//             required
//           />
//           <input
//             name="price"
//             type="number"
//             value={newPlant.price}
//             onChange={handleInputChange}
//             placeholder="Price (₹)"
//             required
//           />
//           <input
//             name="stock"
//             type="number"
//             value={newPlant.stock}
//             onChange={handleInputChange}
//             placeholder="Stock"
//             required
//           />
//           <input
//             name="category"
//             value={newPlant.category}
//             onChange={handleInputChange}
//             placeholder="Category"
//           />
//           {/* Add the new input field for the image URL */}
//           <input
//             name="imageUrl"
//             value={newPlant.imageUrl}
//             onChange={handleInputChange}
//             placeholder="Image URL (https://...)"
//           />
//           <button type="submit">Add Plant</button>
//         </form>
//       </div>

//       <h3>Existing Plants</h3>
//       <table className="orders-table">
//         <thead>
//           <tr>
//             <th>Image</th> {/* <-- ADD THIS HEADER */}
//             <th>Name</th>
//             <th>Price</th>
//             <th>Stock</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {plants.map((plant) => (
//             <tr key={plant._id}>
//               {/* Add a cell to show the plant image */}
//               <td>
//                 <img
//                   src={
//                     plant.imageUrl ||
//                     "https://placehold.co/100x100/e2e8f0/e2e8f0?text=No-Image"
//                   }
//                   alt={plant.name}
//                   style={{
//                     width: "50px",
//                     height: "50px",
//                     objectFit: "cover",
//                     borderRadius: "4px",
//                   }}
//                 />
//               </td>
//               <td>{plant.name}</td>
//               <td>₹{plant.price}</td>
//               <td>{plant.stock}</td>
//               <td>
//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDeletePlant(plant._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManagePlants;
import React, { useState, useEffect } from "react";
import {
  getAllPlants,
  createPlant,
  deletePlant,
  updatePlant,
} from "../../services/plantService";

// --- A separate component for the Pop-Up Modal Form ---
const EditPlantModal = ({ plant, onClose, onSave }) => {
  // For the textarea, we join the array of URLs into a single string with newlines
  const [formData, setFormData] = useState({
    ...plant,
    imageUrls: (plant.imageUrls || []).join("\n"),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Before saving, we split the string from the textarea back into an array of URLs
    const finalData = {
      ...formData,
      imageUrls: formData.imageUrls
        .split("\n")
        .filter((url) => url.trim() !== ""), // Filter out empty lines
    };
    onSave(finalData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit {plant.name}</h2>
        <form onSubmit={handleSubmit} className="admin-form modal-form">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Plant Name"
            required
          />
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price (₹)"
            required
          />
          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
          />
          <textarea
            name="imageUrls"
            value={formData.imageUrls}
            onChange={handleChange}
            placeholder="Image URLs (one per line)"
            rows="4"
          />
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- The Main ManagePlants Component ---
const ManagePlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // The form state for imageUrls will be a string to match the textarea
  const [newPlant, setNewPlant] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    imageUrls: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState(null);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const data = await getAllPlants();
      setPlants(data);
    } catch (err) {
      setError("Could not fetch plants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleInputChange = (e) => {
    setNewPlant({ ...newPlant, [e.target.name]: e.target.value });
  };

  const handleAddPlant = async (e) => {
    e.preventDefault();
    // Convert the string of URLs from the textarea into an array before sending
    const plantData = {
      ...newPlant,
      imageUrls: newPlant.imageUrls
        .split("\n")
        .filter((url) => url.trim() !== ""),
    };
    try {
      await createPlant(plantData);
      setNewPlant({
        name: "",
        price: "",
        stock: "",
        category: "",
        imageUrls: "",
      }); // Reset form
      fetchPlants();
    } catch (err) {
      alert("Failed to add plant.");
    }
  };

  const handleDeletePlant = async (plantId) => {
    if (window.confirm("Are you sure you want to delete this plant?")) {
      try {
        await deletePlant(plantId);
        fetchPlants();
      } catch (err) {
        alert("Failed to delete plant.");
      }
    }
  };

  const handleEditClick = (plant) => {
    setEditingPlant(plant);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPlant(null);
  };

  const handleSaveChanges = async (updatedPlantData) => {
    try {
      await updatePlant(updatedPlantData._id, updatedPlantData);
      handleCloseModal();
      fetchPlants();
    } catch (err) {
      alert("Failed to update plant.");
      console.error(err);
    }
  };

  if (loading) return <p className="loading-message">Loading plants...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="admin-page-container">
      <h1>Manage Plants</h1>
      <h3>Add New Plant</h3>
      <form onSubmit={handleAddPlant} className="admin-form">
        <input
          name="name"
          value={newPlant.name}
          onChange={handleInputChange}
          placeholder="Plant Name"
          required
        />
        <input
          name="price"
          type="number"
          value={newPlant.price}
          onChange={handleInputChange}
          placeholder="Price (₹)"
          required
        />
        <input
          name="stock"
          type="number"
          value={newPlant.stock}
          onChange={handleInputChange}
          placeholder="Stock"
          required
        />
        <input
          name="category"
          value={newPlant.category}
          onChange={handleInputChange}
          placeholder="Category"
        />
        <textarea
          name="imageUrls"
          value={newPlant.imageUrls}
          onChange={handleInputChange}
          placeholder="Image URLs (one per line)"
          rows="4"
        />
        <button type="submit">Add Plant</button>
      </form>

      <h3>Existing Plants</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant) => (
            <tr key={plant._id}>
              <td>
                <img
                  src={
                    (plant.imageUrls && plant.imageUrls[0]) ||
                    "https://placehold.co/100x100/e2e8f0/e2e8f0?text=No-Image"
                  }
                  alt={plant.name}
                />
              </td>
              <td>{plant.name}</td>
              <td>₹{plant.price}</td>
              <td>{plant.stock}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(plant)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeletePlant(plant._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <EditPlantModal
          plant={editingPlant}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default ManagePlants;
