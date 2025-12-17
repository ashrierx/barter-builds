// src/components/dashboard/ProfileForms.tsx
"use client";

import { useState } from "react";
import {
  updateDeveloperProfile,
  updateBusinessProfile,
} from "@/app/auth/actions";
import {
  AlertCircle,
  Building2,
  Calendar,
  Camera,
  Github,
  Globe,
  Heart,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";

// ============================================================================
// TYPE DEFINITIONS BASED ON TABLE SCHEMAS
// ============================================================================

// Based on developer_profiles table
type DeveloperProfile = {
  user_id: string;
  location: string | null;
  portfolio: string | null;
  github: string | null;
  skills: string | null;
  experience: string | null;
  availability: string | null;
  interested_in: string | null;
  is_listed: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

// Based on business_profiles table
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

// ============================================================================
// DEVELOPER PROFILE FORM COMPONENT
// ============================================================================

type DeveloperProfileFormProps = {
  initialProfile: DeveloperProfile | null;
};

export function DeveloperProfileForm({
  initialProfile,
}: DeveloperProfileFormProps) {
  const [isEditing, setIsEditing] = useState(!initialProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    location: initialProfile?.location || "",
    portfolio: initialProfile?.portfolio || "",
    github: initialProfile?.github || "",
    skills: initialProfile?.skills || "",
    experience: initialProfile?.experience || "",
    availability: initialProfile?.availability || "",
    interested_in: initialProfile?.interested_in || "",
    is_listed: initialProfile?.is_listed ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const result = await updateDeveloperProfile(formData);

      if (result.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to update profile",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (initialProfile) {
      setFormData({
        location: initialProfile.location || "",
        portfolio: initialProfile.portfolio || "",
        github: initialProfile.github || "",
        skills: initialProfile.skills || "",
        experience: initialProfile.experience || "",
        availability: initialProfile.availability || "",
        interested_in: initialProfile.interested_in || "",
        is_listed: initialProfile.is_listed ?? true,
      });
      setIsEditing(false);
      setMessage(null);
    }
  };

  // View Mode
  if (!isEditing && initialProfile) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Profile Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#432ad5] shadow-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Location
              </p>
              <p className="text-sm font-semibold text-slate-900">
                {formData.location || "Not specified"}
              </p>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#432ad5] shadow-sm">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Availability
              </p>
              <p className="text-sm font-semibold text-slate-900">
                {formData.availability || "Not specified"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-6">
          {[
            {
              icon: Globe,
              label: "Portfolio",
              value: formData.portfolio,
              isLink: true,
            },
            {
              icon: Github,
              label: "GitHub",
              value: formData.github,
              isLink: true,
            },
            { icon: Zap, label: "Technical Skills", value: formData.skills },
            {
              icon: ShieldCheck,
              label: "Experience",
              value: formData.experience,
            },
            {
              icon: Heart,
              label: "Interested In",
              value: formData.interested_in,
            },
          ].map(
            (item, i) =>
              item.value && (
                <div key={i} className="group transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="w-4 h-4 text-slate-400" />
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {item.label}
                    </h3>
                  </div>
                  {item.isLink ? (
                    <a
                      href={item.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#432ad5] font-medium hover:underline break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap bg-white border border-slate-100 p-4 rounded-2xl shadow-sm italic">
                      &quot;{item.value}&quot;
                    </p>
                  )}
                </div>
              )
          )}
        </div>

        {/* Visibility Status */}
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 ${
            formData.is_listed
              ? "bg-green-50 border-green-100 text-green-700"
              : "bg-slate-100 border-slate-200 text-slate-500"
          }`}
        >
          {formData.is_listed ? (
            <ShieldCheck className="w-5 h-5" />
          ) : (
            <ShieldAlert className="w-5 h-5" />
          )}
          <span className="text-sm font-bold uppercase tracking-tight">
            {formData.is_listed
              ? "Public Profile - Visible to Businesses"
              : "Private Profile - Hidden from Directory"}
          </span>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="w-full btn-primary"
        >
          Edit Profile
        </button>
      </div>
    );
  }

  // Edit Mode
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 animate-in fade-in duration-500"
    >
      {message && (
        <div
          className={`p-4 rounded-2xl text-sm font-bold flex items-center gap-3 ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full text-gray-500 bg-slate-50 border-none rounded-2xl px-5 py-3 focus:bg-white focus:ring-4 focus:ring-[#432ad5]/10 transition-all"
            placeholder="San Francisco, CA or Remote"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">
            Availability
          </label>
          <input
            type="text"
            value={formData.availability}
            onChange={(e) =>
              setFormData({ ...formData, availability: e.target.value })
            }
            className="w-full text-gray-500 bg-slate-50 border-none rounded-2xl px-5 py-3 focus:bg-white focus:ring-4 focus:ring-[#432ad5]/10 transition-all"
            placeholder="e.g. 20hrs/week"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase ml-1">
          Portfolio & GitHub
        </label>
        <div className="space-y-3">
          <input
            type="url"
            value={formData.portfolio}
            onChange={(e) =>
              setFormData({ ...formData, portfolio: e.target.value })
            }
            className="w-full text-gray-500 bg-slate-50 border-none rounded-2xl px-5 py-3 focus:bg-white focus:ring-4 focus:ring-[#432ad5]/10 transition-all"
            placeholder="https://portfolio.com"
          />
          <input
            type="url"
            value={formData.github}
            onChange={(e) =>
              setFormData({ ...formData, github: e.target.value })
            }
            className="w-full text-gray-500 bg-slate-50 border-none rounded-2xl px-5 py-3 focus:bg-white focus:ring-4 focus:ring-[#432ad5]/10 transition-all"
            placeholder="https://github.com/user"
          />
        </div>
      </div>

      <div className="space-y-6">
        {[
          {
            id: "skills",
            label: "Technical Skills",
            placeholder: "React, Node.js, etc.",
            rows: 3,
          },
          {
            id: "experience",
            label: "Work Background",
            placeholder: "Notable projects...",
            rows: 5,
          },
          {
            id: "interested_in",
            label: "What kind of barters interest you?",
            placeholder: "I am looking for...",
            rows: 4,
          },
        ].map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">
              {field.label}
            </label>
            <textarea
              value={formData[field.id as keyof typeof formData] as string}
              onChange={(e) =>
                setFormData({ ...formData, [field.id]: e.target.value })
              }
              rows={field.rows}
              className="w-full text-gray-500 bg-slate-50 border-none rounded-2xl px-5 py-4 focus:bg-white focus:ring-4 focus:ring-[#432ad5]/10 transition-all"
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>

      <div className="py-3 px-6 bg-[#432ad5]/5 rounded-3xl border border-[#432ad5]/10 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-900">Profile Visibility</p>
          <p className="text-xs text-slate-500">
            Allow businesses to find you in the directory.
          </p>
        </div>
        <input
          type="checkbox"
          checked={formData.is_listed}
          onChange={(e) =>
            setFormData({ ...formData, is_listed: e.target.checked })
          }
          className="w-6 h-6 rounded-lg border-slate-300 text-[#432ad5] focus:ring-[#432ad5]"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSaving}
          className="flex-1 btn-primary py-4"
        >
          {isSaving ? "Saving..." : "Save Profile"}
        </button>
        {initialProfile && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-8 py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

// ============================================================================
// BUSINESS PROFILE FORM COMPONENT
// ============================================================================

type BusinessProfileFormProps = {
  initialProfile: BusinessProfile | null;
};

// Pre-defined requirement options
const REQUIREMENT_OPTIONS = [
  "Contact Form",
  "Photo Gallery",
  "Online Ordering",
  "One Page Design",
  "Social Media Integration",
  "Blog",
  "E-commerce",
  "Member Portal",
  "Appointment Booking",
  "Email Newsletter",
  "Search Functionality",
  "Multi-language Support",
];

// Pre-defined page options
const PAGE_OPTIONS = [
  "Home",
  "About",
  "Services",
  "Products",
  "Portfolio",
  "Blog",
  "Contact",
  "FAQ",
  "Team",
  "Testimonials",
  "Pricing",
  "Careers",
];

export function BusinessProfileForm({
  initialProfile,
}: BusinessProfileFormProps) {
  const [isEditing, setIsEditing] = useState(!initialProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    business_name: initialProfile?.business_name || "",
    business_type: initialProfile?.business_type || "",
    location: initialProfile?.location || "",
    phone: initialProfile?.phone || "",
    website: initialProfile?.website || "",
    description: initialProfile?.description || "",
    offering: initialProfile?.offering || "",
    is_listed: initialProfile?.is_listed ?? true,
    requirements: initialProfile?.requirements || [],
    cover_photo: initialProfile?.cover_photo || "",
    priority_level: initialProfile?.priority_level || "medium",
    contact_name: initialProfile?.contact_name || "",
    contact_phone: initialProfile?.contact_phone || "",
    contact_email: initialProfile?.contact_email || "",
    planned_pages: initialProfile?.planned_pages || [],
  });

  const [customRequirement, setCustomRequirement] = useState("");
  const [customPage, setCustomPage] = useState("");
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(
    initialProfile?.cover_photo || null
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      // Handle cover photo upload if there's a new file
      let coverPhotoUrl = formData.cover_photo;
      if (coverPhotoFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", coverPhotoFile);

        // IMPORTANT: The fetch to "/api/upload" must be correctly implemented on your backend
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formDataUpload,
        });

        if (uploadRes.ok) {
          const { url } = await uploadRes.json();
          coverPhotoUrl = url;
        } else {
          // Handle upload error without crashing the save process, perhaps
          console.error("Cover photo upload failed:", await uploadRes.text());
          setMessage({
            type: "error",
            text: "Failed to upload cover photo. Saving without it.",
          });
          // You might want to throw an error here to stop saving if the photo is critical
        }
      }

      const result = await updateBusinessProfile({
        ...formData,
        cover_photo: coverPhotoUrl,
      });

      if (result.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);
        // Refresh the page to show updated data
        // window.location.reload();
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to update profile",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage({
        type: "error",
        text: "An unexpected error occurred during profile save.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (initialProfile) {
      // Reset form data to initial profile values
      setFormData({
        business_name: initialProfile.business_name || "",
        business_type: initialProfile.business_type || "",
        location: initialProfile.location || "",
        phone: initialProfile.phone || "",
        website: initialProfile.website || "",
        description: initialProfile.description || "",
        offering: initialProfile.offering || "",
        is_listed: initialProfile.is_listed ?? true,
        requirements: initialProfile.requirements || [],
        cover_photo: initialProfile.cover_photo || "",
        priority_level: initialProfile.priority_level || "medium",
        contact_name: initialProfile.contact_name || "",
        contact_phone: initialProfile.contact_phone || "",
        contact_email: initialProfile.contact_email || "",
        planned_pages: initialProfile.planned_pages || [],
      });
      setCoverPhotoFile(null); // Clear pending upload file
      setCoverPhotoPreview(initialProfile.cover_photo || null); // Reset preview
      setIsEditing(false);
      setMessage(null);
    }
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setMessage({
        type: "error",
        text: "Cover photo must be under 10MB.",
      });
      return;
    }

    setCoverPhotoFile(file);
    setCoverPhotoPreview(URL.createObjectURL(file));
  };

  const toggleRequirement = (req: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.includes(req)
        ? prev.requirements.filter((r) => r !== req)
        : [...prev.requirements, req],
    }));
  };

  const addCustomRequirement = () => {
    if (
      customRequirement.trim() &&
      !formData.requirements.includes(customRequirement.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, customRequirement.trim()],
      }));
      setCustomRequirement("");
    }
  };

  const removeRequirement = (req: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((r) => r !== req),
    }));
  };

  const togglePage = (page: string) => {
    setFormData((prev) => ({
      ...prev,
      planned_pages: prev.planned_pages.includes(page)
        ? prev.planned_pages.filter((p) => p !== page)
        : [...prev.planned_pages, page],
    }));
  };

  const addCustomPage = () => {
    if (
      customPage.trim() &&
      !formData.planned_pages.includes(customPage.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        planned_pages: [...prev.planned_pages, customPage.trim()],
      }));
      setCustomPage("");
    }
  };

  const removePage = (page: string) => {
    setFormData((prev) => ({
      ...prev,
      planned_pages: prev.planned_pages.filter((p) => p !== page),
    }));
  };

  // View Mode
  if (!isEditing && initialProfile) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Premium Cover Photo */}
        {coverPhotoPreview && (
          <div className="relative w-full h-80 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#432ad5]/10 border border-slate-100">
            <Image
              src={coverPhotoPreview}
              alt="Business cover"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h2 className="text-3xl font-black text-white tracking-tighter drop-shadow-md">
                {formData.business_name}
              </h2>
            </div>
          </div>
        )}

        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-xl shadow-slate-200/50">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Business Identity */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
                  Business Identity
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      icon: Building2,
                      label: "Type",
                      value: formData.business_type,
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: formData.location,
                    },
                    {
                      icon: Globe,
                      label: "Website",
                      value: formData.website,
                      isLink: true,
                    },
                  ].map(
                    (item, i) =>
                      item.value && (
                        <div
                          key={i}
                          className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100"
                        >
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#432ad5] shadow-sm">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              {item.label}
                            </p>
                            {item.isLink ? (
                              <a
                                href={item.value}
                                target="_blank"
                                className="text-sm font-bold text-[#432ad5] truncate block hover:underline"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-sm font-bold text-slate-900 truncate">
                                {item.value}
                              </p>
                            )}
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>

              {/* Project Urgency */}
              {formData.priority_level && (
                <div
                  className={`p-6 rounded-3xl border flex items-center justify-between ${
                    formData.priority_level === "critical"
                      ? "bg-red-50 border-red-100 text-red-700"
                      : formData.priority_level === "high"
                      ? "bg-orange-50 border-orange-100 text-orange-700"
                      : "bg-[#432ad5]/5 border-[#432ad5]/10 text-[#432ad5]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-black uppercase tracking-tight">
                      Project Priority: {formData.priority_level}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Project Scope */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                  Requirements
                </h3>
                <div className="flex flex-wrap gap-2">
                  {formData.requirements.map((req) => (
                    <span
                      key={req}
                      className="px-4 py-2 bg-[#432ad5] text-white rounded-xl text-xs font-bold shadow-sm shadow-[#432ad5]/20"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                  Planned Pages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {formData.planned_pages.map((page) => (
                    <span
                      key={page}
                      className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold border border-slate-200"
                    >
                      {page}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Deep Details */}
          <div className="mt-12 pt-12 border-t border-slate-100 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                  The Mission
                </h3>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-[2rem] italic font-medium">
                &quot;{formData.description}&quot;
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                  The Barter Offer
                </h3>
                <p className="text-[#432ad5] leading-relaxed bg-[#432ad5]/5 p-6 rounded-[2rem] font-bold border border-[#432ad5]/10">
                  {formData.offering}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="w-full btn-primary py-5 text-lg"
        >
          Edit Business Profile
        </button>
      </div>
    );
  }

  // Edit Mode
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500"
    >
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-xl shadow-slate-200/50">
        {/* Visual Identity Section */}
        <div className="mb-12">
          <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-6">
            Visual Identity
          </h3>
          <div className="relative group">
            {coverPhotoPreview ? (
              <div className="relative h-64 w-full rounded-3xl overflow-hidden mb-4">
                <Image
                  src={coverPhotoPreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => {
                    setCoverPhotoPreview(null);
                    setFormData({ ...formData, cover_photo: "" });
                  }}
                  className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-2xl shadow-xl hover:scale-110 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="h-48 w-full rounded-3xl border-4 border-dashed border-slate-100 bg-slate-50 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors mb-4">
                <Camera className="w-10 h-10 mb-2 opacity-20" />
                <p className="text-sm font-bold">Upload Cover Photo</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverPhotoChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-sm file:font-bold file:bg-[#432ad5]/10 file:text-[#432ad5] hover:file:bg-[#432ad5]/20 cursor-pointer"
            />
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              General Info
            </h4>
            {[
              {
                id: "business_name",
                label: "Business Name",
                placeholder: "The Bakery Co.",
              },
              {
                id: "business_type",
                label: "Type",
                placeholder: "Retail, Service, etc.",
              },
              { id: "location", label: "Location", placeholder: "City, State" },
              {
                id: "website",
                label: "Website URL",
                placeholder: "https://...",
              },
            ].map((field) => (
              <div key={field.id} className="space-y-2">
                <label className="text-xs font-bold text-slate-500 ml-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  id={field.id}
                  value={formData[field.id as keyof typeof formData] as string}
                  onChange={handleChange}
                  className="w-full text-gray-500 bg-slate-50 border-none rounded-2xl px-5 py-3 focus:bg-white focus:ring-4 focus:ring-[#432ad5]/10 transition-all"
                  placeholder={field.placeholder}
                  required={field.id !== "website"}
                />
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Urgency
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {["low", "medium", "high", "critical"].map((level) => (
                <label
                  key={level}
                  className={`flex items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.priority_level === level
                      ? "bg-[#432ad5] border-[#432ad5] text-white shadow-lg"
                      : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="priority_level"
                    value={level}
                    checked={formData.priority_level === level}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="text-xs font-bold uppercase tracking-tighter">
                    {level}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Tag Selection */}
        <div className="space-y-8 mb-12">
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Project Requirements
            </label>
            <div className="flex flex-wrap gap-2">
              {REQUIREMENT_OPTIONS.map((req) => (
                <button
                  key={req}
                  type="button"
                  onClick={() => toggleRequirement(req)}
                  className={`px-4 py-2 rounded-xl text-xs shadow-sm font-bold transition-all ${
                    formData.requirements.includes(req)
                      ? "bg-[#432ad5] text-white "
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {req}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Planned Pages Selection */}
        <div className="space-y-4 mb-12">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Planned Pages
          </label>
          <div className="flex flex-wrap gap-2 mb-4">
            {PAGE_OPTIONS.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => togglePage(page)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  formData.planned_pages.includes(page)
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Custom Page Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={customPage}
              onChange={(e) => setCustomPage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomPage();
                }
              }}
              className="flex-1 text-slate-500 bg-slate-50 border-none rounded-2xl px-5 py-3 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              placeholder="Add a custom page (e.g. Booking System)"
            />
            <button
              type="button"
              onClick={addCustomPage}
              className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              Add
            </button>
          </div>
        </div>

        {/* Description Area */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              The Mission
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full text-gray-500 bg-slate-50 border-none rounded-3xl px-6 py-5 focus:bg-white focus:ring-4 focus:ring-[#432ad5]/10 transition-all"
              placeholder="Tell us your story..."
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              What you&apos;re giving in exchange
            </label>
            <textarea
              id="offering"
              value={formData.offering}
              onChange={handleChange}
              rows={4}
              className="w-full bg-[#432ad5]/5 border-none rounded-3xl px-6 py-5 text-[#432ad5] font-bold focus:bg-white focus:ring-4 focus:ring-[#432ad5]/10 transition-all"
              placeholder="e.g., Unlimited coffee for a year, Free landscaping..."
              required
            />
          </div>
        </div>

        {/* Visibility Toggle */}
        <div className="mt-10 p-8 bg-slate-50 rounded-[2rem] flex items-center justify-between text-white">
          <div>
            <p className="font-bold tracking-tight text-slate-500">
              Ready for Developers?
            </p>
            <p className="text-xs text-slate-400">
              Toggle visibility in the public business directory.
            </p>
          </div>
          <input
            type="checkbox"
            checked={formData.is_listed}
            onChange={(e) =>
              setFormData({ ...formData, is_listed: e.target.checked })
            }
            className="w-8 h-8 rounded-xl bg-white/10 border-white/20 text-[#7864ff] focus:ring-[#7864ff]"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSaving}
          className="flex-1 btn-primary py-5 shadow-2xl shadow-[#432ad5]/40"
        >
          {isSaving ? "Saving..." : "Publish Profile"}
        </button>
        {initialProfile && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-10 py-5 bg-slate-100 text-slate-600 rounded-3xl font-black hover:bg-slate-200 transition-all uppercase text-xs tracking-widest"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
