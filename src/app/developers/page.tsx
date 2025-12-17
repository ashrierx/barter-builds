"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  MapPin,
  Mail,
  Phone,
  X,
  MessageSquare,
  Copy,
  CheckCircle2,
  Code2,
} from "lucide-react";

type DeveloperProfile = {
  id: string;
  full_name: string;
  professional_title: string;
  location: string;
  skills: string[];
  bio: string;
  avatar_url?: string;
  contact_email?: string;
  contact_phone?: string;
};

export default function BrowseDevelopersPage() {
  const [developers, setDevelopers] = useState<DeveloperProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [selectedDev, setSelectedDev] = useState<DeveloperProfile | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchDevelopers() {
      try {
        const res = await fetch("/api/developers");
        const data = await res.json();
        // Guard against non-array responses
        setDevelopers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDevelopers();
  }, []);

  const copyToClipboard = () => {
    if (!selectedDev) return;
    const skillsList = selectedDev.skills.slice(0, 3).join(", ");
    const message = `Hi ${selectedDev.full_name},\n\nI saw your profile on Barter Builds and was impressed by your work with ${skillsList}. I'm looking for a developer to help with my business project and would love to chat about a skill-based trade. \n\nAre you open to a quick call?`;

    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* --- CONTACT MODAL --- */}
      {selectedDev && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedDev(null)}
          />

          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setSelectedDev(null)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <MessageSquare size={32} />
              </div>

              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                Hire {selectedDev.full_name.split(" ")[0]}
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Reach out to this developer directly. Let them know you found
                them on
                <span className="font-bold text-slate-900">
                  {" "}
                  Barter Builds
                </span>{" "}
                and tell them about the trade you have in mind!
              </p>

              <div className="w-full space-y-3">
                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 text-left mb-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1 text-center">
                    Copy Outreach Template
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
                        <Copy size={14} /> Copy Message
                      </>
                    )}
                  </button>
                </div>

                {selectedDev.contact_email && (
                  <a
                    href={`mailto:${selectedDev.contact_email}`}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all"
                  >
                    <Mail size={18} /> Email Developer
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- PAGE HEADER --- */}
      <div className="bg-[#0a0a0a] pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Meet the <span className="text-blue-500">Builders</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A directory of talented developers ready to trade their skills for
            your services.
          </p>
        </div>
      </div>

      {/* --- DEVELOPER GRID --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {loading ? (
          <div className="flex justify-center items-center py-20 text-slate-400">
            Loading Builders...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developers.map((dev) => (
              <div
                key={dev.id}
                className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0">
                    {dev.avatar_url ? (
                      <img
                        src={dev.avatar_url}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <User size={28} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-tight">
                      {dev.full_name}
                    </h3>
                    <p className="text-blue-600 text-xs font-bold uppercase tracking-wider">
                      {dev.professional_title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-slate-400 text-xs mb-4">
                  <MapPin size={14} /> {dev.location}
                </div>

                <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-1">
                  {dev.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {dev.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedDev(dev)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
                >
                  Contact Developer
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && developers.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem]">
            <Code2 className="mx-auto w-12 h-12 text-slate-300 mb-4" />
            <h3 className="font-bold text-slate-900">
              No developers listed yet
            </h3>
            <p className="text-slate-500 text-sm">
              Be the first to join the directory!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
