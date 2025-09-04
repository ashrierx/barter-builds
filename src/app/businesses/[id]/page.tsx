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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{business.business_name}</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Business Details</h2>
            <p>
              <strong>Type:</strong> {business.business_type}
            </p>
            <p>
              <strong>Location:</strong> {business.location}
            </p>
            {business.phone && (
              <p>
                <strong>Phone:</strong> {business.phone}
              </p>
            )}
            {business.website && (
              <p>
                <strong>Website:</strong>
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  {business.website}
                </a>
              </p>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">What We Offer</h2>
            <p className="text-gray-700">{business.offering}</p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">About Us</h2>
          <p className="text-gray-700">{business.description}</p>
        </div>
      </div>
    </div>
  );
}
