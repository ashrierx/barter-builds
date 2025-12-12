// src/app/dashboard/business/page.tsx
import { redirect } from "next/navigation";
import { getUserProfile } from "@/app/auth/actions";
import { BusinessProfileForm } from "@/components/forms/Form";

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

      <div className="bg-white shadow rounded-lg p-6">

        <BusinessProfileForm initialProfile={businessProfile} />
      </div>
    </div>
  );
}