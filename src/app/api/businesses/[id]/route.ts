// src/app/api/businesses/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Business ID is required" },
        { status: 400 }
      );
    }

    const { data: business, error } = await supabase
      .from("business_profiles")
      .select(
        `
        user_id,
        business_name,
        business_type,
        location,
        phone,
        website,
        description,
        offering,
        is_listed,
        created_at,
        updated_at
      `
      )
      .eq("user_id", id)
      .eq("is_listed", true)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Business not found" },
          { status: 404 }
        );
      }
      console.error("Error fetching business:", error);
      return NextResponse.json(
        { error: "Failed to fetch business" },
        { status: 500 }
      );
    }

    return NextResponse.json(business);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
