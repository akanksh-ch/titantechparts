import { Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { ImageWithFallback } from '~/components/figma/ImageWithFallback';
import { ordersApi } from '~/utils/api';

interface OrderItem {
  inventoryId: string;
  name: string;
  image?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

interface Order {
  _id: string; // MongoDB ID
  items: OrderItem[];
  amount: number;
  status: string;
  createdAt: string;
  userId: string;
  trackingNumber?: string;
}

export function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await ordersApi.getUserOrders();
        // Sort by date descending
        const sortedOrders = data.sort((a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrders(sortedOrders);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load your order history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const statusConfig = {
    delivered: {
      icon: CheckCircle,
      label: 'Delivered',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    shipped: {
      icon: Truck,
      label: 'Shipped',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    processing: {
      icon: Clock,
      label: 'Processing',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    pending: {
      icon: Clock,
      label: 'Pending',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="mb-4">Oops!</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="mb-4">No orders yet</h2>
          <p className="text-muted-foreground mb-6">Start shopping to see your orders here!</p>
          <Link
            to="/home"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="mb-8">Order History</h1>

        <div className="space-y-6">
          {orders.map((order) => {
            const statusKey = (order.status.toLowerCase()) as keyof typeof statusConfig;
            const status = statusConfig[statusKey] || statusConfig.pending;
            const StatusIcon = status.icon;

            return (
              <div key={order._id} className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Order Header */}
                <div className="bg-muted px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-mono text-sm">{order._id}</p>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-border"></div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date Placed</p>
                      <p>{new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-border"></div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p>${order.amount.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${status.bgColor} ${status.color} w-fit`}>
                    <StatusIcon className="w-4 h-4" />
                    <span>{status.label}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 space-y-4">
                  {order.items.map((item, index) => (
                    <div key={`${order._id}-${item.inventoryId}-${index}`} className="flex gap-4">
                      <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={item.image || './Sale.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4>{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        <p className="text-sm">${item.unitPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}

                  {/* Order Actions */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    {order.status === 'delivered' && (
                      <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                        Buy Again
                      </button>
                    )}
                    {order.status === 'shipped' && order.trackingNumber && (
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                        Track Package
                      </button>
                    )}
                    <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-8">
          <Link
            to="/home"
            className="text-primary hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}