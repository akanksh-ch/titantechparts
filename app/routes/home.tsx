import { HomePage } from "~/components/HomePage";
import { useCart } from "~/context/cart";

export default function HomeRoute() {
  const { addToCart } = useCart();
  return <HomePage onAddToCart={addToCart} />;
}
