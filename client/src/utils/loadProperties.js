import propertiesData from "../../../data/properties.json";

/**
 * Load properties data
 * In a real app, this would be an API call
 * @returns {Array} Array of property objects
 */
export const loadProperties = () => {
  return propertiesData;
};

