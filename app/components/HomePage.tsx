import { Star, ArrowRight, Heart } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "~/components/ui/tooltip";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "~/components/figma/ImageWithFallback";
import { inventoryApi } from "~/utils/api";
import { useWishlist } from "~/context/wishlist";

interface HomePageProps {
  onAddToCart: (product: any) => void;
}

const categories = [
  "GPU",
  "CPU",
  "Memory",
  "Motherboard",
  "Storage",
  "Power Supply",
];

export function HomePage({ onAddToCart }: HomePageProps) {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await inventoryApi.getAll();
        // Take the first 6 products for the featured section
        setFeaturedProducts(products.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="max-w-2xl">
            <h1 className="mb-2 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Upgrade Your Battlestation
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6 md:mb-8">
              Discover high-performance PC parts at unbeatable prices. From
              flagship GPUs to ultra-fast storage, we have everything you need
              to build your dream rig.
            </p>
            <Link
              to="/search"
              className="bg-primary text-primary-foreground px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2 text-sm sm:text-base"
            >
              Shop Components
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl">
          Shop by Component
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/search?category=${category}`}
              className="bg-card border border-border rounded-lg p-3 sm:p-4 md:p-6 hover:border-primary transition-colors text-center font-medium text-xs sm:text-sm md:text-base"
            >
              <span>{category}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl">Featured Products</h2>
          <Link
            to="/search"
            className="text-primary hover:underline inline-flex items-center gap-1 text-sm sm:text-base whitespace-nowrap"
          >
            View All
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product._id || product.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="aspect-square overflow-hidden bg-muted relative group">
                  <Link to={`/product/${product._id || product.id}`}>
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          if (isInWishlist(product._id || product.id)) {
                            removeFromWishlist(product._id || product.id);
                          } else {
                            addToWishlist({
                              id: product._id || product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              category: product.category,
                            });
                          }
                        }}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-md"
                        aria-label="Add to wishlist"
                      >
                        <Heart
                          className={`w-5 h-5 ${isInWishlist(product._id || product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                            }`}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={4}>
                      Add to wishlist
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="p-3 sm:p-4 flex flex-col flex-grow">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                    {product.category}
                  </p>
                  <Link to={`/product/${product._id || product.id}`} className="block">
                    <h3 className="mb-2 line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-3 mt-auto">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs sm:text-sm">
                        {product.rating || "4.5"}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      (
                      {(Array.isArray(product.reviews)
                        ? product.reviews.length
                        : 0) || 0}
                      )
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 gap-2">
                    <span className="text-lg sm:text-xl font-bold">
                      ${product.price}
                    </span>
                    <button
                      onClick={() =>
                        onAddToCart({
                          id: product._id || product.id,
                          name: product.name,
                          price: product.price,
                          image:
                            product.imageURL ||
                            product.imageUrl ||
                            product.image ||
                            "",
                          category: product.category,
                        })
                      }
                      className="bg-primary text-primary-foreground px-2 sm:px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-xs sm:text-sm whitespace-nowrap"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 sm:p-8 md:p-12 text-center text-primary-foreground relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="mb-2 sm:mb-4 text-primary-foreground text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              Build Your Dream PC Today
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
              Get an extra 5% off your first build with code:{" "}
              <span className="font-mono font-bold bg-white/20 px-2 py-1 rounded text-xs sm:text-sm md:text-base">
                BUILD5
              </span>
            </p>
            <Link
              to="/search"
              className="bg-white text-primary px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold shadow-lg inline-block text-sm sm:text-base"
            >
              Start Building
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
