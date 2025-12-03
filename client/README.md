# Property Search Application

A modern, responsive property search interface built with React, Vite, and Zustand for state management.

## Features

✅ **Property Grid**

- Responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Property cards with image, title, location, price, and favorite button
- Smooth hover effects and transitions

✅ **Type of Place Filter**

- Checkbox filtering for property types (All, Building, Apartment, Office, Shop, House)
- "All" checkbox deselects other options when checked
- Checking any specific type unchecks "All"

✅ **Features Filter**

- Multi-select checkboxes for property features
- Properties must have ALL selected features to match

✅ **Price Range Slider**

- Native dual-handle range slider (no external dependencies)
- Synced with currency input fields
- Visual range indicator

✅ **Size Filter**

- Min and Max square footage inputs
- Validation prevents Min from exceeding Max
- Error state display

✅ **Responsive Layout**

- Mobile-first design (320px+)
- Filter drawer/modal for mobile devices
- Touch-friendly interactions

✅ **Empty States**

- Message when no properties match filters
- "Clear Filters" button to reset all filters

✅ **Favorite Toggle**

- Heart icon toggles between filled/unfilled state
- Red heart when favorited
- State persists during session

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Zustand** - Lightweight state management
- **React Icons** - Icon library
- **CSS Modules** - Scoped styling

## Project Structure

```
client/src/
├── components/          # Reusable UI components
│   ├── PropertyCard/    # Individual property card
│   ├── PropertyGrid/    # Grid layout for properties
│   ├── FilterSection/    # Filter components
│   │   ├── TypeFilter.jsx
│   │   ├── PriceRangeFilter.jsx
│   │   ├── SizeFilter.jsx
│   │   └── FeaturesFilter.jsx
│   ├── EmptyState/      # Empty state component
│   ├── MobileFilterDrawer/  # Mobile filter drawer
│   └── MobileFilterButton/   # Mobile filter button
├── views/               # Page-level components
│   └── PropertySearchView.jsx
├── store/               # Zustand stores
│   ├── usePropertyStore.js
│   └── useFilterStore.js
├── data/                # Data configuration
│   └── filterConfig.js
├── utils/               # Utility functions
│   ├── propertyFilters.js
│   ├── formatters.js
│   └── loadProperties.js
└── hooks/               # Custom React hooks
    └── useFilteredProperties.js
```

## Installation

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port Vite assigns).

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Architecture Decisions

### State Management

- **Zustand** was chosen for its simplicity and minimal re-render optimization
- Separate stores for properties and filters for better organization
- Selectors prevent unnecessary component re-renders

### Native Range Slider

- Built a custom dual-handle range slider using HTML5 range inputs
- No external dependencies, fully customizable
- Overlapping inputs with z-index management for proper handle interaction

### Component Structure

- Modular components with clear separation of concerns
- CSS Modules for scoped styling
- Reusable components following single responsibility principle

### Data-Driven Approach

- All filter options come from `filterConfig.js`
- No hardcoded values in components
- Easy to extend and maintain

### Performance Optimizations

- React.memo for PropertyCard to prevent unnecessary re-renders
- useMemo in useFilteredProperties hook for expensive filter calculations
- Zustand selectors to minimize re-renders

## Responsive Breakpoints

- **Mobile**: < 768px (filter drawer, single column grid)
- **Tablet**: 768px - 1024px (2 column grid)
- **Desktop**: > 1024px (3 column grid, sidebar filters)

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus management
- Semantic HTML structure

## Future Improvements

With more time, I would add:

1. **URL State Persistence** - Sync filter state with URL query parameters
2. **Advanced Animations** - Smooth transitions for filter changes
3. **Loading States** - Skeleton screens while filtering
4. **Image Optimization** - Lazy loading and responsive images
5. **Search Functionality** - Text search for property titles
6. **Sort Options** - Sort by price, size, etc.
7. **Pagination** - For large result sets
8. **Unit Tests** - Comprehensive test coverage

## Libraries Used

- `zustand` - State management
- `react-icons` - Icon library

No other external dependencies were used to keep the bundle size minimal.
