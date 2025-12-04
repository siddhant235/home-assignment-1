import { useEffect, useCallback } from "react";
import { useFilterStore } from "../store/useFilterStore";
import { filterConfig } from "../data/filterConfig";

/**
 * Hook to sync filter state with URL query parameters
 * Allows sharing filtered results via URL
 */
export const useURLSync = () => {
  const {
    selectedTypes,
    selectedFeatures,
    priceRange,
    sizeRange,
    priceRangeConfig,
    updatePropertyTypes,
    updateFeatures,
    updatePriceRange,
    updateSizeRange,
  } = useFilterStore();

  // Serialize filter state to URL params
  const serializeToURL = useCallback(() => {
    const params = new URLSearchParams();

    // Serialize selected types (skip "all" if it's the only one)
    if (!selectedTypes.has("all") || selectedTypes.size > 1) {
      const typesArray = Array.from(selectedTypes).filter((t) => t !== "all");
      if (typesArray.length > 0) {
        params.set("types", typesArray.join(","));
      }
    }

    // Serialize selected features
    if (selectedFeatures.size > 0) {
      params.set("features", Array.from(selectedFeatures).join(","));
    }

    // Serialize price range (only if not default)
    if (
      priceRange[0] !== priceRangeConfig.min ||
      priceRange[1] !== priceRangeConfig.max
    ) {
      params.set("priceMin", priceRange[0].toString());
      params.set("priceMax", priceRange[1].toString());
    }

    // Serialize size range (only if not default)
    if (
      sizeRange[0] !== filterConfig.sizeRange.min ||
      sizeRange[1] !== filterConfig.sizeRange.max
    ) {
      params.set("sizeMin", sizeRange[0].toString());
      params.set("sizeMax", sizeRange[1].toString());
    }

    const newURL = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, "", newURL);
  }, [selectedTypes, selectedFeatures, priceRange, priceRangeConfig, sizeRange]);

  // Deserialize URL params to filter state
  const deserializeFromURL = useCallback((skipLoading = false) => {
    const params = new URLSearchParams(window.location.search);

    // Deserialize types
    const typesParam = params.get("types");
    if (typesParam) {
      const typesArray = typesParam.split(",").filter(Boolean);
      typesArray.forEach((type) => {
        updatePropertyTypes(type, true, skipLoading);
      });
    }

    // Deserialize features
    const featuresParam = params.get("features");
    if (featuresParam) {
      const featuresArray = featuresParam.split(",").filter(Boolean);
      featuresArray.forEach((feature) => {
        updateFeatures(feature, true, skipLoading);
      });
    }

    // Deserialize price range
    const priceMin = params.get("priceMin");
    const priceMax = params.get("priceMax");
    if (priceMin && priceMax) {
      const currentConfig = useFilterStore.getState().priceRangeConfig;
      const min = Math.max(
        currentConfig.min,
        Math.min(Number(priceMin), currentConfig.max)
      );
      const max = Math.min(
        currentConfig.max,
        Math.max(Number(priceMax), currentConfig.min)
      );
      if (min <= max) {
        updatePriceRange([min, max], skipLoading);
      }
    }

    // Deserialize size range
    const sizeMin = params.get("sizeMin");
    const sizeMax = params.get("sizeMax");
    if (sizeMin && sizeMax) {
      const min = Math.max(
        filterConfig.sizeRange.min,
        Math.min(Number(sizeMin), filterConfig.sizeRange.max)
      );
      const max = Math.min(
        filterConfig.sizeRange.max,
        Math.max(Number(sizeMax), filterConfig.sizeRange.min)
      );
      if (min <= max) {
        updateSizeRange([min, max], skipLoading);
      }
    }
  }, [updatePropertyTypes, updateFeatures, updatePriceRange, updateSizeRange]);

  // Initialize from URL on mount
  useEffect(() => {
    deserializeFromURL(true); // Skip loading state on initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Update URL when filters change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      serializeToURL();
    }, 300); // Debounce URL updates

    return () => clearTimeout(timeoutId);
  }, [serializeToURL]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      deserializeFromURL(false); // Allow loading state on navigation
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [deserializeFromURL]);
};

