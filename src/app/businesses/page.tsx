// src/app/businesses/page.tsx
"use client";

import { MapPin, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type BusinessProfile = {
  user_id: string;
  business_name: string | null;
  business_type: string | null;
  location: string | null;
  phone: string | null;
  website: string | null;
  description: string | null;
  offering: string | null;
  is_listed: boolean;
  requirements: string[] | null;
  cover_photo: string | null;
  priority_level: "low" | "medium" | "high" | "critical" | null;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  planned_pages: string[] | null;
  created_at: string | null;
  updated_at: string | null;
};

export default function Businesses() {
  const [businesses, setBusinesses] = useState<BusinessProfile[]>([]);

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const res = await fetch("/api/businesses");
        const data = await res.json();
        setBusinesses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching businesses:", error);
        setBusinesses([]);
      }
    }
    fetchBusinesses();
  }, []);

  // const getUrgencyStyle = (urgency: string | undefined) => {
  //   switch (urgency) {
  //     case "High":
  //       return "bg-red-600 text-white";
  //     case "Medium":
  //       return "bg-gray-900 text-white";
  //     case "Low":
  //       return "bg-gray-200 text-gray-800";
  //     default:
  //       return "bg-gray-200 text-gray-800";
  //   }
  // };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <div className="bg-[#0a0a0a] text-white py-32 px-6 mb-12 relative overflow-hidden">
        {/* Multi-layered Glow */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#432ad5]/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-[#7864ff]/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-[0.3em] uppercase bg-white/5 border border-white/10 rounded-full backdrop-blur-sm text-[#7864ff]">
            Open Opportunities
          </span>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Businesses <br />
            <span className="bg-gradient-to-r from-[#7864ff] to-[#bca6ff] bg-clip-text text-transparent">
              Seeking Help.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Browse local businesses that need websites and discover what
            valuable goods and services they are offering in exchange.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-8">
        {businesses.map((business) => (
          <Link
            key={business.user_id}
            href={`/businesses/${business.user_id}`}
            className="block h-full"
          >
            <div className="group relative h-full flex flex-col rounded-3xl border border-slate-100 bg-white overflow-hidden transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
              <div className="h-2 w-full bg-[rgb(67,42,213)]" />
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-slate-400">
                    {business.business_type}
                  </span>
                  <div className="flex items-center text-xs font-medium text-slate-500">
                    <MapPin className="w-3 h-3 mr-1" /> {business.location}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[rgb(67,42,213)] transition-colors">
                  {business.business_name}
                </h3>

                <p className="text-slate-500 line-clamp-3 mb-6 text-sm leading-relaxed">
                  {business.description}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-50">
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-2">
                    The Trade
                  </p>
                  <p className="text-sm font-medium text-slate-800">
                    {business.offering}
                  </p>
                </div>
              </div>
              <button className="m-4 flex items-center justify-center gap-2 bg-[#432ad5] text-white py-3 rounded-xl font-medium hover:bg-[#3920cb] transition shadow-md active:scale-95">
                <ExternalLink className="w-4 h-4" />
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
