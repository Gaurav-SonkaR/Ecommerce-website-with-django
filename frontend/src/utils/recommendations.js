export function getRecommendations(viewedProduct, allProducts, cart) {
  if (!viewedProduct) return [];
  const cartCategories = cart.map(i => allProducts.find(p => p.id === i.id)?.category);
  const cartTags = cart.flatMap(i => allProducts.find(p => p.id === i.id)?.tags || []);
  
  return allProducts
    .filter(p => p.id !== viewedProduct.id)
    .map(p => {
      let score = 0;
      if (p.category === viewedProduct.category) score += 30;
      if (p.brand === viewedProduct.brand) score += 20;
      const tagMatch = p.tags.filter(t => viewedProduct.tags.includes(t)).length;
      score += tagMatch * 15;
      if (cartCategories.includes(p.category)) score += 25;
      const cartTagMatch = p.tags.filter(t => cartTags.includes(t)).length;
      score += cartTagMatch * 10;
      score += p.rating * 3;
      if (p.badge) score += 5;
      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}
