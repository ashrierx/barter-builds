// src/app/dashboard/business/page.tsx
import { redirect } from "next/navigation";
import { getUserProfile } from "@/app/auth/actions";

export default async function BusinessDashboard() {
  const { user, businessProfile } = await getUserProfile();

  if (!user) {
    redirect("/");
  }

  if (user.role !== "business") {
    redirect("/dashboard");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Business Dashboard
      </h1>

      {businessProfile ? (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {businessProfile.business_name}
          </h2>
          <p className="text-gray-600 mb-2">
            <strong>Type:</strong> {businessProfile.business_type}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Location:</strong> {businessProfile.location}
          </p>
          <p className="text-gray-600">
            <strong>Description:</strong> {businessProfile.description}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">
            Complete your business profile to get started.
          </p>
        </div>
      )}
    </div>
  );
}
