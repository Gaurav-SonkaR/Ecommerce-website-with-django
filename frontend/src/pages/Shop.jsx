import { useState, useEffect } from "react";
import { SORT_OPTIONS, NOTIFICATION_DURATION } from "../utils/constants";
import ProductCard from "../components/ProductCard/ProductCard";
import Header from "../components/Header/Header";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import Footer from "../components/Footer/Footer";
import CartDrawer from "../components/CartDrawer/CartDrawer";
import ProductModal from "../components/ProductModal/ProductModal";
import { useCart } from "../hooks/useCart";
import { useFiltering } from "../hooks/useFiltering";
import { useNotification } from "../hooks/useNotification";
import { useProductView } from "../hooks/useProductView";
import { products } from "../data/products";
import { getRecommendations } from "../utils/recommendations";

export default function Shop() {
  const { cart, addToCart, removeFromCart, changeQuantity, cartCount } = useCart();
  const { search, setSearch, category, setCategory, sortBy, setSortBy, filtered } = useFiltering(products);
  const { notification, showNotification } = useNotification();
  const { viewHistory, selectedProduct, viewProduct, closeProductView } = useProductView();
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    // Component mounted - you can add initialization logic here
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    showNotification(
      `"${product.name.slice(0, 30)}..." added to cart!`,
      NOTIFICATION_DURATION
    );
  };

  const recommendations = getRecommendations(
    viewHistory[viewHistory.length - 1],
    products,
    cart
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          ✅ {notification}
        </div>
      )}

      {/* Header */}
      <Header
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-10">
        {/* Hero Banner */}
        {search === "" && category === "All" && <HeroBanner />}

        {/* AI Recommendations */}
        {recommendations.length > 0 && search === "" && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-sm">
                🤖
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Recommended For You
                </h2>
                <p className="text-xs text-gray-500">
                  Based on your browsing history & cart
                </p>
              </div>
              <span className="ml-auto text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-semibold">
                AI Powered
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3">
              {recommendations.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={viewProduct}
                  onAddToCart={handleAddToCart}
                  inCart={cart.some(i => i.id === p.id)}
                  compact
                />
              ))}
            </div>
          </section>
        )}

        {/* Products Grid */}
        <section>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {search ? `Search: "${search}"` : category === "All" ? "All Products" : category}
              </h2>
              <p className="text-xs text-gray-500">{filtered.length} products found</p>
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white outline-none focus:border-orange-300"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-lg font-semibold">No products found</p>
              <p className="text-sm">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtered.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={viewProduct}
                  onAddToCart={handleAddToCart}
                  inCart={cart.some(i => i.id === p.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Recently Viewed */}
        {viewHistory.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              👁️ Recently Viewed
            </h2>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {[...viewHistory]
                .reverse()
                .slice(0, 6)
                .map(p => (
                  <div
                    key={p.id}
                    onClick={() => viewProduct(p)}
                    className="shrink-0 w-28 bg-white rounded-xl border border-gray-100 hover:border-orange-200 p-3 cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="w-full h-16 rounded-lg overflow-hidden mb-2">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-gray-700 font-semibold line-clamp-2 text-center leading-tight">
                      {p.name}
                    </p>
                    <p className="text-xs text-orange-600 font-bold text-center mt-1">
                      ${p.price}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          products={products}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onQuantityChange={changeQuantity}
        />
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          recommendations={getRecommendations(selectedProduct, products, cart)}
          cart={cart}
          onClose={closeProductView}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
