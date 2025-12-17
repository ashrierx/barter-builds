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
  X,
  MessageSquare,
  Copy,
  CheckCircle2,
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

  // Modal & Copy States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchBusiness() {
      const res = await fetch(`/api/businesses/${id}`);
      const data = await res.json();
      setBusiness(data);
      setLoading(false);
    }
    if (id) fetchBusiness();
  }, [id]);

  const copyToClipboard = () => {
    if (!business) return;
    const message = `Hi ${
      business.contact_name || "there"
    },\n\nI saw your listing for ${
      business.business_name
    } on Barter Builds! I'm really interested in your project and would love to chat about trading my development skills for the ${
      business.offering
    } you mentioned. \n\nLooking forward to hearing from you!`;

    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading || !business) return null;

  const priorityStyles: Record<string, string> = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 relative">
      {/* --- CONTACT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#432ad5]/10 rounded-2xl flex items-center justify-center text-[#432ad5] mb-6">
                <MessageSquare size={32} />
              </div>

              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                Connect with {business.contact_name || "the Owner"}
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Email or call the business owner directly. Let them know you
                found them on
                <span className="font-bold text-slate-900">
                  {" "}
                  Barter Builds
                </span>{" "}
                and you want to work with them on building a site!
              </p>

              <div className="w-full space-y-3">
                {/* Copy Template Section */}
                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 mb-2 text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                    Suggested Message
                  </p>
                  <p className="text-xs text-slate-600 italic line-clamp-2 mb-3 px-1">
                  &quot;Hi {business.contact_name || "there"}, I saw your listing
                    on Barter Builds and...&quot;
                  </p>
                  <button
                    onClick={copyToClipboard}
                    className={`w-full py-3 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                      copied
                        ? "bg-green-500 text-white"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 size={14} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy Template
                      </>
                    )}
                  </button>
                </div>

                {business.contact_email && (
                  <a
                    href={`mailto:${business.contact_email}`}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-[#432ad5] text-white rounded-2xl font-bold hover:bg-[#7864ff] transition-all"
                  >
                    <Mail size={18} /> Email Owner
                  </a>
                )}

                {business.contact_phone && (
                  <a
                    href={`tel:${business.contact_phone}`}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                  >
                    <Phone size={18} /> Call {business.contact_phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- PAGE CONTENT --- */}
      <Link href="/businesses">
        <div className="flex items-center gap-1 mb-4 mt-10">
          <ArrowLeft />
          <button className="btn btn-outline text-black">
            Back to Businesses
          </button>
        </div>
      </Link>

      {business.cover_photo && (
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
          <Image
            src={business.cover_photo}
            alt="cover"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
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

          <div className="bg-white rounded-2xl border p-6">
            <h2 className="font-semibold mb-3 text-black">
              What They&apos;re Offering
            </h2>
            <div className="bg-slate-100 rounded-xl p-4 text-sm text-gray-700 mb-6">
              {business.offering}
            </div>

            {business.requirements?.length && (
              <div className="mb-6">
                <h2 className="font-semibold mb-3 text-black">
                  Required Features:
                </h2>
                <div className="flex flex-wrap gap-2">
                  {business.requirements.map((req, i) => (
                    <span
                      key={i}
                      className="px-4 py-1 bg-[#432ad5]/5 text-[#432ad5] border border-[#432ad5]/10 rounded-full text-sm font-medium"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {business.planned_pages?.length && (
              <div>
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

        {/* SIDEBAR */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="font-semibold mb-4 text-black">Business Owner</h3>
            <p className="font-medium mb-4 text-black">
              {business.contact_name || "Direct Contact"}
            </p>
            <hr className="mb-4" />
            <div className="space-y-3 text-sm text-slate-700">
              {business.contact_email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} /> {business.contact_email}
                </div>
              )}
              {business.contact_phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} /> {business.contact_phone}
                </div>
              )}
              {business.website && (
                <div className="flex items-center gap-2">
                  <Globe size={16} />{" "}
                  <a
                    href={business.website}
                    target="_blank"
                    className="hover:underline text-[#432ad5]"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-6 rounded-full bg-black text-white py-4 font-bold hover:bg-slate-800 transition-all shadow-lg"
            >
              Contact Business
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
