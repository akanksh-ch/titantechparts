import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Trash2, Minus, Plus, CreditCard, Truck } from 'lucide-react';
import { ImageWithFallback } from '~/components/figma/ImageWithFallback';

interface CheckoutPageProps {
  cartItems: any[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export function CheckoutPage({ cartItems, onUpdateQuantity, onRemoveItem }: CheckoutPageProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Process order
    console.log('Order placed:', { formData, cartItems, total });
    alert('Order placed successfully!');
    navigate('/orders');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some items to get started!</p>
          <button
            onClick={() => navigate('/search')}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="mb-8">{step === 'cart' ? 'Shopping Cart' : 'Checkout'}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'cart' ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-lg p-4 flex gap-4"
                  >
                    <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                      <p className="text-lg">${item.price}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-destructive hover:text-destructive/80 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <div className="flex items-center gap-2 border border-border rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-2 hover:bg-accent transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-accent transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                {/* Contact Information */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block mb-2">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block mb-2">First Name</label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block mb-2">Last Name</label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block mb-2">Address</label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block mb-2">City</label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block mb-2">State</label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="zipCode" className="block mb-2">ZIP Code</label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block mb-2">Card Number</label>
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cardName" className="block mb-2">Name on Card</label>
                      <input
                        id="cardName"
                        name="cardName"
                        type="text"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block mb-2">Expiry Date</label>
                        <input
                          id="expiryDate"
                          name="expiryDate"
                          type="text"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block mb-2">CVV</label>
                        <input
                          id="cvv"
                          name="cvv"
                          type="text"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h3 className="mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-sm text-muted-foreground mb-4 p-3 bg-accent rounded-lg">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}

              {step === 'cart' ? (
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <div className="space-y-3">
                  <button
                    type="submit"
                    onClick={handlePlaceOrder}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Place Order
                  </button>
                  <button
                    onClick={() => setStep('cart')}
                    className="w-full border border-border py-3 rounded-lg hover:bg-accent transition-colors"
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