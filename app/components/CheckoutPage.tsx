import { useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  Trash2,
  Minus,
  Plus,
  CreditCard,
  Truck,
  AlertCircle,
} from "lucide-react";
import { ImageWithFallback } from "~/components/figma/ImageWithFallback";
import { ordersApi } from "~/utils/api";
import { isAuthenticated } from "~/utils/auth";
import {
  validateUKPostcode,
  validateUKPhoneNumber,
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
  validateAddress1,
  validateAddress2,
} from "~/utils/validation";

interface CheckoutPageProps {
  cartItems: any[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export function CheckoutPage({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: CheckoutPageProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    county: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field as user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Email validation
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Name validation
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Phone validation
    if (!formData.phone || !validateUKPhoneNumber(formData.phone)) {
      newErrors.phone =
        "Please enter a valid UK phone number (e.g., 020 7946 0958 or +44 20 7946 0958)";
    }

    // Address validation
    if (!formData.address1 || !validateAddress1(formData.address1)) {
      newErrors.address1 =
        "Please enter a valid address (at least 5 characters, alphanumeric and special characters like -, ', .)";
    }
    if (!validateAddress2(formData.address2)) {
      newErrors.address2 =
        "Address 2 must contain valid characters (alphanumeric and -, ', .)";
    }
    if (!formData.city || formData.city.trim().length < 2) {
      newErrors.city = "Please enter a valid city";
    }
    if (!formData.county || formData.county.trim().length < 2) {
      newErrors.county = "Please enter a valid county";
    }

    // Postcode validation
    if (!formData.postcode || !validateUKPostcode(formData.postcode)) {
      newErrors.postcode = "Please enter a valid UK postcode (e.g., SW1A 1AA)";
    }

    // Card validation
    if (!formData.cardNumber || !validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = "Please enter a valid card number (13-19 digits)";
    }
    if (!formData.cardName || formData.cardName.trim().length < 3) {
      newErrors.cardName = "Please enter the cardholder name";
    }
    if (!formData.expiryDate || !validateExpiryDate(formData.expiryDate)) {
      newErrors.expiryDate =
        "Please enter a valid expiry date (MM/YY) that hasn't expired";
    }
    if (!formData.cvv || !validateCVV(formData.cvv)) {
      newErrors.cvv = "Please enter a valid CVV (3-4 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      alert("Please log in to complete your order.");
      navigate("/login");
      return;
    }

    if (!validateForm()) {
      return; // Form validation failed, errors are displayed
    }

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          inventoryId: item.id,
          quantity: item.quantity,
        })),
        address: {
          recipientName: formData.fullName.trim(),
          line1: formData.address1,
          line2: formData.address2 || "", // Ensure string
          postTown: formData.city.toUpperCase(), // Best practice for UK
          postcode: formData.postcode,
          county: formData.county || "",
        },
        phoneNumber: formData.phone,
      };

      await ordersApi.create(orderData);
      alert("Order placed successfully!");
      navigate("/orders");
      cartItems.forEach((item) => onRemoveItem(item.id));
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
            Add some items to get started!
          </p>
          <button
            onClick={() => navigate("/search")}
            className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <h1 className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl">
          {step === "cart" ? "Shopping Cart" : "Checkout"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === "cart" ? (
              <div className="space-y-3 sm:space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-lg p-3 sm:p-4 flex gap-3 sm:gap-4 flex-col xs:flex-row"
                  >
                    <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <Link to={`/product/${item.id}`}>
                        <ImageWithFallback
                          src={item.imageUrl || item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    </div>
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        <h3 className="mb-1">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.category}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-destructive hover:text-destructive/80 transition-colors p-2 sm:p-0"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <div className="flex items-center gap-1 sm:gap-2 border border-border rounded-lg bg-card">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="p-1 sm:p-2 hover:bg-accent transition-colors"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="w-6 sm:w-8 text-center text-xs sm:text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 sm:p-2 hover:bg-accent transition-colors"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <form
                onSubmit={handlePlaceOrder}
                className="space-y-4 sm:space-y-6"
              >
                {/* Contact Information */}
                <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
                  <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">
                    Contact Information
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-1 sm:mb-2 text-sm"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm ${errors.email ? "border-red-500" : "border-border"
                          }`}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <div className="flex items-center gap-2 mt-1 text-red-500 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-1 sm:mb-2 text-sm"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm ${errors.phone ? "border-red-500" : "border-border"
                          }`}
                        placeholder="020 7946 0958 or +44 20 7946 0958"
                      />
                      {errors.phone && (
                        <div className="flex items-center gap-2 mt-1 text-red-500 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
                  <h3 className="mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg font-semibold">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                    Shipping Address (UK)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="fullName"
                        className="block mb-1 sm:mb-2 text-sm"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm ${errors.fullName ? "border-red-500" : "border-border"
                          }`}
                        placeholder="John Doe"
                      />
                      {errors.fullName && (
                        <div className="flex items-center gap-2 mt-1 text-red-500 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {errors.fullName}
                        </div>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address1"
                        className="block mb-1 sm:mb-2 text-sm"
                      >
                        Address 1 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="address1"
                        name="address1"
                        type="text"
                        value={formData.address1}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm ${errors.address1 ? "border-red-500" : "border-border"
                          }`}
                        placeholder="123 Main Street"
                      />
                      {errors.address1 && (
                        <div className="flex items-center gap-2 mt-1 text-red-500 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {errors.address1}
                        </div>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address2"
                        className="block mb-1 sm:mb-2 text-sm"
                      >
                        Address 2 (Optional){" "}
                        <span className="text-gray-500">*</span>
                      </label>
                      <input
                        id="address2"
                        name="address2"
                        type="text"
                        value={formData.address2}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm ${errors.address2 ? "border-red-500" : "border-border"
                          }`}
                        placeholder="Apartment, suite, floor, etc. (optional)"
                      />
                      {errors.address2 && (
                        <div className="flex items-center gap-2 mt-1 text-red-500 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {errors.address2}
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block mb-1 sm:mb-2 text-sm"
                      >
                        City/Town <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm ${errors.city ? "border-red-500" : "border-border"
                          }`}
                        placeholder="London"
                      />
                      {errors.city && (
                        <div className="flex items-center gap-2 mt-1 text-red-500 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {errors.city}
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="county"
                        className="block mb-1 sm:mb-2 text-sm"
                      >
                        County <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="county"
                        name="county"
                        type="text"
                        value={formData.county}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm ${errors.county ? "border-red-500" : "border-border"
                          }`}
                        placeholder="Greater London"
                      />
                      {errors.county && (
                        <div className="flex items-center gap-2 mt-1 text-red-500 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {errors.county}
                        </div>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postcode"
                        className="block mb-1 sm:mb-2 text-sm"
                      >
                        Postcode <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="postcode"
                        name="postcode"
                        type="text"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm ${errors.postcode ? "border-red-500" : "border-border"
                          }`}
                        placeholder="SW1A 1AA"
                      />
                      {errors.postcode && (
                        <div className="flex items-center gap-2 mt-1 text-red-500 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {errors.postcode}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
                  <h3 className="mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg font-semibold">
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                    Payment Information
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block mb-1 sm:mb-2 text-sm"
                      >
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm ${errors.cardNumber ? "border-red-500" : "border-border"
                          }`}
                      />
                      {errors.cardNumber && (
                        <div className="flex items-center gap-2 mt-1 text-red-500 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {errors.cardNumber}
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="cardName"
                        className="block mb-1 sm:mb-2 text-sm"
                      >
                        Name on Card <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="cardName"
                        name="cardName"
                        type="text"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm ${errors.cardName ? "border-red-500" : "border-border"
                          }`}
                        placeholder="John Doe"
                      />
                      {errors.cardName && (
                        <div className="flex items-center gap-2 mt-1 text-red-500 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {errors.cardName}
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label
                          htmlFor="expiryDate"
                          className="block mb-1 sm:mb-2 text-sm"
                        >
                          Expiry Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="expiryDate"
                          name="expiryDate"
                          type="text"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm ${errors.expiryDate
                              ? "border-red-500"
                              : "border-border"
                            }`}
                        />
                        {errors.expiryDate && (
                          <div className="flex items-center gap-2 mt-1 text-red-500 text-xs">
                            <AlertCircle className="w-3 h-3" />
                            {errors.expiryDate}
                          </div>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="cvv"
                          className="block mb-1 sm:mb-2 text-sm"
                        >
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="cvv"
                          name="cvv"
                          type="text"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm ${errors.cvv ? "border-red-500" : "border-border"
                            }`}
                        />
                        {errors.cvv && (
                          <div className="flex items-center gap-2 mt-1 text-red-500 text-xs">
                            <AlertCircle className="w-3 h-3" />
                            {errors.cvv}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-4 sm:p-6 sticky top-24">
              <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">
                Order Summary
              </h3>
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-2 sm:pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-lg sm:text-xl font-bold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 p-3 bg-accent rounded-lg">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}

              {step === "cart" ? (
                <button
                  onClick={() => setStep("checkout")}
                  className="w-full bg-primary text-primary-foreground py-2 sm:py-3 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base font-semibold"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  <button
                    type="submit"
                    onClick={handlePlaceOrder}
                    className="w-full bg-primary text-primary-foreground py-2 sm:py-3 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base font-semibold"
                  >
                    Place Order
                  </button>
                  <button
                    onClick={() => setStep("cart")}
                    className="w-full border border-border py-2 sm:py-3 rounded-lg hover:bg-accent transition-colors text-sm sm:text-base"
                  >
                    Back to Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
