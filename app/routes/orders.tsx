import { OrderHistoryPage } from "~/components/OrderHistoryPage";
import { ProtectedRoute } from "~/components/ProtectedRoute";

export default function OrdersRoute() {
  return (
    <ProtectedRoute>
      <OrderHistoryPage />
    </ProtectedRoute>
  );
}
