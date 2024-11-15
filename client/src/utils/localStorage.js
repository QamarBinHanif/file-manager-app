/**
 * Gets a value from localStorage
 * @param {string} key - The key to retrieve the value for
 * @returns {string|object|null} - The retrieved value (string or parsed object), or null if not found
 */
export const getLocalStorage = (key) => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        // Try parsing if the stored value is a JSON string
        try {
          return JSON.parse(storedValue);
        } catch (error) {
          return storedValue; // If it's not a JSON string, return the value as is
        }
      }
      return null; // Return null if the key doesn't exist
    } catch (error) {
      console.error("Error getting value from localStorage:", error);
      return null;
    }
  };
/**
 * Sets a value in localStorage
 * @param {string} key - The key to store the value under
 * @param {string|object} value - The value to store. It can be a string or an object (which will be stringified)
 */
export const setLocalStorage = (key, value) => {
    try {
      // If the value is an object, convert it to a JSON string
      const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value;
      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error("Error setting value in localStorage:", error);
    }
  };
    