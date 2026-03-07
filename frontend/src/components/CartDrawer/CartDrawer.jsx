export default function CartDrawer({
  cart,
  onClose,
  onRemove,
  onQuantityChange,
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const savings = cart.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.qty,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl overflow-hidden">
        <div className="p-5 border-b bg-gradient-to-r from-orange-500 to-amber-500 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              Your Cart ({cart.reduce((s, i) => s + i.qty, 0)})
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
              <span className="text-6xl">🛒</span>
              <p className="font-medium">Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-14 h-14 bg-white rounded-lg overflow-hidden border flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight">
                    {item.name}
                  </p>
                  <p className="text-sm font-bold text-orange-600 mt-1">${item.price}</p>

                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => onQuantityChange(item.id, -1)}
                      className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-xs font-bold flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => onQuantityChange(item.id, 1)}
                      className="w-6 h-6 rounded-full bg-orange-100 hover:bg-orange-200 text-xs font-bold text-orange-600 flex items-center justify-center"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="ml-auto text-red-400 hover:text-red-600 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t space-y-3 bg-white">
            {savings > 0 && (
              <p className="text-xs text-green-600 font-semibold text-center bg-green-50 py-1.5 rounded-lg">
                🎉 You're saving ${savings.toFixed(2)}!
              </p>
            )}

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-orange-600">${total.toFixed(2)}</span>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-orange-200 transition-all active:scale-95">
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
