export default function HeroBanner() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 text-9xl">🛍️</div>
          <div className="absolute bottom-4 left-4 text-7xl">✨</div>
        </div>

        <p className="text-sm font-semibold opacity-80 mb-2 uppercase tracking-wider">
          🔥 Limited Time Deals
        </p>
        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-3">
          Discover Amazing
          <br />
          Products Today
        </h1>
        <p className="text-sm opacity-80 mb-6">
          Up to 40% off on top brands. Free delivery on orders above $49
        </p>

        <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-orange-50 transition-colors shadow-lg">
          Shop Now →
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-5 text-white flex-1 relative overflow-hidden">
          <p className="text-xs font-semibold opacity-80 mb-1">Featured</p>
          <p className="font-bold text-lg leading-tight">
            New Arrivals
            <br />
            in Electronics
          </p>
          <img
            src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=120&h=80&fit=crop&auto=format"
            className="absolute bottom-2 right-2 w-16 h-16 object-cover rounded-lg opacity-80"
            alt="phone"
          />
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white flex-1 relative overflow-hidden">
          <p className="text-xs font-semibold opacity-80 mb-1">Clearance</p>
          <p className="font-bold text-lg leading-tight">
            Fashion &
            <br />
            Footwear Sale
          </p>
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=80&fit=crop&auto=format"
            className="absolute bottom-2 right-2 w-16 h-16 object-cover rounded-lg opacity-80"
            alt="shoes"
          />
        </div>
      </div>
    </section>
  );
}
