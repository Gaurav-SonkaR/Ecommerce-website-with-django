import StarRating from "../StarRating/StarRating";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductModal({
  product,
  recommendations,
  cart,
  onClose,
  onAddToCart,
}) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const inCart = cart.some(i => i.id === product.id);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 transition-colors"
        >
          ✕
        </button>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="md:w-2/5">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex gap-2 mt-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-orange-300 cursor-pointer transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-3/5 space-y-4">
              <div>
                <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
                  {product.brand} · {product.category}
                </span>
                <h1 className="text-2xl font-bold text-gray-900 mt-1 leading-tight">
                  {product.name}
                </h1>
              </div>

              <StarRating rating={product.rating} reviews={product.reviews} />

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-gray-900">
                  ${product.price}
                </span>
                {discount > 0 && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded-lg">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {product.stock <= 10 && (
                <p className="text-sm font-semibold text-red-500">
                  ⚡ Only {product.stock} left in stock!
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {product.tags.map(t => (
                  <span
                    key={t}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full capitalize"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onAddToCart(product)}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                    inCart
                      ? "bg-green-50 text-green-700 border-2 border-green-200"
                      : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-200"
                  }`}
                >
                  {inCart ? "✓ Added to Cart" : "🛒 Add to Cart"}
                </button>

                <button className="w-full py-3.5 rounded-xl font-bold text-sm bg-gray-900 text-white hover:bg-gray-800 transition-all active:scale-95">
                  ⚡ Buy Now
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {["Free Delivery", "Easy Returns", "Secure Pay"].map((f, i) => (
                  <div
                    key={f}
                    className="bg-gray-50 rounded-xl p-3 text-center"
                  >
                    <div className="text-xl mb-1">
                      {["🚚", "↩️", "🔒"][i]}
                    </div>
                    <p className="text-xs font-semibold text-gray-700">{f}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                🤖 Recommended For You
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Based on this product and your shopping history
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {recommendations.slice(0, 4).map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onView={p => {
                      onClose();
                      setTimeout(() => onAddToCart(p, true), 100);
                    }}
                    onAddToCart={onAddToCart}
                    inCart={cart.some(i => i.id === p.id)}
                    compact
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
