"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

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

export default function BusinessDetailPage() {
  const params = useParams();
  const { id } = params;
  const [business, setBusiness] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBusiness() {
      try {
        const res = await fetch(`/api/businesses/${id}`);
        if (!res.ok) {
          throw new Error("Business not found");
        }
        const data = await res.json();
        setBusiness(data);
      } catch (error) {
        console.error("Error fetching business:", error);
        setError("Failed to load business details");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchBusiness();
    }
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-600">{error}</p>;
  if (!business) return <p className="text-center py-20">Business not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">
        {business.business_name}
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-8">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Business Details
            </h2>

            <div className="space-y-2 text-slate-700">
              <p>
                <strong className="text-slate-900">Type:</strong>{" "}
                {business.business_type}
              </p>
              <p>
                <strong className="text-slate-900">Location:</strong>{" "}
                {business.location}
              </p>

              {business.phone && (
                <p>
                  <strong className="text-slate-900">Phone:</strong>{" "}
                  {business.phone}
                </p>
              )}

              {business.website && (
                <p>
                  <strong className="text-slate-900">Website:</strong>
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:text-purple-900 ml-1 font-medium"
                  >
                    {business.website}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="md:border-l md:pl-10 border-purple-100">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              What We Offer
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed">
              {business.offering}
            </p>
          </div>
        </div>

        {/* About Us */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            About Us
          </h2>
          <p className="text-slate-700 leading-relaxed">
            {business.description}
          </p>
        </div>
      </div>
    </div>
  );
}
