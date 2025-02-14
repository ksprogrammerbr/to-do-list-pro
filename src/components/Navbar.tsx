import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FiHome, FiSettings, FiList } from "react-icons/fi";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

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
              <Link
                href="/admin"
                className={`text-gray-800 hover:text-gray-600 flex items-center gap-2 ${
                  router.pathname.startsWith("/admin") ? "font-bold" : ""
                }`}
              >
                <FiSettings className="w-5 h-5" />
                <span className="font-medium">Admin</span>
              </Link>
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
};

export default Navbar;
