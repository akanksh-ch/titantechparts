import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router";
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
    <div className="min-h-screen bg-background pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-primary fill-primary" />
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <span className="text-lg text-muted-foreground">
            ({wishlistItems.length})
          </span>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-8">
              Start adding items to your wishlist to save them for later!
            </p>
            <Button variant="default" asChild>
              <a href="/search">Browse Products</a>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 border border-border rounded-lg bg-card hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                  <Link to={`/product/${item.id}`}>
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Link to={`/product/${item.id}`} className="hover:text-primary transition-colors">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-primary">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      variant="default"
                      size="sm"
                      className="gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => removeFromWishlist(item.id)}
                      variant="outline"
                      size="sm"
                      className="gap-2 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
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
