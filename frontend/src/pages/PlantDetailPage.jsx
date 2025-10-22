// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { getPlantById } from "../services/plantService";
// import { useCart } from "../contexts/CartContext";

// const PlantDetailPage = () => {
//   const [plant, setPlant] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams(); // Gets the plant ID from the URL
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchPlant = async () => {
//       try {
//         setLoading(true);
//         const data = await getPlantById(id);
//         setPlant(data);
//       } catch (err) {
//         setError("Could not find that plant. It might have been removed.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPlant();
//   }, [id]); // Re-run this effect if the ID in the URL changes

//   if (loading)
//     return <p className="loading-message">Loading Plant Details...</p>;
//   if (error) return <p className="error-message">{error}</p>;
//   if (!plant) return <p className="error-message">Plant not found.</p>;

//   const placeholderImage = `https://placehold.co/600x600/a2d2a2/333333?text=${plant.name.replace(
//     " ",
//     "+"
//   )}`;

//   return (
//     <div className="plant-detail-container">
//       <Link to="/" className="back-to-shop-link">
//         ← Back to Shop
//       </Link>
//       <div className="plant-detail-card">
//         <div className="plant-detail-image-wrapper">
//           <img
//             src={plant.imageUrl || placeholderImage}
//             alt={plant.name}
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = placeholderImage;
//             }}
//           />
//         </div>
//         <div className="plant-detail-info">
//           <span className="plant-detail-category">{plant.category}</span>
//           <h1 className="plant-detail-name">{plant.name}</h1>
//           <p className="plant-detail-price">₹{plant.price}</p>
//           <p className="plant-detail-stock">
//             {plant.stock > 0
//               ? `${plant.stock} available in stock`
//               : "Currently out of stock"}
//           </p>
//           <p className="plant-detail-description">
//             (A beautiful description will go here once added to the database).
//             This {plant.name.toLowerCase()} is a high-quality plant, perfect for
//             any{" "}
//             {plant.category ? plant.category.toLowerCase() : "garden or home"}{" "}
//             setting.
//           </p>
//           <button
//             className="add-to-cart-btn-detail"
//             onClick={() => addToCart(plant)}
//             disabled={plant.stock === 0}
//           >
//             {plant.stock > 0 ? "Add to Cart" : "Out of Stock"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlantDetailPage;
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPlantById } from "../services/plantService";
import { useCart } from "../contexts/CartContext";

const PlantDetailPage = () => {
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // This hook gets the plant ID from the URL (e.g., /plant/12345)
  const { addToCart } = useCart();

  // New state to manage which image is currently displayed in the main view
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        setLoading(true);
        const data = await getPlantById(id);
        setPlant(data);
        // Set the initial main image to be the first one in the array, if it exists
        if (data.imageUrls && data.imageUrls.length > 0) {
          setMainImage(data.imageUrls[0]);
        }
      } catch (err) {
        setError("Could not find that plant. It might have been removed.");
        console.error("Fetch plant error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [id]); // This effect re-runs if the user navigates to a different plant detail page

  if (loading)
    return <p className="loading-message">Loading Plant Details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!plant) return null; // Don't render anything if the plant data isn't loaded yet

  const placeholderImage = `https://placehold.co/600x600/a2d2a2/333333?text=${plant.name.replace(
    " ",
    "+"
  )}`;
  // Determine the correct image to display, with fallbacks
  const displayImage =
    mainImage || (plant.imageUrls && plant.imageUrls[0]) || placeholderImage;

  return (
    <div className="plant-detail-container">
      <Link to="/" className="back-to-shop-link">
        ← Back to Shop
      </Link>
      <div className="plant-detail-card">
        <div className="plant-detail-gallery">
          {/* Main Image View */}
          <div className="main-image-wrapper">
            <img
              src={displayImage}
              alt={plant.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderImage;
              }}
            />
          </div>
          {/* Scrollable Thumbnail Strip */}
          {plant.imageUrls && plant.imageUrls.length > 1 && (
            <div className="thumbnail-strip">
              {plant.imageUrls.map((url, index) => (
                <div
                  key={index}
                  className={`thumbnail ${url === mainImage ? "active" : ""}`}
                  onClick={() => setMainImage(url)} // Click a thumbnail to make it the main image
                >
                  <img src={url} alt={`${plant.name} thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="plant-detail-info">
          <span className="plant-detail-category">{plant.category}</span>
          <h1 className="plant-detail-name">{plant.name}</h1>
          <p className="plant-detail-price">₹{plant.price}</p>
          <p className="plant-detail-stock">
            {plant.stock > 0
              ? `${plant.stock} available in stock`
              : "Currently out of stock"}
          </p>
          <p className="plant-detail-description">
            (A beautiful description will go here once added to the database).
            This {plant.name.toLowerCase()} is a high-quality plant, perfect for
            any{" "}
            {plant.category ? plant.category.toLowerCase() : "garden or home"}{" "}
            setting.
          </p>
          <button
            className="add-to-cart-btn-detail"
            onClick={() => addToCart(plant)}
            disabled={plant.stock === 0}
          >
            {plant.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantDetailPage;
