import { SearchPage } from "~/components/SearchPage";
import { useCart } from "~/context/cart";

export default function SearchRoute() {
  const { addToCart } = useCart();
  return <SearchPage onAddToCart={addToCart} />;
}
