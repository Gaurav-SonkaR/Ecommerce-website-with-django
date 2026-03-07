import { useState } from "react";

export function useCart() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const changeQuantity = (id, delta) => {
    setCart(prev => 
      prev
        .map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
        .filter(i => i.qty > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartSavings = cart.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.qty, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    changeQuantity,
    clearCart,
    cartCount,
    cartTotal,
    cartSavings,
  };
}
