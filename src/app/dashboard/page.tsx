"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";

export default function DashboardPage() {
  const {
    user,
    businessProfile,
    developerProfile,
    createBusinessProfile,
    createDeveloperProfile,
    updateBusinessProfile,
    updateDeveloperProfile,
  } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});

  if (!user) return <p>Loading...</p>;

  const openModal = (initialData: any = {}) => {
    setFormData(initialData);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.role === "business") {
      if (businessProfile) {
        await updateBusinessProfile(formData);
      } else {
        await createBusinessProfile(formData);
      }
    } else if (user.role === "developer") {
      if (developerProfile) {
        await updateDeveloperProfile(formData);
      } else {
        await createDeveloperProfile(formData);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Basic User Info */}
      <section className="p-6 bg-white shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => openModal(user)}
            className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Pencil className="w-4 h-4" />
            Update Info
          </button>
          <button
            className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => alert("Delete account logic here")}
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>
      </section>

      {/* Developer Dashboard */}
      {user.role === "developer" && (
        <section className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Developer Profile</h2>
          {developerProfile ? (
            <div>
              <p>
                <strong>Location:</strong> {developerProfile.location}
              </p>
              <p>
                <strong>Portfolio:</strong> {developerProfile.portfolio}
              </p>
              <p>
                <strong>GitHub:</strong> {developerProfile.github}
              </p>
              <p>
                <strong>Skills:</strong> {developerProfile.skills}
              </p>
              <p>
                <strong>Experience:</strong> {developerProfile.experience}
              </p>
              <p>
                <strong>Availability:</strong> {developerProfile.availability}
              </p>
              <p>
                <strong>Interested In:</strong> {developerProfile.interested_in}
              </p>
              <button
                onClick={() => openModal(developerProfile)}
                className="mt-3 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <button
              onClick={() => openModal({})}
              className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <PlusCircle className="w-4 h-4" />
              Create Developer Profile
            </button>
          )}
        </section>
      )}

      {/* Business Dashboard */}
      {user.role === "business" && (
        <section className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Business Profile</h2>
          {businessProfile ? (
            <div>
              <p>
                <strong>Name:</strong> {businessProfile.business_name}
              </p>
              <p>
                <strong>Type:</strong> {businessProfile.business_type}
              </p>
              <p>
                <strong>Location:</strong> {businessProfile.location}
              </p>
              <p>
                <strong>Phone:</strong> {businessProfile.phone}
              </p>
              <p>
                <strong>Website:</strong> {businessProfile.website}
              </p>
              <p>
                <strong>Description:</strong> {businessProfile.description}
              </p>
              <p>
                <strong>Offering:</strong> {businessProfile.offering}
              </p>
              <button
                onClick={() => openModal(businessProfile)}
                className="mt-3 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Business
              </button>
            </div>
          ) : (
            <button
              onClick={() => openModal({})}
              className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <PlusCircle className="w-4 h-4" />
              Add Business
            </button>
          )}
        </section>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-2">
              {businessProfile || developerProfile
                ? "Edit Profile"
                : "Create Profile"}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Fill out the fields below.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {user.role === "business" ? (
                <>
                  <input
                    placeholder="Business Name"
                    className="w-full border rounded px-2 py-1"
                    value={formData.business_name || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        business_name: e.target.value,
                      })
                    }
                  />
                  <input
                    placeholder="Business Type"
                    className="w-full border rounded px-2 py-1"
                    value={formData.business_type || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        business_type: e.target.value,
                      })
                    }
                  />
                  <input
                    placeholder="Location"
                    className="w-full border rounded px-2 py-1"
                    value={formData.location || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                  <input
                    placeholder="Phone"
                    className="w-full border rounded px-2 py-1"
                    value={formData.phone || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                  <input
                    placeholder="Website"
                    className="w-full border rounded px-2 py-1"
                    value={formData.website || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                  />
                  <textarea
                    placeholder="Description"
                    className="w-full border rounded px-2 py-1"
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                  <textarea
                    placeholder="Offering"
                    className="w-full border rounded px-2 py-1"
                    value={formData.offering || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, offering: e.target.value })
                    }
                  />
                </>
              ) : (
                <>
                  <input
                    placeholder="Location"
                    className="w-full border rounded px-2 py-1"
                    value={formData.location || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                  <input
                    placeholder="Portfolio"
                    className="w-full border rounded px-2 py-1"
                    value={formData.portfolio || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, portfolio: e.target.value })
                    }
                  />
                  <input
                    placeholder="GitHub"
                    className="w-full border rounded px-2 py-1"
                    value={formData.github || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, github: e.target.value })
                    }
                  />
                  <textarea
                    placeholder="Skills"
                    className="w-full border rounded px-2 py-1"
                    value={formData.skills || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, skills: e.target.value })
                    }
                  />
                  <input
                    placeholder="Experience"
                    className="w-full border rounded px-2 py-1"
                    value={formData.experience || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                  />
                  <input
                    placeholder="Availability"
                    className="w-full border rounded px-2 py-1"
                    value={formData.availability || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, availability: e.target.value })
                    }
                  />
                  <textarea
                    placeholder="Interested In"
                    className="w-full border rounded px-2 py-1"
                    value={formData.interested_in || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        interested_in: e.target.value,
                      })
                    }
                  />
                </>
              )}
              <button
                type="submit"
                className="w-full rounded bg-indigo-600 px-4 py-2 text-white"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
