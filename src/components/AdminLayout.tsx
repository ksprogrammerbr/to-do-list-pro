import React from "react";
import Navbar from "./Navbar";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import {
  FiUsers,
  FiActivity,
  FiSettings,
  FiHome,
  FiList,
} from "react-icons/fi";
import { Notifications } from "./Notifications";
import { Dashboard } from "./admin/Dashboard";
import { UsersManagement } from "./admin/UsersManagement";
import { TasksManagement } from "./admin/TasksManagement";
import { TestConnection } from "./admin/TestConnection";
import { ArrowLeft } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const MENU_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: FiHome },
  { href: "/admin/users", label: "Usuários", icon: FiUsers },
  { href: "/admin/tasks", label: "Tarefas", icon: FiList },
  { href: "/admin/settings", label: "Configurações", icon: FiSettings },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 min-h-screen">
        <div className="p-4">
          <Link
            href="/"
            className="flex items-center text-white mb-6 hover:text-gray-300"
          >
            <ArrowLeft className="mr-2" />
            Voltar ao Início
          </Link>
          <h1 className="text-white text-xl mb-6">Admin Panel</h1>
          <div className="space-y-2">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 p-2 rounded ${
                  router.pathname === item.href
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Conteúdo */}
      <main className="flex-1">
        <header className="bg-white shadow">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl">
              {MENU_ITEMS.find((item) => item.href === router.pathname)
                ?.label || "Dashboard"}
            </h1>
            <Notifications />
          </div>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
