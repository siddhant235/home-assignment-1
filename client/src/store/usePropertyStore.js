import { create } from "zustand";

export const usePropertyStore = create((set) => ({
  properties: [],
  favorites: new Set(),

  loadProperties: (propertiesData) => {
    set({ properties: propertiesData });
  },

  toggleFavorite: (propertyId) => {
    set((state) => {
      const newFavorites = new Set(state.favorites);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return { favorites: newFavorites };
    });
  },

}));

