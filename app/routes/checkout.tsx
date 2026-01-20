import { CheckoutPage } from "~/components/CheckoutPage";
import { useCart } from "~/context/cart";

export default function CheckoutRoute() {
  const { cartItems, updateQuantity, removeItem } = useCart();

  return (
    <CheckoutPage
      cartItems={cartItems}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeItem}
    />
  );
}
