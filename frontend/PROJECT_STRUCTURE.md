# E-Commerce Application - Project Structure

This document outlines the industry-standard folder structure for the e-commerce React application.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── CartDrawer/
│   │   │   └── CartDrawer.jsx
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── Header/
│   │   │   └── Header.jsx
│   │   ├── HeroBanner/
│   │   │   └── HeroBanner.jsx
│   │   ├── ProductCard/
│   │   │   └── ProductCard.jsx
│   │   ├── ProductModal/
│   │   │   └── ProductModal.jsx
│   │   └── StarRating/
│   │       └── StarRating.jsx
│   │
│   ├── data/                    # Static data and configuration
│   │   ├── categories.js        # Category constants
│   │   └── products.js          # Product data
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useCart.js           # Shopping cart logic
│   │   ├── useFiltering.js      # Product filtering and sorting
│   │   ├── useNotification.js   # Notification management
│   │   └── useProductView.js    # Product view history
│   │
│   ├── pages/                   # Page components
│   │   └── Shop.jsx             # Main shop/home page
│   │
│   ├── styles/                  # Global styles and variables
│   │   ├── globals.css          # Global styles and animations
│   │   └── variables.css        # CSS variables and design tokens
│   │
│   ├── utils/                   # Utility functions
│   │   ├── constants.js         # App constants
│   │   └── recommendations.js   # AI recommendation algorithm
│   │
│   ├── App.jsx                  # Main App component
│   ├── main.jsx                 # Entry point
│   ├── App.css                  # App-specific styles (optional)
│   └── index.css                # Legacy index styles
│
├── public/                      # Static assets
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
└── index.html                   # HTML template
```

## 🎯 Folder Responsibilities

### `/components`
Contains reusable, presentation-focused React components. Each component:
- Has its own folder
- Contains the `.jsx` file
- May contain component-specific styles (future: `.module.css`)
- Is exported as default export

**Components included:**
- `CartDrawer` - Shopping cart sidebar
- `Footer` - Application footer
- `Header` - Navigation header with search
- `HeroBanner` - Hero section
- `ProductCard` - Product display card
- `ProductModal` - Product detail modal
- `StarRating` - Star rating component

### `/data`
Contains static data and configuration files:
- `products.js` - Product database/mock data
- `categories.js` - Category listings

### `/hooks`
Custom React hooks for business logic:
- `useCart` - Manages cart state and operations
- `useFiltering` - Handles product filtering and sorting
- `useNotification` - Manages notifications
- `useProductView` - Tracks product view history

### `/pages`
Page-level components that combine multiple components:
- `Shop.jsx` - Main shopping page (combines Header, Products, Footer, etc.)

### `/styles`
Global CSS and design system variables:
- `globals.css` - Global styles, animations, utilities
- `variables.css` - CSS custom properties for theming

### `/utils`
Utility functions and constants:
- `recommendations.js` - AI recommendation algorithm
- `constants.js` - App-wide constants (badge styles, feature icons, etc.)

## 🚀 How to Use

### Adding a New Component
1. Create a folder in `/components` with the component name
2. Create `ComponentName.jsx` inside it
3. Export it as default
4. Import where needed

```jsx
// components/MyComponent/MyComponent.jsx
export default function MyComponent() {
  return <div>My Component</div>;
}

// Usage
import MyComponent from './components/MyComponent/MyComponent';
```

### Adding a Custom Hook
1. Create a file in `/hooks` named `useHookName.js`
2. Export the hook function
3. Import in components or pages

```jsx
// hooks/useMyHook.js
export function useMyHook() {
  // hook logic
}

// Usage
import { useMyHook } from '../hooks/useMyHook';
```

### Adding Utilities
1. Create a file in `/utils` for related utilities
2. Export individual functions
3. Import where needed

## 📦 Benefits of This Structure

✅ **Scalability** - Easy to add new features and components
✅ **Maintainability** - Clear separation of concerns
✅ **Reusability** - Shared components and hooks across the app
✅ **Testability** - Each file has a single responsibility
✅ **Organization** - Logical grouping of related code
✅ **Collaboration** - Team members can work on different features independently

## 🔄 Data Flow

```
App (main-entry)
  ↓
Shop (page-level component)
  ├── useCart (hook)
  ├── useFiltering (hook)
  ├── useNotification (hook)
  ├── useProductView (hook)
  ├── Header (component)
  ├── ProductCard (component)
  ├── CartDrawer (component)
  ├── ProductModal (component)
  └── Footer (component)
```

## 🎨 Styling Approach

- **Tailwind CSS** for component styling (classes in JSX)
- **CSS Variables** in `/styles` for consistent design tokens
- **CSS Animations** in `/styles/globals.css`
- Future: **CSS Modules** for scoped component styles

## 🔐 Best Practices

1. **Component Props** - Pass data via props, don't access global state directly
2. **Hook Logic** - Keep business logic in hooks, components should be presentational
3. **Constants** - Define reusable values in `/utils/constants.js`
4. **Naming** - Use clear, descriptive names for files and functions
5. **Exports** - Use default exports for components, named exports for utilities/hooks
6. **Dependencies** - Keep component dependencies minimal for reusability

## 📝 Notes

- This structure follows React and modern JavaScript best practices
- It's easily scalable from a prototype to a large production application
- Each folder has a specific purpose to maintain code organization
- The separation allows for easy testing and debugging

## 🔄 Migration from Old Structure

The old monolithic `App.jsx` has been refactored into:
- Smaller reusable components
- Custom hooks for state management
- Separated utilities and data
- Proper page structure

This makes the codebase more maintainable and scalable.
