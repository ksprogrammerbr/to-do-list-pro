import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FiHome, FiSettings, FiActivity, FiUsers } from "react-icons/fi";
import { useRouter } from "next/router";

export function Navbar() {
  const { user, isSignedIn, isLoaded } = useUser(); // Inclua isLoaded
  const router = useRouter();

  // Exiba um carregando enquanto os dados estão sendo carregados
  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return null;

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-gray-800 hover:text-gray-600 flex items-center gap-2 ${
                router.pathname === "/" ? "font-bold" : ""
              }`}
            >
              <FiHome className="w-5 h-5" />
              <span className="font-medium">Início</span>
            </Link>
            {user?.publicMetadata?.role === "admin" && (
              <>
                <Link
                  href="/admin"
                  className={`text-gray-800 hover:text-gray-600 flex items-center gap-2 ${
                    router.pathname === "/admin" ? "font-bold" : ""
                  }`}
                >
                  <FiHome className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/admin/users"
                  className={`text-gray-800 hover:text-gray-600 flex items-center gap-2 ${
                    router.pathname === "/admin/users" ? "font-bold" : ""
                  }`}
                >
                  <FiUsers className="w-5 h-5" />
                  <span>Usuários</span>
                </Link>
                <Link
                  href="/admin/reports"
                  className={`text-gray-800 hover:text-gray-600 flex items-center gap-2 ${
                    router.pathname === "/admin/reports" ? "font-bold" : ""
                  }`}
                >
                  <FiActivity className="w-5 h-5" />
                  <span>Relatórios</span>
                </Link>
                <Link
                  href="/admin/settings"
                  className={`text-gray-800 hover:text-gray-600 flex items-center gap-2 ${
                    router.pathname.startsWith("/admin/settings")
                      ? "font-bold"
                      : ""
                  }`}
                >
                  <FiSettings className="w-5 h-5" />
                  <span className="font-medium">Configurações</span>
                </Link>
                <Link
                  href="/admin/activity"
                  className={`text-gray-800 hover:text-gray-600 flex items-center gap-2 ${
                    router.pathname.startsWith("/admin/activity")
                      ? "font-bold"
                      : ""
                  }`}
                >
                  <FiActivity className="w-5 h-5" />
                  <span className="font-medium">Atividades</span>
                </Link>
                <Link
                  href="/admin/financialAdmin"
                  className={`text-gray-800 hover:text-gray-600 flex items-center gap-2 ${
                    router.pathname.startsWith("/admin/financialAdmin")
                      ? "font-bold"
                      : ""
                  }`}
                >
                  <FiActivity className="w-5 h-5" />
                  <span className="font-medium">Administração Financeira</span>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-800">
              Olá, {user?.firstName || "Usuário"}
            </span>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "bg-white/80 backdrop-blur-md",
                },
              }}
              afterSignOutUrl="/sign-in"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
