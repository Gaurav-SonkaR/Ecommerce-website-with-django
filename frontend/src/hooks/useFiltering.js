import { useState } from "react";

export function useFiltering(products) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filtered = products
    .filter(p =>
      (category === "All" || p.category === category) &&
      (search === "" || 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.brand.toLowerCase().includes(search.toLowerCase()) || 
        p.tags.some(t => t.includes(search.toLowerCase()))
      )
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "discount") {
        const discountA = (a.originalPrice - a.price) / a.originalPrice;
        const discountB = (b.originalPrice - b.price) / b.originalPrice;
        return discountB - discountA;
      }
      return b.rating * Math.log(b.reviews) - a.rating * Math.log(a.reviews);
    });

  return {
    search,
    setSearch,
    category,
    setCategory,
    sortBy,
    setSortBy,
    filtered,
  };
}
