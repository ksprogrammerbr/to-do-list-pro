export interface Notification {
  id: string;
  user_id: string;
  message: string;
  read: boolean;
  type: string;
  reference_id: string;
  reference_type: string;
  created_at: string;
}

export interface TaskComment {
  id: string;
  task_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  name: string;
  role: string;
  active: boolean;
  created_at: string;
  last_login: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  details: any;
  reference_type: string;
  reference_id: string;
  created_at: string;
  ip_address?: string;
  user_agent?: string;
  severity: "info" | "warning" | "error";
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  due_date: string;
  tags: string[];
  assigned_to: string;
  project_id: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  clerk_id: string;
  email: string;
  full_name: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  status: "active" | "canceled" | "past_due";
  product_id: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at?: string;
  canceled_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  subscription_id: string;
  stripe_payment_id: string;
  amount: number;
  status: "succeeded" | "failed" | "pending";
  created_at: string;
}

export interface Product {
  id: string;
  stripe_product_id: string;
  name: string;
  description: string;
  active: boolean;
  price: number;
  created_at: string;
  updated_at: string;
}
