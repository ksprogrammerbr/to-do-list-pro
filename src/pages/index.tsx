import { Navbar } from "@/components/Navbar";
import { Dashboard } from "@/components/Dashboard";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { userId, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <Dashboard />
    </div>
  );
}
