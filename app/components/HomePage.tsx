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
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="mb-4">Upgrade Your Battlestation</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover high-performance PC parts at unbeatable prices. From
              flagship GPUs to ultra-fast storage, we have everything you need
              to build your dream rig.
            </p>
            <Link
              to="/search"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Shop Components
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="mb-6">Shop by Component</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/search?category=${category}`}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors text-center font-medium"
            >
              <span>{category}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2>Featured Products</h2>
          <Link
            to="/search"
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product._id || product.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="aspect-square overflow-hidden bg-muted relative group">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
                          className={`w-5 h-5 ${
                            isInWishlist(product._id || product.id)
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
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-sm text-muted-foreground mb-1">
                    {product.category}
                  </p>
                  <h3 className="mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3 mt-auto">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating || "4.5"}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews || Math.floor(Math.random() * 50) + 10})
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xl font-bold">${product.price}</span>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
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
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-12 text-center text-primary-foreground relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="mb-4 text-primary-foreground text-3xl font-bold">
              Build Your Dream PC Today
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Get an extra 5% off your first build with code:{" "}
              <span className="font-mono font-bold bg-white/20 px-2 py-1 rounded">
                BUILD5
              </span>
            </p>
            <Link
              to="/search"
              className="bg-white text-primary px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold shadow-lg inline-block"
            >
              Start Building
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
