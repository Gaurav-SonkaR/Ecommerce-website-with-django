import { useState } from "react";

export function useProductView() {
  const [viewHistory, setViewHistory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setViewHistory(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [...filtered, product].slice(-10);
    });
  };

  const closeProductView = () => {
    setSelectedProduct(null);
  };

  return {
    viewHistory,
    selectedProduct,
    viewProduct,
    closeProductView,
  };
}
