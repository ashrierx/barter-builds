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
            <div className="rounded-2xl border bg-white shadow-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xl font-semibold">
                    {business.business_name}
                  </p>
                  {/* <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyStyle(
                      business.urgency
                    )}`}
                  >
                    {business.urgency || "Normal"} Priority
                  </span> */}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {business.location}
                  </span>
                  {/* {business.createdAt && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(business.createdAt).toLocaleDateString()}
                    </span>
                  )} */}
                </div>
                <span className="inline-block text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 mb-4">
                  {business.business_type}
                </span>

                <p className="text-gray-600 mb-4">{business.description}</p>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Offering in Exchange:</h4>
                  <p className="text-sm bg-gray-100 p-3 rounded-lg">
                    {business.offering}
                  </p>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-xl hover:bg-gray-800 transition">
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
