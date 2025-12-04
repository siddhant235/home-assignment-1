/**
 * Calculate min and max price from properties dataset
 * @param {Array} properties - Array of property objects
 * @returns {Object} Object with min and max price values
 */
export const calculatePriceRange = (properties) => {
    if (!properties || properties.length === 0) {
        return { min: 100, max: 10000 }; // Default fallback
    }

    const prices = properties.map((property) => property.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    // Round to nearest 100 for cleaner UI
    return {
        min: Math.floor(min / 100) * 100,
        max: Math.ceil(max / 100) * 100,
    };
};

