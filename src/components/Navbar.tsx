"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, LogOut, Settings } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "./loginModal";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isActive = (path: string) => pathname === path;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  useEffect(() => {
    if (isAuthenticated) {
      setShowLoginModal(false);
    }
  }, [isAuthenticated]);

  return (
    <>
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-semibold text-primary">
              Barter Builds
            </Link>

            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className={`transition-colors ${
                  isActive("/")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`transition-colors ${
                  isActive("/about")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                About
              </Link>
              <Link
                href="/businesses"
                className={`transition-colors ${
                  isActive("/businesses")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Businesses
              </Link>
              <Link
                href="/contact"
                className={`transition-colors ${
                  isActive("/contact")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated && user ? (
                <div className="dropdown dropdown-end">
                  <button
                    tabIndex={0}
                    className="rounded-full h-8 w-8 flex items-center justify-center bg-[#412ad5] hover:bg-[#3521b3] transition-colors"
                  >
                    <span className="text-xs font-bold text-white">
                      {getInitials(user.name)}
                    </span>
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-lg"
                  >
                    <div className="flex items-center justify-start gap-2 p-2 border-b border-gray-200 mb-2">
                      <div className="avatar">
                        <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
                      </div>
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <li>
                      <Link href="/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link href="/apply" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </li>
                    <li onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <button
                    className="btn"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Sign In
                  </button>
                  {/* <button className="btn">
                    <Link href="/apply">Get Started</Link>
                  </button> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
