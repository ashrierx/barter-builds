// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

// src/app/layout.tsx

export const metadata: Metadata = {
  title: "BB | Barter Builds", 
  description: "Connecting businesses with developers through fair exchange.",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>
          B<span className="text-[rgb(120,100,255)]">B</span>
          <span className="ml-2 text-lg font-bold tracking-tight hidden sm:inline-block">
            BarterBuildsssss
          </span>
        </title>
      </Head>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>

        <footer className="bg-[#0a0a0a] border-t border-white/5 pt-16 pb-6 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
              {/* Brand Column */}
              <div className="col-span-1 md:col-span-1">
                <Link
                  href="/"
                  className="text-2xl font-black tracking-tighter text-white hover:opacity-80 transition-opacity"
                >
                  B<span className="text-[#7864ff]">B</span>
                  <span className="ml-2 text-lg font-bold tracking-tight">
                    BarterBuilds
                  </span>
                </Link>
                <p className="mt-6 text-slate-500 text-sm leading-relaxed">
                  Building the web through fair exchange. We connect talent with
                  local businesses to create a vibrant ecosystem of skill-based
                  trade.
                </p>
              </div>

              {/* Navigation Columns */}
              <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
                  Platform
                </h4>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li>
                    <Link
                      href="/businesses"
                      className="hover:text-[#7864ff] transition-colors"
                    >
                      Browse Businesses
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-[#7864ff] transition-colors"
                    >
                      How it Works
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-[#7864ff] transition-colors"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Placeholder for Community Column - kept for layout spacing */}
              <div className="hidden md:block" />

              {/* Newsletter/CTA Column */}
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <h4 className="text-white font-bold mb-2 text-sm">
                  Join the Movement
                </h4>
                <p className="text-slate-500 text-xs mb-4">
                  Get notified when new businesses post trade.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="bg-black border-none rounded-xl px-3 py-2 text-xs w-full focus:ring-1 focus:ring-[#7864ff] text-white"
                  />
                  <button className="bg-[#432ad5] text-white p-2 rounded-xl hover:bg-[#7864ff] transition-all flex items-center justify-center">
                    <ArrowRight size={16} /> {/* CORRECTED: Added size */}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-600 text-xs">
                © 2025 Barter Builds. All rights reserved.
                {/* Note: Hardcoding 2025 stops the hydration error. */}
              </p>
              {/* <div className="flex gap-6 text-slate-600 text-xs font-medium">
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </div> */}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
