// // // // import React from "react";

// // // // const PlantCard = ({ plant }) => {
// // // //   return (
// // // //     <div className="plant-card">
// // // //       <h3>{plant.name}</h3>
// // // //       <p>Price: ₹{plant.price}</p>
// // // //       <p>In Stock: {plant.stock}</p>
// // // //       <button>Add to Cart</button>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PlantCard;
// // // import React from "react";
// // // import { useCart } from "../../contexts/CartContext"; // <-- 1. Import useCart

// // // const PlantCard = ({ plant }) => {
// // //   const { addToCart } = useCart(); // <-- 2. Get the addToCart function

// // //   return (
// // //     <div className="plant-card">
// // //       <h3>{plant.name}</h3>
// // //       <p>Price: ₹{plant.price}</p>
// // //       <p>In Stock: {plant.stock}</p>
// // //       {/* 3. Call addToCart when the button is clicked */}
// // //       <button onClick={() => addToCart(plant)}>Add to Cart</button>
// // //     </div>
// // //   );
// // // };

// // // export default PlantCard;
// // import React from "react";
// // import { useCart } from "../../contexts/CartContext";

// // const PlantCard = ({ plant }) => {
// //   const { addToCart } = useCart();

// //   // A placeholder image for plants that don't have one yet
// //   const placeholderImage = `https://placehold.co/600x400/a2d2a2/333333?text=${plant.name.replace(
// //     " ",
// //     "+"
// //   )}`;

// //   return (
// //     <div className="plant-card">
// //       <div className="plant-card-image-container">
// //         <img
// //           src={plant.imageUrl || placeholderImage}
// //           alt={plant.name}
// //           className="plant-card-image"
// //           // This onError is a fallback in case the image link is broken
// //           onError={(e) => {
// //             e.target.onerror = null;
// //             e.target.src = placeholderImage;
// //           }}
// //         />
// //       </div>
// //       <div className="plant-card-content">
// //         <h3 className="plant-card-name">{plant.name}</h3>
// //         <p className="plant-card-category">{plant.category}</p>
// //         <div className="plant-card-footer">
// //           <p className="plant-card-price">₹{plant.price}</p>
// //           <button
// //             className="plant-card-button"
// //             onClick={() => addToCart(plant)}
// //             disabled={plant.stock === 0}
// //           >
// //             {plant.stock > 0 ? "Add to Cart" : "Out of Stock"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PlantCard;
// import React from "react";
// import { useCart } from "../../contexts/CartContext";
// import { Link } from "react-router-dom"; // 1. Import the Link component

// const PlantCard = ({ plant }) => {
//   const { addToCart } = useCart();

//   const placeholderImage = `https://placehold.co/600x400/a2d2a2/333333?text=${plant.name.replace(
//     " ",
//     "+"
//   )}`;

//   // This special handler function is crucial.
//   // It prevents the whole card from navigating when you just want to add to cart.
//   const handleAddToCartClick = (e) => {
//     e.preventDefault(); // 2. This stops the Link's navigation behavior
//     addToCart(plant);
//   };

//   return (
//     // 3. Wrap the entire card structure in a Link component.
//     // The link dynamically points to the correct detail page using the plant's ID.
//     <Link to={`/plant/${plant._id}`} className="plant-card-link">
//       <div className="plant-card">
//         <div className="plant-card-image-container">
//           <img
//             src={plant.imageUrl || placeholderImage}
//             alt={plant.name}
//             className="plant-card-image"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = placeholderImage;
//             }}
//           />
//         </div>
//         <div className="plant-card-content">
//           <h3 className="plant-card-name">{plant.name}</h3>
//           <p className="plant-card-category">{plant.category}</p>
//           <div className="plant-card-footer">
//             <p className="plant-card-price">₹{plant.price}</p>
//             <button
//               className="plant-card-button"
//               onClick={handleAddToCartClick} // 4. Use the new handler here
//               disabled={plant.stock === 0}
//             >
//               {plant.stock > 0 ? "Add to Cart" : "Out of Stock"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default PlantCard;
import React from "react";
import { useCart } from "../../contexts/CartContext";
import { Link } from "react-router-dom";

const PlantCard = ({ plant }) => {
  const { addToCart } = useCart();

  const placeholderImage = `https://placehold.co/600x400/a2d2a2/333333?text=${plant.name.replace(
    " ",
    "+"
  )}`;

  // This special handler function is important.
  // It prevents the whole card from navigating when you only want to add an item to the cart.
  const handleAddToCartClick = (e) => {
    e.preventDefault(); // This stops the Link's navigation behavior.
    addToCart(plant);
  };

  return (
    // The entire card is wrapped in a Link component.
    // The link dynamically points to the correct detail page using the plant's ID.
    <Link to={`/plant/${plant._id}`} className="plant-card-link">
      <div className="plant-card">
        <div className="plant-card-image-container">
          <img
            // It now displays the FIRST image from the new imageUrls array.
            src={
              plant.imageUrls && plant.imageUrls.length > 0
                ? plant.imageUrls[0]
                : placeholderImage
            }
            alt={plant.name}
            className="plant-card-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholderImage;
            }}
          />
        </div>
        <div className="plant-card-content">
          <h3 className="plant-card-name">{plant.name}</h3>
          <p className="plant-card-category">{plant.category}</p>
          <div className="plant-card-footer">
            <p className="plant-card-price">₹{plant.price}</p>
            <button
              className="plant-card-button"
              onClick={handleAddToCartClick} // Use the new handler here.
              disabled={plant.stock === 0}
            >
              {plant.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlantCard;
