import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { inventoryApi } from "~/utils/api";
import { ImageWithFallback } from "~/components/figma/ImageWithFallback";
import { Star, ShoppingCart, Heart, ArrowLeft, User } from "lucide-react";
import { useCart } from "~/context/cart";
import { useWishlist } from "~/context/wishlist";
import { Link } from "react-router";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "~/components/ui/tooltip";

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const data = await inventoryApi.getById(id);
                setProduct(data);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Product not found</h1>
                <Link to="/" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {/* Product Image */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-muted rounded-xl overflow-hidden border border-border">
                            <ImageWithFallback
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col">
                        <div className="mb-2">
                            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                {product.category}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium text-lg">{product.rating || "4.5"}</span>
                            </div>
                            <span className="text-muted-foreground text-sm font-medium px-2">|</span>
                            <span className="text-muted-foreground">
                                {product.reviews?.length || 0} Reviews
                            </span>
                        </div>

                        <div className="text-3xl font-bold mb-6">${product.price}</div>

                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            {product.description || `Experience superior performance with the ${product.name}. Built for enthusiasts and professionals alike, this component delivers exceptional reliability and speed for your most demanding tasks.`}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-semibold text-lg"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>

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
                                className={`flex items-center justify-center px-6 py-4 rounded-lg border-2 transition-colors ${isInWishlist(product._id || product.id)
                                        ? "border-red-500 text-red-500 bg-red-50"
                                        : "border-border hover:border-primary hover:text-primary"
                                    }`}
                            >
                                <Heart className={`w-6 h-6 ${isInWishlist(product._id || product.id) ? "fill-current" : ""}`} />
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="grid grid-cols-2 gap-4 py-6 border-t border-border">
                            <div>
                                <span className="text-sm text-muted-foreground block mb-1">Stock Status</span>
                                <span className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>
                            <div>
                                <span className="text-sm text-muted-foreground block mb-1">SKU</span>
                                <span className="font-medium">{product.sku || (product._id || product.id).substring(0, 8).toUpperCase()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-20">
                    <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {product.reviews.map((review: any, index: number) => (
                                <div key={index} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-2 rounded-full">
                                                <User className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <span className="font-medium block">{review.user || "Anonymous User"}</span>
                                                <div className="flex items-center gap-1 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-3 h-3 ${i < (review.rating || 5) ? "fill-yellow-400 text-yellow-400" : "text-border"}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                            {new Date(review.date || Date.now()).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">{review.comment || review.text}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-muted/30 border border-dashed border-border rounded-xl p-12 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                                <Star className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
                            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">Be the first to share your thoughts on this product with the community.</p>
                            <button className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                                Write a review <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
