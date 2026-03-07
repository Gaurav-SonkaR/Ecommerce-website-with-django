import { categories } from "../../data/categories";

export default function Header({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  cartCount,
  onCartClick,
}) {
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Logo and Search Bar */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center text-xl font-black">
              S
            </div>
            <span className="text-xl font-black tracking-tight hidden sm:block">
              ShopSmart
            </span>
          </div>

          <div className="flex-1 flex">
            <input
              type="text"
              value={search}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search products, brands..."
              className="w-full px-4 py-2.5 rounded-l-xl bg-white text-gray-900 text-sm outline-none placeholder-gray-400"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-4 rounded-r-xl transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shrink-0"
          >
            🛒 <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                category === cat
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
