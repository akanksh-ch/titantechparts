import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "~/context/wishlist";
import { Button } from "~/components/ui/button";
import { ImageWithFallback } from "~/components/figma/ImageWithFallback";

interface WishlistPageProps {
  onAddToCart?: (product: any) => void;
}

export function WishlistPage({ onAddToCart }: WishlistPageProps) {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const handleAddToCart = (item: any) => {
    if (onAddToCart) {
      onAddToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
      });
      removeFromWishlist(item.id);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-6 sm:pt-8 pb-16 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap">
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary fill-primary flex-shrink-0" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            My Wishlist
          </h1>
          <span className="text-base sm:text-lg text-muted-foreground">
            ({wishlistItems.length})
          </span>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground mb-3 sm:mb-4 opacity-50" />
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
              Start adding items to your wishlist to save them for later!
            </p>
            <Button variant="default" asChild className="text-sm sm:text-base">
              <a href="/search">Browse Products</a>
            </Button>
          </div>
        ) : (
          <div className="grid gap-3 sm:gap-4 md:gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col xs:flex-row gap-3 sm:gap-4 p-3 sm:p-4 border border-border rounded-lg bg-card hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm sm:text-base md:text-lg line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-primary flex-shrink-0">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3 sm:mt-4">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      variant="default"
                      size="sm"
                      className="gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Add to Cart</span>
                      <span className="xs:hidden">Add</span>
                    </Button>
                    <Button
                      onClick={() => removeFromWishlist(item.id)}
                      variant="outline"
                      size="sm"
                      className="gap-1 sm:gap-2 text-destructive hover:text-destructive text-xs sm:text-sm"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Remove</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
