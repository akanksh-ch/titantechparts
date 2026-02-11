import { WishlistPage } from "~/components/WishlistPage";
import { useCart } from "~/context/cart";

export default function WishlistRoute() {
  const { addToCart } = useCart();
  return <WishlistPage onAddToCart={addToCart} />;
}
