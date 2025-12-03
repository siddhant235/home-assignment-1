export const filterConfig = {
  propertyTypes: [
    { id: "all", label: "All" },
    { id: "Building", label: "Building" },
    { id: "Apartment", label: "Apartment" },
    { id: "Office", label: "Office" },
    { id: "Shop", label: "Shop" },
    { id: "House", label: "House" },
  ],
  features: [
    "Ac & Heating",
    "Dishwasher",
    "Balcony",
    "Fitness Center",
    "Clubhouse",
    "Spa",
    "Pool",
    "Valet Parking",
  ],
  priceRange: {
    min: 100,
    max: 10000,
  },
  sizeRange: {
    min: 0,
    max: 20000, // Based on data analysis
  },
};

