export const getToken = () => {
  // Always get the item with the key 'authToken'
  return localStorage.getItem("authToken");
};

export const setToken = (token) => {
  // Always set the item with the key 'authToken'
  localStorage.setItem("authToken", token);
};

export const removeToken = () => {
  // Always remove the item with the key 'authToken'
  localStorage.removeItem("authToken");
};
