import React, { createContext, useState, useContext } from "react";

// Create the context
const CartContext = createContext();

// Create a custom hook to use the cart context easily
export const useCart = () => {
  return useContext(CartContext);
};

// Create the Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add a plant to the cart
  const addToCart = (plantToAdd) => {
    setCartItems((prevItems) => {
      // Check if the item is already in the cart
      const existingItem = prevItems.find(
        (item) => item._id === plantToAdd._id
      );

      if (existingItem) {
        // If it exists, map over the items and increase the quantity of the matching item
        return prevItems.map((item) =>
          item._id === plantToAdd._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If it's a new item, add it to the array with a quantity of 1
        return [...prevItems, { ...plantToAdd, quantity: 1 }];
      }
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (plantId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== plantId)
    );
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  const cartValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
};
