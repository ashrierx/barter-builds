"use client";

import { useState, useTransition, useEffect, useRef } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close dropdown if clicking outside
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  // Get first initial from user's first name or business name
  const userInitial = user?.name ? user.name[0].toUpperCase() : "";

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Barter Builds
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>

            {user ? (
              <>
                <Link
                  href="/businesses"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Businesses
                </Link>
                <div ref={dropdownRef} className="w-10 h-10 relative flex items-center rounded-full">
                  {/* User icon with initial */}
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="btn btn-primary text-white flex items-center justify-center font-semibold focus:outline-none w-10"
                    aria-label="User menu"
                  >
                    {userInitial}
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-4 top-6 mt-2 w-40 bg-white border rounded-md shadow-lg z-20 py-1">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        disabled={isPending}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                      >
                        {isPending ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  )}
                </div>
              </>
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
                  className="btn btn-primary"
                >
                  Sign In
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {/* Hamburger icon */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                disabled={isPending}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                {isPending ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setAuthMode("signup");
                  setShowAuthModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  setAuthMode("login");
                  setShowAuthModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md btn-primary text-white hover:bg-blue-700"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      )}

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
