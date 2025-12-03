/**
 * Filter properties by type
 * @param {Array} properties - Array of property objects
 * @param {Set} selectedTypes - Set of selected property types
 * @returns {Array} Filtered properties
 */
export const filterByType = (properties, selectedTypes) => {
    if (selectedTypes.has("all") || selectedTypes.size === 0) {
        return properties;
    }

    return properties.filter((property) =>
        selectedTypes.has(property.type)
    );
};

/**
 * Filter properties by features
 * Properties must have ALL selected features
 * @param {Array} properties - Array of property objects
 * @param {Set} selectedFeatures - Set of selected features
 * @returns {Array} Filtered properties
 */
export const filterByFeatures = (properties, selectedFeatures) => {
    if (selectedFeatures.size === 0) {
        return properties;
    }

    return properties.filter((property) => {
        const propertyFeatures = new Set(property.features || []);
        // Check if property has all selected features
        return Array.from(selectedFeatures).every((feature) =>
            propertyFeatures.has(feature)
        );
    });
};

/**
 * Filter properties by price range
 * @param {Array} properties - Array of property objects
 * @param {Array} priceRange - [min, max] price range
 * @returns {Array} Filtered properties
 */
export const filterByPrice = (properties, priceRange) => {
    const [minPrice, maxPrice] = priceRange;
    return properties.filter(
        (property) => property.price >= minPrice && property.price <= maxPrice
    );
};

/**
 * Filter properties by size range
 * @param {Array} properties - Array of property objects
 * @param {Array} sizeRange - [min, max] size range
 * @returns {Array} Filtered properties
 */
export const filterBySize = (properties, sizeRange) => {
    const [minSize, maxSize] = sizeRange;
    return properties.filter(
        (property) => property.size >= minSize && property.size <= maxSize
    );
};

/**
 * Apply all filters to properties
 * @param {Array} properties - Array of property objects
 * @param {Object} filters - Filter state object
 * @returns {Array} Filtered properties
 */
export const applyAllFilters = (properties, filters) => {
    let filtered = properties;

    // Apply type filter
    filtered = filterByType(filtered, filters.selectedTypes);

    // Apply features filter
    filtered = filterByFeatures(filtered, filters.selectedFeatures);

    // Apply price filter
    filtered = filterByPrice(filtered, filters.priceRange);

    // Apply size filter
    filtered = filterBySize(filtered, filters.sizeRange);

    return filtered;
};

