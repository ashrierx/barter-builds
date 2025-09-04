// src/app/dashboard/developer/page.tsx
import { redirect } from "next/navigation";
import { getUserProfile } from "@/app/auth/actions";

export default async function DeveloperDashboard() {
  const { user, developerProfile } = await getUserProfile();

  if (!user) {
    redirect("/");
  }

  if (user.role !== "developer") {
    redirect("/dashboard");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Developer Dashboard
      </h1>

      {developerProfile ? (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Developer Profile
          </h2>
          {developerProfile.location && (
            <p className="text-gray-600 mb-2">
              <strong>Location:</strong> {developerProfile.location}
            </p>
          )}
          {developerProfile.skills && (
            <p className="text-gray-600 mb-2">
              <strong>Skills:</strong> {developerProfile.skills}
            </p>
          )}
          {developerProfile.experience && (
            <p className="text-gray-600">
              <strong>Experience:</strong> {developerProfile.experience}
            </p>
          )}
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">
            Complete your developer profile to get started.
          </p>
        </div>
      )}
    </div>
  );
}
