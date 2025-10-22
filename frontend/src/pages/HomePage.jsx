// // // // import React, { useState, useEffect } from "react";
// // // // import { getAllPlants } from "../services/plantService";
// // // // import PlantCard from "../components/ui/PlantCard";

// // // // const HomePage = () => {
// // // //   const [plants, setPlants] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchPlants = async () => {
// // // //       try {
// // // //         const plantsData = await getAllPlants();
// // // //         setPlants(plantsData);
// // // //       } catch (err) {
// // // //         setError("Failed to fetch plants.");
// // // //         console.error(err);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchPlants();
// // // //   }, []);

// // // //   if (loading) return <p>Loading plants...</p>;
// // // //   if (error) return <p>{error}</p>;

// // // //   return (
// // // //     <div>
// // // //       <h1>Welcome to Our Nursery</h1>
// // // //       <div className="plant-list">
// // // //         {plants.map((plant) => (
// // // //           <PlantCard key={plant._id} plant={plant} />
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default HomePage;
// // // import React, { useState, useEffect } from "react";
// // // import { getAllPlants } from "../services/plantService";
// // // import PlantCard from "../components/ui/PlantCard";

// // // const HomePage = () => {
// // //   const [plants, setPlants] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchPlants = async () => {
// // //       try {
// // //         const plantsData = await getAllPlants();
// // //         setPlants(plantsData);
// // //       } catch (err) {
// // //         setError("Failed to fetch plants.");
// // //         console.error(err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchPlants();
// // //   }, []);

// // //   if (error) return <p>{error}</p>;

// // //   return (
// // //     <>
// // //       <section className="hero-section">
// // //         <h1>The Munagala plant Deliveries</h1>
// // //         <p>
// // //           Your one-stop shop for healthy, beautiful plants delivered to your
// // //           doorstep.
// // //         </p>
// // //       </section>

// // //       <div className="container">
// // //         {loading ? (
// // //           <p>Loading plants...</p>
// // //         ) : (
// // //           <div className="plant-list">
// // //             {plants.map((plant) => (
// // //               <PlantCard key={plant._id} plant={plant} />
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default HomePage;
// // import React, { useState, useEffect, useMemo } from "react";
// // import { getAllPlants } from "../services/plantService";
// // import PlantCard from "../components/ui/PlantCard";

// // const HomePage = () => {
// //   const [allPlants, setAllPlants] = useState([]); // Stores the original, full list of plants
// //   const [searchTerm, setSearchTerm] = useState(""); // Stores what the user is typing
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Fetch all plants from the API only once when the component loads
// //   useEffect(() => {
// //     const fetchPlants = async () => {
// //       try {
// //         const plantsData = await getAllPlants();
// //         setAllPlants(plantsData);
// //       } catch (err) {
// //         setError("Failed to fetch plants.");
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchPlants();
// //   }, []);

// //   // This is the core of the search logic.
// //   // It filters the `allPlants` list based on the `searchTerm`.
// //   // `useMemo` is a performance optimization: it only recalculates when the data changes.
// //   const filteredPlants = useMemo(() => {
// //     if (!searchTerm) {
// //       return allPlants; // If search is empty, show all plants
// //     }
// //     return allPlants.filter((plant) =>
// //       plant.name.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //   }, [searchTerm, allPlants]);

// //   if (error) return <p>{error}</p>;

// //   return (
// //     <>
// //       <section className="hero-section">
// //         <h1>The Munagala Plant Deliveries</h1>
// //         <p>
// //           Green vibes, delivered with care. Beautiful plants delivered to your
// //           doorstep.
// //         </p>
// //       </section>

// //       {/* --- THE SEARCH BAR UI --- */}
// //       <div className="search-container">
// //         <div className="search-bar">
// //           <input
// //             type="text"
// //             placeholder="Search for plants..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //         </div>
// //       </div>

// //       <div className="container">
// //         {loading ? (
// //           <p style={{ textAlign: "center", padding: "2rem" }}>
// //             Loading plants...
// //           </p>
// //         ) : (
// //           <div className="plant-list">
// //             {/* Display the filtered list of plants */}
// //             {filteredPlants.length > 0 ? (
// //               filteredPlants.map((plant) => (
// //                 <PlantCard key={plant._id} plant={plant} />
// //               ))
// //             ) : (
// //               <p style={{ textAlign: "center", padding: "2rem" }}>
// //                 No plants found matching your search.
// //               </p>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default HomePage;
// import React, { useState, useEffect, useMemo } from "react";
// import { getAllPlants } from "../services/plantService";
// import PlantCard from "../components/ui/PlantCard";

// const HomePage = () => {
//   const [allPlants, setAllPlants] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All"); // New state for category
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch all plants from the API only once when the component loads
//   useEffect(() => {
//     const fetchPlants = async () => {
//       try {
//         const plantsData = await getAllPlants();
//         setAllPlants(plantsData);
//       } catch (err) {
//         setError("Failed to fetch plants.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPlants();
//   }, []);

//   // Automatically derive the list of unique categories from the plant data
//   const categories = useMemo(() => {
//     // new Set() automatically handles duplicates and filter(Boolean) removes empty/null categories
//     const uniqueCategories = new Set(
//       allPlants.map((p) => p.category).filter(Boolean)
//     );
//     return ["All", ...uniqueCategories];
//   }, [allPlants]);

//   // The filtering logic now checks BOTH search term AND selected category
//   const filteredPlants = useMemo(() => {
//     return allPlants.filter((plant) => {
//       const matchesCategory =
//         selectedCategory === "All" || plant.category === selectedCategory;
//       const matchesSearch = plant.name
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       return matchesCategory && matchesSearch;
//     });
//   }, [searchTerm, selectedCategory, allPlants]);

//   if (error)
//     return <p style={{ textAlign: "center", padding: "2rem" }}>{error}</p>;

//   return (
//     <>
//       <section className="hero-section">
//         <h1>Welcome to The Green Leaf Nursery</h1>
//         <p>
//           Your one-stop shop for healthy, beautiful plants delivered to your
//           doorstep.
//         </p>
//       </section>

//       <div className="search-container">
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search for plants..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="container">
//         {/* --- CATEGORY FILTER BUTTONS --- */}
//         {/* Only show filters if there are categories to choose from */}
//         {categories.length > 1 && (
//           <div className="filter-container">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 className={`filter-btn ${
//                   selectedCategory === category ? "active" : ""
//                 }`}
//                 onClick={() => setSelectedCategory(category)}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         )}

//         {loading ? (
//           <p style={{ textAlign: "center", padding: "2rem" }}>
//             Loading plants...
//           </p>
//         ) : (
//           <div className="plant-list">
//             {filteredPlants.length > 0 ? (
//               filteredPlants.map((plant) => (
//                 <PlantCard key={plant._id} plant={plant} />
//               ))
//             ) : (
//               <p style={{ textAlign: "center", padding: "2rem" }}>
//                 No plants found. Try adjusting your search or filters.
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default HomePage;
import React, { useState, useEffect, useMemo } from "react";
import { getAllPlants } from "../services/plantService";
import PlantCard from "../components/ui/PlantCard";

const HomePage = () => {
  const [allPlants, setAllPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const plantsData = await getAllPlants();
        setAllPlants(plantsData);
      } catch (err) {
        setError("Failed to fetch plants.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  // --- THIS IS THE CORRECTED LOGIC ---
  // It now normalizes categories to be case-insensitive, removing duplicates.
  const categories = useMemo(() => {
    // Helper function to convert "indoor" or "FLOWER" to "Indoor" or "Flower"
    const toTitleCase = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    // Use a Map to store unique categories, with the lowercase version as the key
    // This ensures that "Indoor" and "indoor" are treated as the same category
    const categoryMap = new Map();
    allPlants.forEach((plant) => {
      if (plant.category) {
        categoryMap.set(
          plant.category.toLowerCase(),
          toTitleCase(plant.category)
        );
      }
    });

    // Get the unique, nicely formatted values from the map and sort them
    const uniqueCategories = Array.from(categoryMap.values()).sort();

    return ["All", ...uniqueCategories];
  }, [allPlants]);

  const filteredPlants = useMemo(() => {
    return allPlants.filter((plant) => {
      // Also make the filtering logic case-insensitive
      const matchesCategory =
        selectedCategory === "All" ||
        (plant.category &&
          plant.category.toLowerCase() === selectedCategory.toLowerCase());
      const matchesSearch = plant.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory, allPlants]);

  if (error) return <p>{error}</p>;

  return (
    <>
      <section className="hero-section">
        <h1>Welcome to The Munagala Plant Deliveries</h1>
        <p>
          Your one-stop shop for healthy, beautiful plants delivered to your
          doorstep.
        </p>
      </section>

      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="container">
        {categories.length > 1 && (
          <div className="filter-container">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p style={{ textAlign: "center", padding: "2rem" }}>
            Loading plants...
          </p>
        ) : (
          <div className="plant-list">
            {filteredPlants.length > 0 ? (
              filteredPlants.map((plant) => (
                <PlantCard key={plant._id} plant={plant} />
              ))
            ) : (
              <p style={{ textAlign: "center", padding: "2rem" }}>
                No plants found. Try adjusting your search or filters.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
