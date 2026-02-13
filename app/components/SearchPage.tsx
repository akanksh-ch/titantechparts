import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { Search, Star, SlidersHorizontal, Heart } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "~/components/ui/tooltip";
import { ImageWithFallback } from "~/components/figma/ImageWithFallback";
import { inventoryApi } from "~/utils/api";
import { useWishlist } from "~/context/wishlist";

interface SearchPageProps {
  onAddToCart: (product: any) => void;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  rating?: number;
  reviews?: any[];
  imageUrl?: string;
  category: string;
  stock: number;
}

export function SearchPage({ onAddToCart }: SearchPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All",
  );
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [sortBy, setSortBy] = useState("Relevance");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [showFilters, setShowFilters] = useState(false);

  const PRICE_MIN = 0;
  const PRICE_MAX = 3000;
  const minPercent =
    ((priceRange[0] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const maxPercent =
    ((priceRange[1] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  // State for loading and products
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<string[]>(["All"]);

  // Fetch inventory from backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const data = await inventoryApi.getAll();

        // Transform backend data to frontend format
        const transformedProducts = data.map((item: any) => ({
          _id: item.id,
          name: item.name,
          price: item.price,
          rating: item.rating || 4.5,
          reviews: item.reviews || [],
          imageUrl: item.imageUrl,
          category: item.category,
          stock: item.stock,
        }));

        setProducts(transformedProducts);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(data.map((item: any) => item.category).filter(Boolean)),
        ] as string[];
        setCategories(uniqueCategories);

        setError("");
      } catch (err: any) {
        console.error("Failed to fetch inventory:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // Sync state with URL params
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("All");
    }
  }, [searchParams]);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Price: Low to High":
          return a.price - b.price;
        case "Price: High to Low":
          return b.price - a.price;
        case "Rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  const sortOptions = [
    "Relevance",
    "Price: Low to High",
    "Price: High to Low",
    "Rating",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Toggle Filters Button (Mobile) */}
        <div className="flex gap-4 lg:gap-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 mb-4 bg-card border border-border rounded-lg px-4 py-2 hover:bg-accent transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm">Filters</span>
          </button>
        </div>

        <div className="flex gap-4 sm:gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`${showFilters ? "block" : "hidden"
              } lg:block w-full sm:w-64 flex-shrink-0`}
          >
            <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 lg:block">
                <h3 className="text-base sm:text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm sm:text-base font-semibold">
                  Category
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        if (category === "All") {
                          searchParams.delete("category");
                        } else {
                          searchParams.set("category", category);
                        }
                        setSearchParams(searchParams);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm sm:text-base font-semibold">
                  Price Range
                </h4>
                <div className="space-y-3">
                  <Slider.Root
                    className="relative flex w-full items-center h-8"
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={1}
                  >
                    <Slider.Track className="relative h-2 flex-grow bg-gray-200 rounded">
                      <Slider.Range className="absolute h-full bg-indigo-500 rounded" />
                    </Slider.Track>
                    <Slider.Thumb className="block h-5 w-5 rounded-full bg-indigo-600 border-2 border-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    <Slider.Thumb className="block h-5 w-5 rounded-full bg-indigo-600 border-2 border-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                  </Slider.Root>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1 w-full">
            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <div className="aspect-square overflow-hidden bg-muted relative">
                      <Link to={`/product/${product._id}`}>
                        <ImageWithFallback
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => {
                              if (isInWishlist(product._id)) {
                                removeFromWishlist(product._id);
                              } else {
                                addToWishlist({
                                  id: product._id,
                                  name: product.name,
                                  price: product.price,
                                  image: product.imageUrl,
                                  category: product.category,
                                });
                              }
                            }}
                            className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-md"
                            aria-label="Add to wishlist"
                          >
                            <Heart
                              className={`w-5 h-5 ${isInWishlist(product._id)
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
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-destructive text-destructive-foreground px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 sm:p-4 flex flex-col flex-grow">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                        {product.category}
                      </p>
                      <Link to={`/product/${product._id}`} className="block">
                        <h3 className="mb-2 hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs sm:text-sm">
                            {product.rating?.toFixed(1) || "N/A"}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          ({product.reviews?.length || 0})
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-auto gap-2">
                        <span className="text-base sm:text-lg font-bold">
                          ${product.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => onAddToCart({ ...product, id: product._id })}
                          disabled={product.stock === 0}
                          className="bg-primary text-primary-foreground px-2 sm:px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm whitespace-nowrap"
                        >
                          {product.stock > 0 ? "Add" : "N/A"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
