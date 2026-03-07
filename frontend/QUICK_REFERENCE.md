# Quick Reference Guide

## 📍 Where to Find Things

### Adding New Features

| Feature | Location | Example |
|---------|----------|---------|
| New reusable component | `src/components/ComponentName/` | ProductCard |
| New page/container | `src/pages/` | Shop.jsx |
| Business logic for state | `src/hooks/useHookName.js` | useCart.js |
| Helper functions | `src/utils/functionName.js` | recommendations.js |
| Global constants | `src/utils/constants.js` | BADGE_STYLES |
| Static data | `src/data/dataName.js` | products.js |
| Styles | `src/styles/` | globals.css |

---

## 🔍 File Location Cheat Sheet

```
Need to modify cart behavior?
→ src/hooks/useCart.js

Need to change product recommendations?
→ src/utils/recommendations.js

Need to update product data?
→ src/data/products.js

Need to add a new component?
→ src/components/ComponentName/ComponentName.jsx

Need to add a custom hook?
→ src/hooks/useCustomHook.js

Need to style something global?
→ src/styles/globals.css

Need to change theme colors?
→ src/styles/variables.css

Need to add a new page?
→ src/pages/NewPage.jsx
```

---

## 🎯 Common Tasks

### 1️⃣ Create a New Component

```bash
# Step 1: Create folder
frontend/src/components/MyComponent/

# Step 2: Create file
frontend/src/components/MyComponent/MyComponent.jsx

# Step 3: Write component
export default function MyComponent() {
  return <div>My Component</div>;
}

# Step 4: Export in index.js
# Edit: frontend/src/components/index.js
export { default as MyComponent } from './MyComponent/MyComponent';

# Step 5: Use it
import { MyComponent } from './components';
```

### 2️⃣ Create a Custom Hook

```bash
# Step 1: Create file
frontend/src/hooks/useMyLogic.js

# Step 2: Write hook
export function useMyLogic() {
  const [state, setState] = useState(null);
  // logic here
  return { state, setState };
}

# Step 3: Export in index.js
# Edit: frontend/src/hooks/index.js
export { useMyLogic } from './useMyLogic';

# Step 4: Use it
import { useMyLogic } from './hooks';

const { state, setState } = useMyLogic();
```

### 3️⃣ Add Global Style

```css
/* Edit: src/styles/globals.css */

@keyframes myAnimation {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-my-animation {
  animation: myAnimation 0.3s ease-in-out;
}

/* Use in JSX */
<div className="animate-my-animation">Content</div>
```

### 4️⃣ Add New Constant

```js
// Edit: src/utils/constants.js

export const MY_NEW_CONSTANT = {
  option1: 'value1',
  option2: 'value2',
};
```

---

## 🗂️ File Tree Reference

```
frontend/
├── src/
│   ├── components/
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
│   │   ├── StarRating/
│   │   │   └── StarRating.jsx
│   │   └── index.js
│   │
│   ├── data/
│   │   ├── categories.js
│   │   ├── products.js
│   │   └── index.js
│   │
│   ├── hooks/
│   │   ├── useCart.js
│   │   ├── useFiltering.js
│   │   ├── useNotification.js
│   │   ├── useProductView.js
│   │   └── index.js
│   │
│   ├── pages/
│   │   └── Shop.jsx
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── recommendations.js
│   │   └── index.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── public/
├── package.json
├── vite.config.js
├── index.html
├── PROJECT_STRUCTURE.md
├── DEVELOPMENT.md
└── RESTRUCTURE_SUMMARY.md
```

---

## 💾 Export/Import Patterns

### Pattern 1: Component Imports
```jsx
// Short form (using barrel export)
import { ProductCard, Header } from './components';

// Long form (direct import)
import ProductCard from './components/ProductCard/ProductCard';
```

### Pattern 2: Hook Imports
```jsx
// Recommended
import { useCart, useNotification } from './hooks';

// Alternative
import { useCart } from './hooks/useCart';
```

### Pattern 3: Utils Imports
```jsx
// Recommended
import { getRecommendations, BADGE_STYLES } from './utils';

// Alternative
import { getRecommendations } from './utils/recommendations';
import { BADGE_STYLES } from './utils/constants';
```

### Pattern 4: Data Imports
```jsx
// Recommended
import { products, categories } from './data';

// Alternative
import { products } from './data/products';
import { categories } from './data/categories';
```

---

## 🎨 CSS/Styling Quick Reference

### Tailwind Classes (Used Throughout)
```jsx
<div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg">
  Content
</div>
```

### CSS Variables (Defined in variables.css)
```css
color: var(--color-primary);          /* Orange */
padding: var(--spacing-md);            /* 1rem */
border-radius: var(--radius-lg);       /* 0.75rem */
background: var(--color-bg-light);     /* Light gray */
```

### Global Animations (Defined in globals.css)
```jsx
<div className="animate-bounce">Bouncing</div>
<div className="animate-fade-in">Fading in</div>
<div className="animate-slide-down">Sliding down</div>
```

---

## 🧪 Testing Locations

Each file can be tested independently:

```
src/
├── __tests__/
│   ├── components/
│   │   └── ProductCard.test.jsx
│   ├── hooks/
│   │   └── useCart.test.js
│   └── utils/
│       └── recommendations.test.js
```

---

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 📋 Component & File Naming

### ✅ CORRECT
```
Components: PascalCase
  → ProductCard.jsx
  → UserProfile.jsx
  → AddToCart.jsx

Hooks: camelCase with 'use' prefix
  → useCart.js
  → useAuth.js
  → useLocalStorage.js

Utilities: camelCase
  → recommendations.js
  → validators.js
  → formatters.js

Data: camelCase
  → products.js
  → categories.js
  → config.js

Folders: PascalCase (for components)
  → ProductCard/
  → UserProfile/
  → AddToCart/
```

### ❌ INCORRECT
```
Component.js (should be .jsx)
UseCart.js (should be useCart.js)
Recommendations.js (should be recommendations.js)
product-card.jsx (should be ProductCard.jsx)
my_component/ (should be MyComponent/)
```

---

## 🔗 File Dependencies

```
App.jsx
  ↓
pages/Shop.jsx
  ├── uses: useCart, useFiltering, useNotification, useProductView
  ├── imports: components (Header, Footer, ProductCard, etc.)
  ├── uses: utils (getRecommendations, SORT_OPTIONS)
  └── uses: data (products, categories)

components/Header/Header.jsx
  ├── imports: StarRating (optional)
  └── uses: categories from data

components/ProductCard/ProductCard.jsx
  ├── imports: StarRating
  └── props handled locally

hooks/useCart.js
  └── state-only, no imports from other hooks

utils/recommendations.js
  └── pure function, no external dependencies
```

---

## 🆘 Troubleshooting

| Issue | Check |
|-------|-------|
| Component not rendering | Is it exported from index.js? |
| Hook not working | Is it imported correctly? |
| Styles not applied | Is class name correct? |
| Import error | Check file path and extension |
| State not updating | Is hook being used in component? |

---

## 📚 Documentation Files

1. **PROJECT_STRUCTURE.md** - Detailed structure explanation
2. **DEVELOPMENT.md** - In-depth development guide
3. **RESTRUCTURE_SUMMARY.md** - Before/after comparison
4. **QUICK_REFERENCE.md** - This file!

---

**Remember:** This structure is designed to scale from a small project to a large production application. Follow these patterns consistently and your codebase will remain maintainable and clean! 🚀
