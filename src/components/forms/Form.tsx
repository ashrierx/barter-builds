// src/components/dashboard/ProfileForms.tsx
"use client";

import { useState } from "react";
import {
  updateDeveloperProfile,
  updateBusinessProfile,
} from "@/app/auth/actions";

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
  company_name: string | null;
  company_website: string | null;
  industry: string | null;
  company_size: string | null;
  location: string | null;
  description: string | null;
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
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
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
          Describe the kind of work or partnerships you're seeking
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
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
    business_name: initialProfile?.company_name || "",
    business_type: initialProfile?.industry || "",
    location: initialProfile?.location || "",
    phone: "",
    website: initialProfile?.company_website || "",
    description: initialProfile?.description || "",
    offering: "",
    is_listed: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const result = await updateBusinessProfile(formData);

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
        business_name: initialProfile.company_name || "",
        business_type: initialProfile.industry || "",
        location: initialProfile.location || "",
        phone: "",
        website: initialProfile.company_website || "",
        description: initialProfile.description || "",
        offering: "",
        is_listed: true,
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
          {formData.business_name && (
            <div>
              <strong className="text-gray-700">Business Name:</strong>
              <p className="text-gray-600 mt-1">{formData.business_name}</p>
            </div>
          )}
          {formData.website && (
            <div>
              <strong className="text-gray-700">Website:</strong>
              <p className="text-gray-600 mt-1">
                <a
                  href={formData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {formData.website}
                </a>
              </p>
            </div>
          )}
          {formData.business_type && (
            <div>
              <strong className="text-gray-700">Business Type:</strong>
              <p className="text-gray-600 mt-1">{formData.business_type}</p>
            </div>
          )}
          {formData.phone && (
            <div>
              <strong className="text-gray-700">Phone:</strong>
              <p className="text-gray-600 mt-1">{formData.phone}</p>
            </div>
          )}
          {formData.location && (
            <div>
              <strong className="text-gray-700">Location:</strong>
              <p className="text-gray-600 mt-1">{formData.location}</p>
            </div>
          )}
          {formData.description && (
            <div>
              <strong className="text-gray-700">Business Description:</strong>
              <p className="text-gray-600 mt-1 whitespace-pre-wrap">
                {formData.description}
              </p>
            </div>
          )}
          {formData.offering && (
            <div>
              <strong className="text-gray-700">What We Offer:</strong>
              <p className="text-gray-600 mt-1 whitespace-pre-wrap">
                {formData.offering}
              </p>
            </div>
          )}
          <div>
            <strong className="text-gray-700">Profile Visibility:</strong>
            <p className="text-gray-600 mt-1">
              {formData.is_listed
                ? "✓ Public (Visible to developers)"
                : "✗ Private (Hidden from developers)"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
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
          htmlFor="business_name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Business Name *
        </label>
        <input
          type="text"
          id="business_name"
          value={formData.business_name}
          onChange={(e) =>
            setFormData({ ...formData, business_name: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          onChange={(e) =>
            setFormData({ ...formData, business_type: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Technology, Healthcare, Finance, E-commerce"
          required
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="(555) 123-4567"
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
          onChange={(e) =>
            setFormData({ ...formData, website: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://yourcompany.com"
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
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., New York, NY or Remote-First"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Business Description *
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Tell us about your business, your mission, and what you're looking for in a developer"
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          This will be visible to developers browsing opportunities
        </p>
      </div>

      <div>
        <label
          htmlFor="offering"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          What We Offer *
        </label>
        <textarea
          id="offering"
          value={formData.offering}
          onChange={(e) =>
            setFormData({ ...formData, offering: e.target.value })
          }
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe what services, products, or opportunities you offer to developers"
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          Describe the opportunities or services you provide
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
            Make my profile visible to developers
          </label>
          <p className="text-sm text-gray-500">
            Allow developers to discover and contact you for opportunities
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <button
          type="submit"
          disabled={isSaving}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
