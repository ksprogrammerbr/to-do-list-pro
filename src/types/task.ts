export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "doing" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string | null;
  dueTime?: string | null;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}
