import StarRating from "../StarRating/StarRating";

export default function ProductCard({
  product,
  onView,
  onAddToCart,
  inCart,
  compact = false,
}) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div
      onClick={() => onView(product)}
      className={`bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <div className="relative">
        {product.badge && (
          <span
            className={`absolute top-0 left-0 text-xs font-bold px-2 py-1 rounded-br-lg rounded-tl-lg z-10 ${
              product.badge === "Deal"
                ? "bg-red-500 text-white"
                : product.badge === "Best Seller"
                ? "bg-orange-500 text-white"
                : product.badge === "New"
                ? "bg-blue-500 text-white"
                : product.badge === "Hot"
                ? "bg-pink-500 text-white"
                : product.badge === "Trending"
                ? "bg-purple-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {product.badge}
          </span>
        )}

        {product.stock <= 5 && (
          <span className="absolute top-0 right-0 text-xs font-semibold px-2 py-1 bg-red-50 text-red-600 rounded-bl-lg rounded-tr-lg">
            Only {product.stock} left!
          </span>
        )}

        <div
          className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-3 group-hover:scale-105 transition-transform duration-300 ${
            compact ? "h-24" : "h-40"
          }`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={e => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div className="hidden absolute inset-0 items-center justify-center text-4xl bg-gray-100">
            {product.emoji || "🛍️"}
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <p
          className={`font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {product.name}
        </p>

        <StarRating rating={product.rating} reviews={product.reviews} />

        <div className="flex items-baseline gap-2">
          <span className={`font-bold text-gray-900 ${compact ? "text-base" : "text-lg"}`}>
            ${product.price}
          </span>
          {discount > 0 && (
            <>
              <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
              <span className="text-xs font-bold text-green-600">-{discount}%</span>
            </>
          )}
        </div>

        <button
          onClick={e => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className={`w-full py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
            inCart
              ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
              : "bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-orange-200 active:scale-95"
          }`}
        >
          {inCart ? "✓ In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
