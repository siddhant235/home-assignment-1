import { create } from "zustand";
import { filterConfig } from "../data/filterConfig";

const initialState = {
  selectedTypes: new Set(["all"]), // Default to "All"
  selectedFeatures: new Set(),
  priceRange: [filterConfig.priceRange.min, filterConfig.priceRange.max],
  sizeRange: [filterConfig.sizeRange.min, filterConfig.sizeRange.max],
};

export const useFilterStore = create((set) => ({
  ...initialState,

  updatePropertyTypes: (typeId, isChecked) => {
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

      return { selectedTypes: newSelectedTypes };
    });
  },

  updateFeatures: (feature, isChecked) => {
    set((state) => {
      const newSelectedFeatures = new Set(state.selectedFeatures);
      if (isChecked) {
        newSelectedFeatures.add(feature);
      } else {
        newSelectedFeatures.delete(feature);
      }
      return { selectedFeatures: newSelectedFeatures };
    });
  },

  updatePriceRange: (range) => {
    set({ priceRange: range });
  },

  updateSizeRange: (range) => {
    set({ sizeRange: range });
  },

  clearFilters: () => {
    set({
      selectedTypes: new Set(["all"]),
      selectedFeatures: new Set(),
      priceRange: [filterConfig.priceRange.min, filterConfig.priceRange.max],
      sizeRange: [filterConfig.sizeRange.min, filterConfig.sizeRange.max],
    });
  },
}));

