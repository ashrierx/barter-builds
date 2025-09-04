"use client";

import { ReactNode } from "react";
import { LogOut, UserCircle } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <UserCircle className="w-6 h-6 text-gray-600" />
          <h1 className="font-semibold text-lg">
            {user ? `${user.name}'s Dashboard` : "Dashboard"}
          </h1>
        </div>
        {user && (
          <button
            onClick={logout}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        )}
      </header>

      {/* Body */}
      <main className="flex-1 container mx-auto p-6">{children}</main>
    </div>
  );
}
