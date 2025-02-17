interface DashboardMetrics {
  totalUsers: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  pendingTasks: number;
}

// Componente para métricas
const DashboardMetrics = () => {
  // Lógica para buscar dados do Supabase
  return <div className="grid grid-cols-4 gap-4">{/* Widgets aqui */}</div>;
};
