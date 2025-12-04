# Real Estate Property Search

A responsive property search interface with advanced filtering, smooth animations, and accessibility features.

## 🚀 Installation & Running

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173` (or the port shown in terminal).

## 📦 Libraries & Why

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and dev server
- **Zustand** - Lightweight state management (no boilerplate, perfect for this use case)
- **React Icons** - Icon library for consistent UI elements
- **CSS Modules** - Scoped styling without additional dependencies

## 🎯 What I Prioritized

### 1. **Core Functionality First**

- All required filters (Type, Features, Price, Size)
- Proper filtering logic with edge case handling
- Responsive design with mobile drawer

### 2. **Performance Optimization**

- Memoized components to prevent unnecessary re-renders
- Custom equality functions for Zustand selectors
- Optimized filter components to only re-render when their specific state changes

### 3. **User Experience**

- Smooth animations for drawer and property grid
- Loading states with skeleton screens
- URL synchronization for shareable filtered results
- Keyboard navigation and ARIA labels for accessibility

### 4. **Code Quality**

- Clean component structure with separation of concerns
- Reusable hooks and utilities
- Type-safe state management

## 🔮 What I'd Improve with More Time

1. **Testing**

   - Unit tests for filter logic
   - Integration tests for user flows
   - E2E tests for critical paths

2. **Performance**

   - Virtual scrolling for large property lists
   - Image lazy loading and optimization
   - Debouncing for price/size range inputs

3. **Features**

   - Sort functionality (price, size, date)
   - Pagination or infinite scroll
   - Advanced filters (location, amenities)
   - Property detail modal/page
   - Favorite persistence (localStorage/backend)

4. **Accessibility**

   - Screen reader testing with real devices
   - High contrast mode support
   - Reduced motion preferences

5. **Code**
   - TypeScript migration for type safety
   - Storybook for component documentation
   - Better error boundaries and error handling

## 💡 Assumptions Made

1. **Data Structure**: Properties JSON is static and loaded once on mount
2. **Favorites**: Session-only persistence (no backend/localStorage)
3. **Browser Support**: Modern browsers (ES6+ support)
4. **Design**: Mobile layout created based on desktop design patterns
5. **Performance**: Optimized for ~40 properties (no pagination needed)
6. **Accessibility**: WCAG 2.1 AA compliance targeted

## 🏗️ Project Structure

```
client/src/
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── store/           # Zustand state management
├── utils/           # Utility functions
├── views/           # Page-level components
└── data/            # Configuration data
```

## ✨ Key Features Implemented

- ✅ All core filters (Type, Features, Price Range, Size)
- ✅ Responsive design with mobile drawer
- ✅ Smooth animations and transitions
- ✅ URL state synchronization
- ✅ Loading states with skeletons
- ✅ Full keyboard navigation
- ✅ ARIA labels and focus management
- ✅ Performance optimizations
- ✅ Empty states

## 📝 Notes

- Filter state persists in URL for easy sharing
- All filter components are optimized to prevent unnecessary re-renders
- Mobile drawer includes focus trap and keyboard navigation
- Property cards only re-render when their favorite status changes

---

Built with ❤️ using React and modern web technologies.
