import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: businesses, error } = await supabase
      .from("business_profiles")
      .select("*")
      .eq("is_listed", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching businesses:", error);
      return NextResponse.json(
        { error: "Failed to fetch businesses" },
        { status: 500 }
      );
    }

    return NextResponse.json(businesses || []);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}