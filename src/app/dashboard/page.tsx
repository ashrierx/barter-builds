// src/app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getUserProfile } from "@/app/auth/actions";

export default async function DashboardPage() {
  const { user } = await getUserProfile();

  if (!user) {
    redirect("/");
  }

  // Redirect to role-specific dashboard
  if (user.role === "business") {
    redirect("/dashboard/business");
  } else if (user.role === "developer") {
    redirect("/dashboard/developer");
  }

  return null;
}
