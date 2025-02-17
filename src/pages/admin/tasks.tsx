import AdminLayout from "@/components/AdminLayout";
import { TasksManagement } from "@/components/admin/TasksManagement";

export default function AdminTasksPage() {
  return (
    <AdminLayout>
      <TasksManagement />
    </AdminLayout>
  );
}
