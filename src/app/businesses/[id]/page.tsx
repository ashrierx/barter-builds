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
  requirements?: string[];
  cover_photo?: string;
  priority_level?: "low" | "medium" | "high" | "critical";
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  planned_pages?: string[];
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

  if (loading)
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  if (error) return <p className="text-center py-20 text-red-600">{error}</p>;
  if (!business) return <p className="text-center py-20">Business not found</p>;

  const getPriorityColor = (level?: string) => {
    switch (level) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Cover Photo */}
      {business.cover_photo && (
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={business.cover_photo}
            alt={`${business.business_name} cover`}
            className="w-full h-80 object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {business.business_name}
            </h1>
            <p className="text-xl text-slate-600">{business.business_type}</p>
          </div>
          {business.priority_level && (
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${getPriorityColor(
                business.priority_level
              )}`}
            >
              {business.priority_level.charAt(0).toUpperCase() +
                business.priority_level.slice(1)}{" "}
              Priority
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-8">
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          {/* Left Column - Business Details */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Business Details
            </h2>

            <div className="space-y-3 text-slate-700">
              <div>
                <strong className="text-slate-900">Location:</strong>{" "}
                {business.location}
              </div>

              {business.phone && (
                <div>
                  <strong className="text-slate-900">Phone:</strong>{" "}
                  <a
                    href={`tel:${business.phone}`}
                    className="text-purple-700 hover:text-purple-900 font-medium"
                  >
                    {business.phone}
                  </a>
                </div>
              )}

              {business.website && (
                <div>
                  <strong className="text-slate-900">Website:</strong>
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:text-purple-900 ml-1 font-medium"
                  >
                    {business.website}
                  </a>
                </div>
              )}
            </div>

            {/* Contact Information */}
            {(business.contact_name ||
              business.contact_email ||
              business.contact_phone) && (
              <div className="mt-6 pt-6 border-t border-purple-100">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-2 text-slate-700">
                  {business.contact_name && (
                    <div>
                      <strong className="text-slate-900">Contact:</strong>{" "}
                      {business.contact_name}
                    </div>
                  )}
                  {business.contact_email && (
                    <div>
                      <strong className="text-slate-900">Email:</strong>
                      <a
                        href={`mailto:${business.contact_email}`}
                        className="text-purple-700 hover:text-purple-900 ml-1 font-medium"
                      >
                        {business.contact_email}
                      </a>
                    </div>
                  )}
                  {business.contact_phone && (
                    <div>
                      <strong className="text-slate-900">Phone:</strong>
                      <a
                        href={`tel:${business.contact_phone}`}
                        className="text-purple-700 hover:text-purple-900 ml-1 font-medium"
                      >
                        {business.contact_phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - What We Offer */}
          <div className="md:border-l md:pl-10 border-purple-100">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              What We Offer
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              {business.offering}
            </p>

            {/* Requirements */}
            {business.requirements && business.requirements.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Requirements
                </h3>
                <div className="flex flex-wrap gap-2">
                  {business.requirements.map((req, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Planned Pages */}
            {business.planned_pages && business.planned_pages.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Planned Pages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {business.planned_pages.map((page, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {page}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* About Us Section */}
        <div className="pt-10 border-t border-purple-100">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            About Us
          </h2>
          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">
            {business.description}
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-10 pt-6 border-t border-purple-100 text-center">
          <a
            href={
              business.contact_email
                ? `mailto:${business.contact_email}`
                : business.website || "#"
            }
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
