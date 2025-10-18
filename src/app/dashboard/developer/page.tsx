// src/app/dashboard/developer/page.tsx
import { redirect } from "next/navigation";
import { getUserProfile } from "@/app/auth/actions";
import { DeveloperProfileForm } from "@/components/forms/Form";

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

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Developer Profile
        </h2>
        <DeveloperProfileForm initialProfile={developerProfile} />
      </div>
    </div>
  );
}