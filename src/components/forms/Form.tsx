// src/components/dashboard/ProfileForms.tsx
"use client";

import { useState } from "react";
import {
  updateDeveloperProfile,
  updateBusinessProfile,
} from "@/app/auth/actions";
import { X } from "lucide-react";

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
      <div>
        <div className="space-y-4 mb-6">
          {formData.location && (
            <div>
              <strong className="text-gray-700">Location:</strong>
              <p className="text-gray-600 mt-1">{formData.location}</p>
            </div>
          )}
          {formData.portfolio && (
            <div>
              <strong className="text-gray-700">Portfolio:</strong>
              <p className="text-gray-600 mt-1">
                <a
                  href={formData.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {formData.portfolio}
                </a>
              </p>
            </div>
          )}
          {formData.github && (
            <div>
              <strong className="text-gray-700">GitHub:</strong>
              <p className="text-gray-600 mt-1">
                <a
                  href={formData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {formData.github}
                </a>
              </p>
            </div>
          )}
          {formData.skills && (
            <div>
              <strong className="text-gray-700">Skills:</strong>
              <p className="text-gray-600 mt-1 whitespace-pre-wrap">
                {formData.skills}
              </p>
            </div>
          )}
          {formData.experience && (
            <div>
              <strong className="text-gray-700">Experience:</strong>
              <p className="text-gray-600 mt-1 whitespace-pre-wrap">
                {formData.experience}
              </p>
            </div>
          )}
          {formData.availability && (
            <div>
              <strong className="text-gray-700">Availability:</strong>
              <p className="text-gray-600 mt-1">{formData.availability}</p>
            </div>
          )}
          {formData.interested_in && (
            <div>
              <strong className="text-gray-700">Interested In:</strong>
              <p className="text-gray-600 mt-1 whitespace-pre-wrap">
                {formData.interested_in}
              </p>
            </div>
          )}
          <div>
            <strong className="text-gray-700">Profile Visibility:</strong>
            <p className="text-gray-600 mt-1">
              {formData.is_listed
                ? "✓ Public (Visible to businesses)"
                : "✗ Private (Hidden from businesses)"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-primary text-white px-4 py-2 rounded-md  transition-colors"
        >
          Edit Profile
        </button>
      </div>
    );
  }

  // Edit Mode
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-md ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., San Francisco, CA or Remote"
        />
      </div>

      <div>
        <label
          htmlFor="portfolio"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Portfolio URL
        </label>
        <input
          type="url"
          id="portfolio"
          value={formData.portfolio}
          onChange={(e) =>
            setFormData({ ...formData, portfolio: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://yourportfolio.com"
        />
      </div>

      <div>
        <label
          htmlFor="github"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          GitHub URL
        </label>
        <input
          type="url"
          id="github"
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://github.com/yourusername"
        />
      </div>

      <div>
        <label
          htmlFor="skills"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Skills
        </label>
        <textarea
          id="skills"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., React, Node.js, TypeScript, PostgreSQL, AWS"
        />
        <p className="mt-1 text-sm text-gray-500">
          List your technical skills and expertise
        </p>
      </div>

      <div>
        <label
          htmlFor="experience"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Experience
        </label>
        <textarea
          id="experience"
          value={formData.experience}
          onChange={(e) =>
            setFormData({ ...formData, experience: e.target.value })
          }
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe your work experience, notable projects, and achievements"
        />
        <p className="mt-1 text-sm text-gray-500">
          Share your professional background and key accomplishments
        </p>
      </div>

      <div>
        <label
          htmlFor="availability"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Availability
        </label>
        <input
          type="text"
          id="availability"
          value={formData.availability}
          onChange={(e) =>
            setFormData({ ...formData, availability: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Available immediately, Part-time (20hrs/week), Weekends only"
        />
      </div>

      <div>
        <label
          htmlFor="interested_in"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Interested In
        </label>
        <textarea
          id="interested_in"
          value={formData.interested_in}
          onChange={(e) =>
            setFormData({ ...formData, interested_in: e.target.value })
          }
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="What types of projects or collaborations are you interested in?"
        />
        <p className="mt-1 text-sm text-gray-500">
          Describe the kind of work or partnerships you&apos;re seeking
        </p>
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            id="is_listed"
            checked={formData.is_listed}
            onChange={(e) =>
              setFormData({ ...formData, is_listed: e.target.checked })
            }
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3">
          <label
            htmlFor="is_listed"
            className="text-sm font-medium text-gray-700"
          >
            Make my profile visible to businesses
          </label>
          <p className="text-sm text-gray-500">
            Allow businesses to discover and contact you for opportunities
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <button
          type="submit"
          disabled={isSaving}
          className="btn btn-primary text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSaving ? "Saving..." : "Save Profile"}
        </button>
        {initialProfile && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSaving}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50 transition-colors"
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

  // View Mode (Your existing, correct View Mode is kept as is)
  if (!isEditing && initialProfile) {
    return (
      <div className="max-w-5xl mx-auto">
        {/* Cover Photo */}
        {coverPhotoPreview && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={coverPhotoPreview}
              alt="Business cover"
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Business Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Business Information
                </h3>
                <div className="space-y-4">
                  {formData.business_name && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Business Name
                      </label>
                      <p className="text-gray-900 mt-1">
                        {formData.business_name}
                      </p>
                    </div>
                  )}
                  {formData.business_type && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Business Type
                      </label>
                      <p className="text-gray-900 mt-1">
                        {formData.business_type}
                      </p>
                    </div>
                  )}
                  {formData.location && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Location
                      </label>
                      <p className="text-gray-900 mt-1">{formData.location}</p>
                    </div>
                  )}
                  {formData.website && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Website
                      </label>
                      <p className="mt-1">
                        <a
                          href={formData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700 hover:underline"
                        >
                          {formData.website}
                        </a>
                      </p>
                    </div>
                  )}
                  {formData.priority_level && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Priority Level
                      </label>
                      <p className="mt-1">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            formData.priority_level === "critical"
                              ? "bg-red-100 text-red-800"
                              : formData.priority_level === "high"
                              ? "bg-orange-100 text-orange-800"
                              : formData.priority_level === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {formData.priority_level.charAt(0).toUpperCase() +
                            formData.priority_level.slice(1)}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {formData.contact_name && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Contact Name
                      </label>
                      <p className="text-gray-900 mt-1">
                        {formData.contact_name}
                      </p>
                    </div>
                  )}
                  {formData.contact_email && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Contact Email
                      </label>
                      <p className="text-gray-900 mt-1">
                        <a
                          href={`mailto:${formData.contact_email}`}
                          className="text-purple-600 hover:text-purple-700 hover:underline"
                        >
                          {formData.contact_email}
                        </a>
                      </p>
                    </div>
                  )}
                  {formData.contact_phone && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Contact Phone
                      </label>
                      <p className="text-gray-900 mt-1">
                        {formData.contact_phone}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Project Details */}
            <div className="space-y-6">
              {formData.requirements.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 block">
                    Requirements
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.requirements.map((req) => (
                      <span
                        key={req}
                        className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {formData.planned_pages.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 block">
                    Planned Pages
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.planned_pages.map((page) => (
                      <span
                        key={page}
                        className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {page}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description & Offering */}
          <div className="space-y-6 border-t pt-6">
            {formData.description && (
              <div>
                <label className="text-sm font-medium text-gray-500 mb-2 block">
                  Business Description
                </label>
                <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                  {formData.description}
                </p>
              </div>
            )}
            {formData.offering && (
              <div>
                <label className="text-sm font-medium text-gray-500 mb-2 block">
                  What We Offer
                </label>
                <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                  {formData.offering}
                </p>
              </div>
            )}
          </div>

          {/* Visibility Status */}
          <div className="mt-6 pt-6 border-t">
            <label className="text-sm font-medium text-gray-500 mb-2 block">
              Profile Visibility
            </label>
            <p className="text-gray-900">
              {formData.is_listed
                ? "✓ Public (Visible to developers)"
                : "✗ Private (Hidden from developers)"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="mt-6 btn btn-primary px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Edit Profile
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        {/* Cover Photo */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Photo
          </label>
          {coverPhotoPreview && (
            <div className="mb-4 rounded-xl overflow-hidden relative">
              <img
                src={coverPhotoPreview}
                alt="Cover preview"
                className="w-full h-64 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setCoverPhotoPreview(null);
                  setCoverPhotoFile(null);
                  setFormData({ ...formData, cover_photo: "" });
                }}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverPhotoChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Upload a cover photo for your business profile
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Left Column - Business Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Business Information
            </h3>

            <div>
              <label
                htmlFor="business_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business Name *
              </label>
              <input
                type="text"
                id="business_name"
                value={formData.business_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your business name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="business_type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business Type *
              </label>
              <input
                type="text"
                id="business_type"
                value={formData.business_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Technology, Healthcare, Finance"
                required
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location *
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., New York, NY or Remote-First"
                required
              />
            </div>

            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Website
              </label>
              <input
                type="url"
                id="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://yourcompany.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level *
              </label>
              <div className="space-y-2">
                {["low", "medium", "high", "critical"].map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      name="priority_level"
                      value={level}
                      checked={formData.priority_level === level}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priority_level: e.target.value as Exclude<
                            BusinessProfile["priority_level"],
                            null
                          >,
                        })
                      }
                    />
                    <span className="ml-3 text-gray-700 capitalize">
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Contact Information
            </h3>

            <div>
              <label
                htmlFor="contact_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Name
              </label>
              <input
                type="text"
                id="contact_name"
                value={formData.contact_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Primary contact person"
              />
            </div>

            <div>
              <label
                htmlFor="contact_email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="contact@yourcompany.com"
              />
            </div>

            <div>
              <label
                htmlFor="contact_phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Phone
              </label>
              <input
                type="tel"
                id="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Requirements
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {REQUIREMENT_OPTIONS.map((req) => (
              <button
                key={req}
                type="button"
                onClick={() => toggleRequirement(req)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  formData.requirements.includes(req)
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {req}
              </button>
            ))}
          </div>

          {/* Selected Requirements */}
          {formData.requirements.length > 0 && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-2">Selected:</p>
              <div className="flex flex-wrap gap-2">
                {formData.requirements.map((req) => (
                  <span
                    key={req}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                  >
                    {req}
                    <button
                      type="button"
                      onClick={() => removeRequirement(req)}
                      className="hover:text-purple-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add Custom Requirement */}
          <div className="flex gap-2">
            <input
              type="text"
              value={customRequirement}
              onChange={(e) => setCustomRequirement(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (e.preventDefault(), addCustomRequirement())
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Add custom requirement"
            />
            <button
              type="button"
              onClick={addCustomRequirement}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Add
            </button>
          </div>
        </div>

        {/* Planned Pages */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Planned Pages
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {PAGE_OPTIONS.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => togglePage(page)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  formData.planned_pages.includes(page)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Selected Pages */}
          {formData.planned_pages.length > 0 && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-2">Selected:</p>
              <div className="flex flex-wrap gap-2">
                {formData.planned_pages.map((page) => (
                  <span
                    key={page}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {page}
                    <button
                      type="button"
                      onClick={() => removePage(page)}
                      className="hover:text-blue-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add Custom Page */}
          <div className="flex gap-2">
            <input
              type="text"
              value={customPage}
              onChange={(e) => setCustomPage(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addCustomPage())
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Add custom page"
            />
            <button
              type="button"
              onClick={addCustomPage}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Add
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Business Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Tell us about your business, your mission, and what you're looking for"
            required
          />
        </div>

        {/* Offering */}
        <div className="mb-6">
          <label
            htmlFor="offering"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            What We Offer *
          </label>
          <textarea
            id="offering"
            value={formData.offering}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Describe what services, products, or opportunities you offer"
            required
          />
        </div>

        {/* Visibility Toggle */}
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id="is_listed"
              checked={formData.is_listed}
              onChange={(e) =>
                setFormData({ ...formData, is_listed: e.target.checked })
              }
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label
              htmlFor="is_listed"
              className="text-sm font-medium text-gray-700"
            >
              Make my profile visible to developers
            </label>
            <p className="text-sm text-gray-500">
              Allow developers to discover and contact you for opportunities
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? "Saving..." : "Save Profile"}
          </button>
          {initialProfile && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
