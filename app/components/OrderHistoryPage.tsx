import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '~/components/figma/ImageWithFallback';

export function OrderHistoryPage() {
  const mockOrders = [
    {
      id: 'ORD-2026-001',
      date: '2026-01-15',
      status: 'delivered',
      total: 429.98,
      items: [
        {
          id: 1,
          name: 'Wireless Headphones',
          price: 129.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY4NzE4NTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        },
        {
          id: 2,
          name: 'Smart Watch Pro',
          price: 299.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNofGVufDF8fHx8MTc2ODcxNDM1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        }
      ]
    },
    {
      id: 'ORD-2026-002',
      date: '2026-01-18',
      status: 'shipped',
      total: 899.99,
      trackingNumber: 'TRK123456789',
      items: [
        {
          id: 4,
          name: 'Professional Camera',
          price: 899.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1579535984712-92fffbbaa266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3Njg3NjQ5NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        }
      ]
    },
    {
      id: 'ORD-2026-003',
      date: '2026-01-19',
      status: 'processing',
      total: 149.98,
      items: [
        {
          id: 5,
          name: 'Running Shoes',
          price: 89.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXN8ZW58MXx8fHwxNzY4NzY2MDYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        },
        {
          id: 6,
          name: 'Travel Backpack',
          price: 59.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1680039211156-66c721b87625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGJhZ3xlbnwxfHx8fDE3Njg3NDUzNDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        }
      ]
    }
  ];

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
    }
  };

  if (mockOrders.length === 0) {
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
          {mockOrders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <div key={order.id} className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Order Header */}
                <div className="bg-muted px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order Number</p>
                      <p>{order.id}</p>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-border"></div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date Placed</p>
                      <p>{new Date(order.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-border"></div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p>${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${status.bgColor} ${status.color} w-fit`}>
                    <StatusIcon className="w-4 h-4" />
                    <span>{status.label}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4>{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        <p className="text-sm">${item.price}</p>
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
                    {order.status === 'delivered' && (
                      <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                        Leave Review
                      </button>
                    )}
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