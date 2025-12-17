import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role to ensure it bypasses RLS for the public list
    );

    // Join with the users table to get the name and avatar
    const { data, error } = await supabase
      .from("developer_profiles")
      .select(
        `
        user_id,
        location,
        bio,
        skills,
        portfolio,
        github,
        users (
          full_name,
          avatar_url,
          professional_title
        )
      `
      )
      .eq("is_listed", true);

    if (error) throw error;

    // Transform the data so the frontend gets what it expects
    const formattedDevs = data.map((dev: any) => ({
      id: dev.user_id,
      full_name: dev.users?.full_name || "Anonymous Developer",
      professional_title: dev.users?.professional_title || "Web Developer",
      location: dev.location || "Remote",
      // Convert your text 'skills' into an array for the .map() function
      skills: dev.skills
        ? dev.skills.split(",").map((s: string) => s.trim())
        : [],
      bio: dev.bio || "No bio provided.",
      avatar_url: dev.users?.avatar_url,
    }));

    return NextResponse.json(formattedDevs);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
