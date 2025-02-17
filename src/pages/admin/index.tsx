import AdminLayout from "@/components/AdminLayout";
import { Dashboard } from "@/components/admin/Dashboard";

export default function AdminPage() {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
}
