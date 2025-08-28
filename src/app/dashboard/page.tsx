"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext"; 
import { Pencil, Trash2 } from "lucide-react";

export default function DashboardPage() {
  const { user, businessProfile, developerProfile } = useAuth();

  if (!user) return <p>Loading...</p>;

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
          <Link
            href="/account/update" // 🔧 you'll build this
            className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Pencil className="w-4 h-4" />
            Update Info
          </Link>
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
          <h2 className="text-xl font-semibold mb-4">Saved Businesses</h2>
          {developerProfile?.interested_in ? (
            <ul className="list-disc pl-5 space-y-1">
              {developerProfile.interested_in.split(",").map((biz, i) => (
                <li key={i}>{biz.trim()}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              You haven’t saved any businesses yet.
            </p>
          )}
        </section>
      )}

      {/* Business Dashboard */}
      {user.role === "business" && (
        <section className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Application Status</h2>
          {businessProfile?.offering ? (
            <div>
              <p>
                <strong>Offering:</strong> {businessProfile.offering}
              </p>
              <p>
                <strong>Description:</strong> {businessProfile.description}
              </p>
              <Link
                href="/business/update-application"
                className="inline-block mt-3 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update Application
              </Link>
            </div>
          ) : (
            <p className="text-gray-600">
              You haven’t submitted an application yet.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
