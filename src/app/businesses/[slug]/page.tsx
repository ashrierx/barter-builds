// src/app/businesses/[id]/page.tsx
"use client";

import { MapPin, Calendar, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type BusinessProfile = {
  id: string;
  business_name: string;
  business_type: string;
  location: string;
  description: string;
  offering: string;
  urgency?: "High" | "Medium" | "Low";
  createdAt?: string;
  website?: string;
  phone?: string;
};

const getUrgencyStyle = (urgency: string | undefined) => {
  switch (urgency) {
    case "High":
      return "bg-red-600 text-white";
    case "Medium":
      return "bg-gray-900 text-white";
    case "Low":
      return "bg-gray-200 text-gray-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

export default function BusinessPage() {
  const params = useParams();
  const { id } = params;
  const [business, setBusiness] = useState<BusinessProfile | null>(null);

  useEffect(() => {
    async function fetchBusiness() {
      const res = await fetch(`/api/business-profile/${id}`);
      const data = await res.json();
      setBusiness(data);
    }
    fetchBusiness();
  }, [id]);

  if (!business) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white rounded-xl shadow-sm p-6 border">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold">{business.business_name}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {business.location}
              </span>
              {business.createdAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Posted {new Date(business.createdAt).toLocaleDateString()}
                </span>
              )}
              <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">
                {business.business_type}
              </span>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyStyle(
              business.urgency
            )}`}
          >
            {business.urgency || "Normal"} Priority
          </span>
        </div>

        <p className="text-gray-700 mb-6">{business.description}</p>

        <div className="mb-6">
          <h2 className="font-medium mb-2">Offering in Exchange</h2>
          <p className="bg-gray-100 p-4 rounded-lg">{business.offering}</p>
        </div>

        <div className="flex flex-col gap-3">
          {business.website && (
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit Website
            </a>
          )}
          {business.phone && <p>Phone: {business.phone}</p>}
        </div>

        <button className="mt-8 w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition">
          <ExternalLink className="w-4 h-4" />
          Contact {business.business_name}
        </button>
      </div>
    </div>
  );
}
