import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { id } = params;

    const { data: business, error } = await supabase
      .from("business_profiles")
      .select("*")
      .eq("user_id", id)
      .eq("is_listed", true)
      .single();

    if (error) {
      console.error("Error fetching business:", error);
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    if (!business) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(business);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}