import { useMemo } from "react";
import { usePropertyStore } from "../store/usePropertyStore";
import { useFilterStore } from "../store/useFilterStore";
import { applyAllFilters } from "../utils/propertyFilters";

/**
 * Custom hook to get filtered properties
 * Memoizes the result to prevent unnecessary recalculations
 */
export const useFilteredProperties = () => {
    const properties = usePropertyStore((state) => state.properties);
    const selectedTypes = useFilterStore((state) => state.selectedTypes);
    const selectedFeatures = useFilterStore((state) => state.selectedFeatures);
    const priceRange = useFilterStore((state) => state.priceRange);
    const sizeRange = useFilterStore((state) => state.sizeRange);

    const filteredProperties = useMemo(() => {
        const filters = {
            selectedTypes,
            selectedFeatures,
            priceRange,
            sizeRange,
        };

        return applyAllFilters(properties, filters);
    }, [properties, selectedTypes, selectedFeatures, priceRange, sizeRange]);

    return filteredProperties;
};

