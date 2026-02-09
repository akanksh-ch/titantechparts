import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Search, Star, SlidersHorizontal, Heart } from "lucide-react";
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
          _id: item._id,
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`${showFilters ? "block" : "hidden"} lg:block w-64 flex-shrink-0`}
          >
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="mb-4">Filters</h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="mb-3">Category</h4>
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
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
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
                <h4 className="mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {loading
                  ? "Loading..."
                  : `${filteredProducts.length} ${filteredProducts.length === 1 ? "product" : "products"} found`}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive mb-6">
                {error}
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            )}

            {/* Products */}
            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square overflow-hidden bg-muted relative">
                      <ImageWithFallback
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
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
                              className={`w-5 h-5 ${
                                isInWishlist(product._id)
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
                          <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">
                        {product.category}
                      </p>
                      <h3 className="mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">
                            {product.rating?.toFixed(1) || "N/A"}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({product.reviews?.length || 0})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl">
                          ${product.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => onAddToCart(product)}
                          disabled={product.stock === 0}
                          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {product.stock > 0 ? "Add to Cart" : "Unavailable"}
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
