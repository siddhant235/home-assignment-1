import { create } from "zustand";
import { filterConfig } from "../data/filterConfig";

const initialState = {
  selectedTypes: new Set(["all"]), // Default to "All"
  selectedFeatures: new Set(),
  priceRange: [filterConfig.priceRange.min, filterConfig.priceRange.max],
  sizeRange: [filterConfig.sizeRange.min, filterConfig.sizeRange.max],
  priceRangeConfig: {
    min: filterConfig.priceRange.min,
    max: filterConfig.priceRange.max,
  },
};

export const useFilterStore = create((set, get) => ({
  ...initialState,
  isLoading: false,

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setPriceRangeConfig: (min, max) => {
    set((state) => {
      const newPriceRangeConfig = { min, max };
      // Update current price range if it exceeds new max
      const currentRange = state.priceRange;
      const updatedRange = [
        Math.min(currentRange[0], max),
        Math.min(currentRange[1], max),
      ];
      return {
        priceRangeConfig: newPriceRangeConfig,
        priceRange: updatedRange,
      };
    });
  },

  updatePropertyTypes: (typeId, isChecked, skipLoading = false) => {
    set((state) => {
      const newSelectedTypes = new Set(state.selectedTypes);

      if (typeId === "all") {
        if (isChecked) {
          // If "All" is checked, clear all others
          return { selectedTypes: new Set(["all"]) };
        }
      } else {
        // If a specific type is checked, remove "all"
        if (isChecked) {
          newSelectedTypes.delete("all");
          newSelectedTypes.add(typeId);
        } else {
          newSelectedTypes.delete(typeId);
          // If no types selected, default to "all"
          if (newSelectedTypes.size === 0) {
            newSelectedTypes.add("all");
          }
        }
      }

      // Simulate async filtering (skip during URL initialization)
      if (!skipLoading) {
        get().setLoading(true);
        setTimeout(() => {
          get().setLoading(false);
        }, 250);
      }

      return { selectedTypes: newSelectedTypes };
    });
  },

  updateFeatures: (feature, isChecked, skipLoading = false) => {
    set((state) => {
      const newSelectedFeatures = new Set(state.selectedFeatures);
      if (isChecked) {
        newSelectedFeatures.add(feature);
      } else {
        newSelectedFeatures.delete(feature);
      }

      // Simulate async filtering (skip during URL initialization)
      if (!skipLoading) {
        get().setLoading(true);
        setTimeout(() => {
          get().setLoading(false);
        }, 250);
      }

      return { selectedFeatures: newSelectedFeatures };
    });
  },

  updatePriceRange: (range, skipLoading = false) => {
    set({ priceRange: range });

    // Simulate async filtering (skip during URL initialization)
    if (!skipLoading) {
      get().setLoading(true);
      setTimeout(() => {
        get().setLoading(false);
      }, 250);
    }
  },

  updateSizeRange: (range, skipLoading = false) => {
    set({ sizeRange: range });

    // Simulate async filtering (skip during URL initialization)
    if (!skipLoading) {
      get().setLoading(true);
      setTimeout(() => {
        get().setLoading(false);
      }, 250);
    }
  },

  clearFilters: () => {
    set((state) => ({
      selectedTypes: new Set(["all"]),
      selectedFeatures: new Set(),
      priceRange: [state.priceRangeConfig.min, state.priceRangeConfig.max],
      sizeRange: [filterConfig.sizeRange.min, filterConfig.sizeRange.max],
    }));
  },
}));

