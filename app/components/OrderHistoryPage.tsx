import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
} from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "~/components/figma/ImageWithFallback";
import { ordersApi } from "~/utils/api";
import { getCurrentUsername } from "~/utils/auth";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "~/components/ui/tooltip";

interface OrderItem {
  inventoryId: string;
  name: string;
  image?: string;
  imageUrl?: string;
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

interface ReturnItem {
  inventoryId: string;
  quantity: number;
}

export function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [returnReason, setReturnReason] = useState("");
  const [returnItems, setReturnItems] = useState<ReturnItem[]>([]);
  const [isReturning, setIsReturning] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Get current user
        const currentUser = getCurrentUsername();
        setUsername(currentUser);

        const data = await ordersApi.getUserOrders();
        // Sort by date descending
        const sortedOrders = data.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setOrders(sortedOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load your order history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const openReturnModal = (orderId: string) => {
    const order = orders.find((o) => o._id === orderId);
    if (order) {
      setSelectedOrderId(orderId);
      setReturnItems(
        order.items.map((item) => ({
          inventoryId: item.inventoryId,
          quantity: 0,
        })),
      );
      setReturnModalOpen(true);
    }
  };

  const handleReturnItemQuantityChange = (
    inventoryId: string,
    quantity: number,
  ) => {
    setReturnItems((items) =>
      items.map((item) =>
        item.inventoryId === inventoryId ? { ...item, quantity } : item,
      ),
    );
  };

  const handleReturnAll = async () => {
    if (!selectedOrderId) return;

    const order = orders.find((o) => o._id === selectedOrderId);
    if (!order) return;

    setIsReturning(true);
    try {
      // Create return request with all items
      const returnPayload = {
        orderId: selectedOrderId,
        items: order.items.map((item) => ({
          inventoryId: item.inventoryId,
          quantity: item.quantity,
        })),
        reason: returnReason || "Customer requested full order return",
      };

      // Call return API (would need to be implemented on backend)
      console.log("Submitting return:", returnPayload);
      // await ordersApi.createReturn(returnPayload);

      // For now, show success message
      alert("Return request submitted successfully!");
      setReturnModalOpen(false);
      setReturnReason("");
    } catch (err) {
      console.error("Failed to submit return:", err);
      alert("Failed to submit return request. Please try again.");
    } finally {
      setIsReturning(false);
    }
  };

  const handleReturnPartial = async () => {
    if (!selectedOrderId) return;

    const itemsToReturn = returnItems.filter((item) => item.quantity > 0);
    if (itemsToReturn.length === 0) {
      alert("Please select at least one item to return.");
      return;
    }

    setIsReturning(true);
    try {
      const returnPayload = {
        orderId: selectedOrderId,
        items: itemsToReturn,
        reason: returnReason || "Customer requested partial return",
      };

      console.log("Submitting partial return:", returnPayload);
      // await ordersApi.createReturn(returnPayload);

      alert("Return request submitted successfully!");
      setReturnModalOpen(false);
      setReturnReason("");
    } catch (err) {
      console.error("Failed to submit return:", err);
      alert("Failed to submit return request. Please try again.");
    } finally {
      setIsReturning(false);
    }
  };

  const statusConfig = {
    delivered: {
      icon: CheckCircle,
      label: "Delivered",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    shipped: {
      icon: Truck,
      label: "Shipped",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    processing: {
      icon: Clock,
      label: "Processing",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    pending: {
      icon: Clock,
      label: "Pending",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
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
          <p className="text-muted-foreground mb-6">
            Start shopping to see your orders here!
          </p>
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
    <div className="min-h-screen bg-background py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Header with User Info */}
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-1 text-2xl sm:text-3xl">Order History</h1>
          {username && (
            <p className="text-muted-foreground">
              Welcome back,{" "}
              <span className="font-medium text-foreground">{username}</span>!
            </p>
          )}
        </div>

        <div className="space-y-6">
          {orders.map((order) => {
            const statusKey =
              order.status.toLowerCase() as keyof typeof statusConfig;
            const status = statusConfig[statusKey] || statusConfig.pending;
            const StatusIcon = status.icon;

            return (
              <div
                key={order._id}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-muted px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-mono text-sm break-words">
                        {order._id}
                      </p>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-border" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Date Placed
                      </p>
                      <p className="text-sm">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-border" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-sm">${order.amount.toFixed(2)}</p>
                    </div>
                  </div>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${status.bgColor} ${status.color} mt-2 sm:mt-0 w-fit`}
                  >
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-sm">{status.label}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 sm:p-6 space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={`${order._id}-${item.inventoryId}-${index}`}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start"
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={item.imageUrl || item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm sm:text-base font-medium">
                          {item.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-xs sm:text-sm">
                          ${item.unitPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Order Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                    {order.status === "delivered" && (
                      <>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="w-full sm:w-auto px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                              Buy Again
                            </button>
                          </TooltipTrigger>
                          <TooltipContent sideOffset={4}>
                            Buy this item again
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => openReturnModal(order._id)}
                              className="w-full sm:w-auto px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity"
                            >
                              Return Order
                            </button>
                          </TooltipTrigger>
                          <TooltipContent sideOffset={4}>
                            Return whole order
                          </TooltipContent>
                        </Tooltip>
                      </>
                    )}
                    {order.status === "shipped" && order.trackingNumber && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                            Track Package
                          </button>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={4}>
                          Track your package
                        </TooltipContent>
                      </Tooltip>
                    )}

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="w-full sm:w-auto px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                          View Details
                        </button>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={4}>
                        View order details
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-8">
          <Link to="/home" className="text-primary hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Return Modal */}
      {returnModalOpen && selectedOrderId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2>Return Items</h2>
              <button
                onClick={() => setReturnModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Order Items Selection */}
              <div>
                <h3 className="font-semibold mb-4">Select Items to Return</h3>
                <div className="space-y-3">
                  {orders
                    .find((o) => o._id === selectedOrderId)
                    ?.items.map((item, index) => (
                      <div
                        key={`${selectedOrderId}-${item.inventoryId}-${index}`}
                        className="border border-border rounded-lg p-4"
                      >
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={item.imageUrl || item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Available: {item.quantity} × $
                              {item.unitPrice.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="text-sm text-muted-foreground">
                              Return Qty:
                            </label>
                            <input
                              type="number"
                              min="0"
                              max={item.quantity}
                              value={
                                returnItems.find(
                                  (ri) => ri.inventoryId === item.inventoryId,
                                )?.quantity || 0
                              }
                              onChange={(e) =>
                                handleReturnItemQuantityChange(
                                  item.inventoryId,
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              className="w-16 px-2 py-1 border border-border rounded text-center"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Return Reason */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Reason for Return
                </label>
                <textarea
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  placeholder="Please tell us why you're returning this item..."
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={3}
                />
              </div>

              {/* Return Options */}
              <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-3">
                  Choose return option:
                </p>
                <button
                  onClick={handleReturnAll}
                  disabled={isReturning}
                  className="w-full px-4 py-3 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 font-medium"
                >
                  {isReturning ? "Processing..." : "Return Entire Order"}
                </button>
                <button
                  onClick={handleReturnPartial}
                  disabled={
                    isReturning ||
                    returnItems.every((item) => item.quantity === 0)
                  }
                  className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 font-medium"
                >
                  {isReturning ? "Processing..." : "Return Selected Items"}
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-border p-6 flex gap-3 justify-end bg-muted/30">
              <button
                onClick={() => setReturnModalOpen(false)}
                disabled={isReturning}
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
