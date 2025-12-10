// src/app/businesses/page.tsx
"use client";

import { MapPin, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type BusinessProfile = {
  user_id: string;
  business_name: string;
  business_type: string;
  location: string;
  phone?: string;
  website?: string;
  description: string;
  offering: string;
  is_listed?: boolean;
  created_at?: string;
  updated_at?: string;
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
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl mb-6 font-bold">Businesses Seeking Help</h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
          Browse local businesses that need websites and discover what valuable
          goods and services they are offering in exchange.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {businesses.map((business) => (
          <Link key={business.user_id} href={`/businesses/${business.user_id}`}>
            <div className="rounded-2xl border border-[#432ad5]/20 bg-white shadow-sm hover:shadow-md transition p-6">
              <div className="flex justify-between items-start mb-3">
                <p className="text-xl font-semibold text-slate-900">
                  {business.business_name}
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#432ad5]" />
                  {business.location}
                </span>
              </div>

              <span className="inline-block text-xs px-3 py-1 rounded-full bg-[#432ad5]/10 text-[#432ad5] font-medium mb-4">
                {business.business_type}
              </span>

              <p className="text-slate-600 mb-4 leading-relaxed">
                {business.description}
              </p>

              <div className="mb-4">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Offering in Exchange:
                </h4>
                <p className="text-sm rounded-lg text-slate-700">
                  {business.offering}
                </p>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-[#432ad5] text-white py-3 rounded-xl font-medium hover:bg-[#3920cb] transition">
                <ExternalLink className="w-4 h-4" />
                Contact {business.business_name}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
