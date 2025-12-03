/**
 * Format price as currency
 * @param {number} price - Price value
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Format size as square footage
 * @param {number} size - Size in square feet
 * @returns {string} Formatted size string
 */
export const formatSize = (size) => {
  return `${size.toLocaleString()} sq ft`;
};

