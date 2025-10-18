"use client";

import { useState, useTransition } from "react";
import { LoginModal } from "@/components/auth/LoginModal";
import { SignupModal } from "@/components/auth/SignupModal";
import { logoutAction } from "@/app/auth/actions";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
  role: "business" | "developer";
};

type NavbarClientProps = {
  user: User | null;
};

export function NavbarClient({ user }: NavbarClientProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Barter Builds
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900"
            >
              Contact
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user.name}
                </span>
                <Link
                  href="/dashboard"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isPending}
                  className="text-gray-600 hover:text-gray-700 disabled:opacity-50"
                >
                  {isPending ? "Logging out..." : "Logout"}
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthMode("signup");
                    setShowAuthModal(true);
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    setAuthMode("login");
                    setShowAuthModal(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showAuthModal && authMode === "login" && (
        <LoginModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          switchToSignup={() => setAuthMode("signup")}
        />
      )}

      {showAuthModal && authMode === "signup" && (
        <SignupModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          switchToLogin={() => setAuthMode("login")}
        />
      )}
    </nav>
  );
}