"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full bg-gray-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-row items-center justify-between px-4 py-3 text-gray-800">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Barter Builds
        </Link>

        <div className="flex space-x-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
          <Link href="/businesses" className="hover:text-primary">
            Businesses
          </Link>
          <Link href="/contact" className="hover:text-primary">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
