"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { LoginModal } from "@/components/auth/LoginModal";
import { SignupModal } from "@/components/auth/SignupModal";
import { logoutAction } from "@/app/auth/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isTargetPage =
    pathname.startsWith("/dashboard/business") ||
    pathname.startsWith("/dashboard/developer") ||
    (pathname.startsWith("/businesses/") && pathname !== "/businesses");

  const useSlateText = isScrolled || isTargetPage;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        useSlateText
          ? "bg-white/80 backdrop-blur-md border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center text-white">
            <Link
              href="/"
              className={`transition-colors duration-300 font-medium ${
                useSlateText ? "text-slate-600" : "text-white"
              } hover:text-[#432ad5]`}
            >
              B<span className="text-[rgb(120,100,255)]">B</span>
              <span className="ml-2 text-lg font-bold tracking-tight hidden sm:inline-block">
                BarterBuilds
              </span>
            </Link>
          </div>

          {/* Desktop nav links - Refined Typography */}
          <div className="hidden md:flex items-center space-x-8  text-white">
            {["About", "Businesses", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`transition-colors duration-300 font-medium ${
                  useSlateText ? "text-slate-600" : "text-white"
                } hover:text-[#432ad5]`}
              >
                {item}
              </Link>
            ))}

            {user ? (
              <div className="relative ml-4" ref={dropdownRef}>
                {/* User Profile Button - Perfect Circle */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgb(67,42,213)] text-white font-bold text-sm shadow-md hover:scale-105 transition-transform focus:outline-none border-2 border-white/10"
                  aria-label="User menu"
                >
                  {userInitial}
                </button>

                {/* Modern Dropdown - Aligned to right-0 to prevent screen cutoff */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border border-slate-100 dark:border-white/5 py-2 z-50 overflow-hidden ring-1 ring-black/5 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-2 border-b border-slate-50 dark:border-white/5 mb-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Account
                      </p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {user.name}
                      </p>
                    </div>

                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
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
                      className="w-full text-left flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors disabled:opacity-50"
                    >
                      {isPending ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-6 pl-4 border-l border-white/10">
                <button
                  onClick={() => {
                    setAuthMode("signup");
                    setShowAuthModal(true);
                  }}
                  className="text-sm font-semibold text-white hover:opacity-70 transition-opacity"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    setAuthMode("login");
                    setShowAuthModal(true);
                  }}
                  className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all"
                >
                  Sign In
                </button>
              </div>
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
