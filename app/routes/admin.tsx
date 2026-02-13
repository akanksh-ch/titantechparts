import { AdminDashboardPage } from "~/components/AdminDashboardPage";
import { ProtectedRoute } from "~/components/ProtectedRoute";

export default function AdminRoute() {
  return (
    <ProtectedRoute adminOnly>
      <AdminDashboardPage />
    </ProtectedRoute>
  );
}
