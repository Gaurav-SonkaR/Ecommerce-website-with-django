export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center text-lg font-black text-white">
            S
          </div>
          <span className="text-white font-black text-xl">ShopSmart</span>
        </div>

        <p className="text-sm">
          Your AI-powered shopping destination. Discover products tailored just
          for you.
        </p>
        <p className="text-xs mt-4 text-gray-600">
          © 2025 ShopSmart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
