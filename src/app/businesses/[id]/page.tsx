"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

type BusinessProfile = {
  user_id: string;
  business_name: string;
  business_type: string;
  location: string;
  description: string;
  offering: string;
  cover_photo?: string;
  priority_level?: "low" | "medium" | "high" | "critical";
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  website?: string;
  requirements?: string[];
  planned_pages?: string[];
  created_at?: string;
};

export default function BusinessDetailPage() {
  const { id } = useParams();
  const [business, setBusiness] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBusiness() {
      const res = await fetch(`/api/businesses/${id}`);
      const data = await res.json();
      setBusiness(data);
      setLoading(false);
    }
    if (id) fetchBusiness();
  }, [id]);

  if (loading || !business) return null;

  const priorityStyles: Record<string, string> = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link href="/businesses">
        <div className="flex items-center gap-1 mb-4">
          <ArrowLeft />
          <span>
            <button className="btn btn-outline text-black">
              Back to Businesses
            </button>
          </span>
        </div>
      </Link>

      {/* Cover Photo */}
      {business.cover_photo && (
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
          <Image
            src={business.cover_photo}
            alt={`${business.business_name} cover photo`}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-2xl border p-6">
            <h1 className="text-2xl font-semibold mb-2 text-black">
              {business.business_name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4" />
                <span>{business.location}</span>
              </div>

              {business.created_at && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4" />
                  <span>
                    Posted {new Date(business.created_at).toDateString()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2 mb-6">
              <span className="px-3 py-1 rounded-lg border-gray-200 border text-sm text-gray-700">
                {business.business_type}
              </span>
              {business.priority_level && (
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                    priorityStyles[business.priority_level]
                  }`}
                >
                  <Clock className="w-4" />
                  <span>
                    {business.priority_level.charAt(0).toUpperCase() +
                      business.priority_level.slice(1)}{" "}
                    Priority
                  </span>
                </div>
              )}
            </div>

            <p className="text-slate-700 leading-relaxed">
              {business.description}
            </p>
          </div>

          {/* Offering */}
          <div className="bg-white rounded-2xl border p-6">
            <p className="mb-4 text-black">Project Requirements</p>
            <h2 className="font-semibold mb-3 text-black">
              What They&apos;re Offering
            </h2>
            <div className="bg-slate-100 rounded-xl p-4 text-sm text-gray-700">
              {business.offering}
            </div>

            {/* Requirements */}
            {business.requirements?.length && (
              <div className="bg-white py-8">
                <h2 className="font-semibold mb-3 text-black">
                  Required Features:
                </h2>
                <div className="text-gray-700">
                  {business.requirements.map((req, i) => (
                    <ul key={i} className="px-3 py-1 text-sm list-disc">
                      <li>{req}</li>
                    </ul>
                  ))}
                </div>
              </div>
            )}

            {/* Planned Pages */}
            {business.planned_pages?.length && (
              <div className="bg-white pb-8">
                <h2 className="font-semibold mb-3 text-black">Planned Pages</h2>
                <div className="flex flex-wrap gap-2">
                  {business.planned_pages.map((page, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-slate-100 text-gray-700 text-sm"
                    >
                      {page}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* Contact Card */}
          {(business.contact_name ||
            business.contact_email ||
            business.contact_phone) && (
            <div className="bg-white rounded-2xl border p-6">
              <h3 className="font-semibold mb-4 text-black">Business Owner</h3>

              {business.contact_name && (
                <p className="font-medium mb-2 text-black">
                  {business.contact_name}
                </p>
              )}

              <hr></hr>

              <div className="mt-4 space-y-2 text-sm text-slate-700">
                {business.contact_email && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-4" />
                    <span>
                      <a
                        href={`mailto:${business.contact_email}`}
                        className="block hover:underline"
                      >
                        {business.contact_email}
                      </a>
                    </span>
                  </div>
                )}
                {business.contact_phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-4" />
                    <span>
                      <a
                        href={`tel:${business.contact_phone}`}
                        className="block hover:underline"
                      >
                        {business.contact_phone}
                      </a>
                    </span>
                  </div>
                )}
                {business.website && (
                  <div className="flex items-center gap-1">
                    <Globe className="w-4" />
                    <span>
                      <a
                        href={business.website}
                        target="_blank"
                        className="block hover:underline"
                      >
                        Current Website
                      </a>
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-white rounded-2xl border p-6">
            <button className="w-full bg-black text-white py-3 rounded-xl font-medium">
              Contact Business
            </button>
            {/* <button className="w-full mt-3 border py-3 rounded-xl text-sm">
              Save for Later
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
