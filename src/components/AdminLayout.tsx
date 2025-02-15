import React from "react";
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import { FiUsers, FiActivity, FiSettings } from "react-icons/fi";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.publicMetadata?.role !== "admin") {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (!isLoaded || !isSignedIn || user?.publicMetadata?.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300">
      <Navbar />
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-4 mb-6">
          <Link
            href="/admin"
            className={`px-4 py-2 rounded-lg ${
              router.pathname === "/admin"
                ? "bg-primary-400 text-white"
                : "bg-white/10 text-gray-800 hover:bg-white/20"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/users"
            className={`px-4 py-2 rounded-lg ${
              router.pathname === "/admin/users"
                ? "bg-primary-400 text-white"
                : "bg-white/10 text-gray-800 hover:bg-white/20"
            }`}
          >
            Usuários
          </Link>
          <Link
            href="/admin/activity"
            className={`px-4 py-2 rounded-lg ${
              router.pathname === "/admin/activity"
                ? "bg-primary-400 text-white"
                : "bg-white/10 text-gray-800 hover:bg-white/20"
            }`}
          >
            Atividades
          </Link>
          <Link
            href="/admin/settings"
            className={`px-4 py-2 rounded-lg ${
              router.pathname === "/admin/settings"
                ? "bg-primary-400 text-white"
                : "bg-white/10 text-gray-800 hover:bg-white/20"
            }`}
          >
            Configurações
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
