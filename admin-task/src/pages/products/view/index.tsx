import { _products } from "@/_mock";

export default function ProductView() {
  return (
    <div className="p-lg">
      <h1 className="text-2xl font-bold mb-3xl text-primary-darker">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-lg">
        {_products.map((product) => (
          <div
            key={product.id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {product.status && (
              <span
                className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded ${
                  product.status === "sale"
                    ? "bg-error text-white"
                    : "bg-primary text-white"
                }`}
              >
                {product.status.toUpperCase()}
              </span>
            )}

            <img
              src={product.coverUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-md">
              <h3 className="text-sm font-semibold text-gray-800 truncate">
                {product.name}
              </h3>

              <div className="flex items-center gap-1 mt-2">
                {product.colors.slice(0, 3).map((color, idx) => (
                  <span
                    key={idx}
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: color }}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-xs text-gray-500 ml-1">
                    +{product.colors.length - 3}
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-center gap-2">
                {product.priceSale ? (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      ${product.priceSale}
                    </span>
                    <span className="text-base font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </>
                ) : (
                  <span className="text-base font-bold text-gray-900">
                    ${product.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
