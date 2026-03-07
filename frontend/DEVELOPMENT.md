# Development Guide

This guide provides instructions on how to develop within the structured e-commerce application.

## 🚀 Getting Started

### Project Setup

```bash
cd frontend
npm install
npm run dev
```

The application will start at `http://localhost:5173`

## 📚 Understanding the Codebase

### Entry Point

**`main.jsx`** - Application entry point
**`App.jsx`** - Root component that renders the Shop page

### Main Page Component

**`pages/Shop.jsx`** - Main shopping interface that:
- Combines all components and hooks
- Manages application state
- Handles user interactions

## 🎯 Common Development Tasks

### 1. Adding a New Component

**Example: Creating a new "ProductFilter" component**

```bash
# File: src/components/ProductFilter/ProductFilter.jsx
```

```jsx
export default function ProductFilter({ 
  filters, 
  onFilterChange 
}) {
  return (
    <div className="p-4 bg-white rounded-lg">
      {/* Filter UI */}
    </div>
  );
}
```

Then export it in `src/components/index.js`:

```js
export { default as ProductFilter } from './ProductFilter/ProductFilter';
```

### 2. Creating a Custom Hook

**Example: Creating a "usePagination" hook**

```bash
# File: src/hooks/usePagination.js
```

```jsx
import { useState } from 'react';

export function usePagination(items, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = items.slice(startIdx, endIdx);
  
  return {
    currentPage,
    setCurrentPage,
    currentItems,
    totalPages,
  };
}
```

Then export in `src/hooks/index.js`.

### 3. Adding Utility Functions

**Example: Adding a currency formatter**

```bash
# File: src/utils/formatters.js
```

```jsx
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}
```

### 4. Modifying Component Styling

All components use **Tailwind CSS** inline classes. To modify:

1. Update the `className` attributes in the JSX
2. Reference CSS variables from `/styles/variables.css` if needed
3. Add animations from `/styles/globals.css`

**Example:**
```jsx
<button className="p-4 bg-orange-500 hover:bg-orange-600 rounded-xl">
  Add to Cart
</button>
```

### 5. Using Hooks in Components

```jsx
import { useCart, useNotification } from '../hooks';

export default function MyComponent() {
  const { cart, addToCart } = useCart();
  const { showNotification } = useNotification();
  
  const handleClick = () => {
    addToCart(product);
    showNotification('Added to cart!');
  };
  
  return (
    <button onClick={handleClick}>
      Add Item
    </button>
  );
}
```

## 🔧 Modifying Existing Features

### Changing Cart Behavior

**File: `src/hooks/useCart.js`**

All cart logic is centralized here:
- `addToCart()` - Add product to cart
- `removeFromCart()` - Remove from cart
- `changeQuantity()` - Update quantity
- `clearCart()` - Empty the cart

### Changing Product Recommendations

**File: `src/utils/recommendations.js`**

The algorithm scores products based on:
- Category match
- Brand match
- Tag matches
- Cart history
- Product rating
- Badge status

Adjust scoring weights to change recommendation behavior.

### Changing Search/Filter Logic

**File: `src/hooks/useFiltering.js`**

Modify:
- Filter conditions (line 11)
- Sort algorithms (line 24)
- Add new sort options

### Adding New Notifications

**File: `src/hooks/useNotification.js`**

```jsx
// In any component:
const { showNotification } = useNotification();

showNotification('Success!', 3000); // Duration in ms
```

## 📦 State Management Flow

```
Shop (Container Component)
  │
  ├─ useCart → {cart, addToCart, removeFromCart, ...}
  ├─ useFiltering → {search, category, filtered, ...}
  ├─ useNotification → {notification, showNotification}
  └─ useProductView → {selectedProduct, viewProduct, ...}
      │
      └─ Props passed down to child components
```

## 🎨 Styling Guidelines

### Using Tailwind Classes

```jsx
// Good
<div className="p-4 bg-white rounded-lg shadow-md">

// Avoid
<div style={{padding: '1rem', background: 'white'}}>
```

### Using CSS Variables

```css
/* In globals.css or component styles */
color: var(--color-primary);
padding: var(--spacing-md);
border-radius: var(--radius-lg);
```

### Creating Animations

```css
/* In globals.css */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
```

Then use in JSX:
```jsx
<div className="animate-fade-in">Fading in...</div>
```

## 🧪 Testing Components

Each component is isolated and can be tested independently:

```jsx
import ProductCard from '../../components/ProductCard/ProductCard';

describe('ProductCard', () => {
  const mockProduct = { id: 1, name: 'Test', price: 100 };
  
  it('renders product information', () => {
    render(
      <ProductCard 
        product={mockProduct}
        onView={() => {}}
        onAddToCart={() => {}}
        inCart={false}
      />
    );
    
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

## 📋 Checklist for New Features

- ☑️ Create component in `/components` (if UI needed)
- ☑️ Create hook in `/hooks` (if state/logic needed)
- ☑️ Add utilities in `/utils` (if helper functions needed)
- ☑️ Add data in `/data` (if static data needed)
- ☑️ Export from index files
- ☑️ Update this guide if adding new patterns
- ☑️ Test component in isolation
- ☑️ Test integration with other components

## 🐛 Debugging Tips

### Check Component Props

```jsx
console.log('Props:', { product, onView, onAddToCart });
```

### Monitor Hook State

```jsx
const { cart } = useCart();
useEffect(() => {
  console.log('Cart updated:', cart);
}, [cart]);
```

### Check Rendering

Add `React DevTools` browser extension to inspect component tree.

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

## 🤝 Code Standards

1. **Use consistent naming**
   - Components: PascalCase (`MyComponent.jsx`)
   - Hooks: camelCase starting with `use` (`useMyHook.js`)
   - Variables/functions: camelCase (`myFunction`)

2. **Keep components small and focused**
   - Max ~200 lines per component
   - Single responsibility principle

3. **Use proper imports**
   ```jsx
   // Prefer named imports for utilities
   import { getRecommendations } from '../utils';
   
   // Prefer default imports for components
   import ProductCard from '../components/ProductCard/ProductCard';
   ```

4. **Add descriptive comments**
   ```jsx
   // Calculate discount percentage
   const discount = Math.round((1 - price / originalPrice) * 100);
   ```

5. **Handle errors gracefully**
   ```jsx
   try {
     // operation
   } catch (error) {
     showNotification('Something went wrong');
     console.error(error);
   }
   ```

## 🚀 Performance Tips

1. **Use React DevTools Profiler** to identify slow components
2. **Memoize expensive components**
   ```jsx
   import { memo } from 'react';
   export default memo(ProductCard);
   ```

3. **Lazy load routes/components** (when applicable)
4. **Optimize images** - Use proper formats and sizes

---

**Last Updated:** March 7, 2026
