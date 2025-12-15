// src/app/api/business-profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { strictApiRateLimit } from "@/utils/rateLimit";
import { sanitizeInput, isValidUrl } from "@/utils/security";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Missing Supabase configuration" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("business_profiles")
      .select("*")
      .order("business_name", { ascending: true });

    if (error) {
      console.error("Error fetching businesses:", error);
      return NextResponse.json(
        { error: "Failed to fetch businesses" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for write operations
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const rateLimitResult = strictApiRateLimit.check(
      `business-profile-post:${ip}`
    );
    if (rateLimitResult.remaining < 0) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(
              (rateLimitResult.reset - Date.now()) / 1000
            ).toString(),
          },
        }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Missing Supabase configuration" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    // Set the session with the token
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify user is a business
    const { data: userProfile } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (userProfile?.role !== "business") {
      return NextResponse.json(
        { error: "Only business users can create business profiles" },
        { status: 403 }
      );
    }

    const profileData = await request.json();

    // Validate and sanitize input
    const requiredFields = [
      "business_name",
      "business_type",
      "location",
      "description",
      "offering",
    ];
    const missingFields = requiredFields.filter((field) => !profileData[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Sanitize and validate inputs
    const businessName = sanitizeInput(profileData.business_name, 200);
    const businessType = sanitizeInput(profileData.business_type, 100);
    const location = sanitizeInput(profileData.location, 200);
    const description = sanitizeInput(profileData.description, 2000);
    const offering = sanitizeInput(profileData.offering, 2000);
    const phone = profileData.phone
      ? sanitizeInput(profileData.phone, 20)
      : null;
    const website = profileData.website
      ? sanitizeInput(profileData.website, 500)
      : null;
    const contactName = profileData.contact_name
      ? sanitizeInput(profileData.contact_name, 100)
      : null;
    const contactPhone = profileData.contact_phone
      ? sanitizeInput(profileData.contact_phone, 20)
      : null;
    const contactEmail = profileData.contact_email
      ? sanitizeInput(profileData.contact_email, 100)
      : null;
    const coverPhoto = profileData.cover_photo
      ? sanitizeInput(profileData.cover_photo, 500)
      : null;
    const priorityLevel = profileData.priority_level || "medium";
    const requirements = Array.isArray(profileData.requirements)
      ? profileData.requirements
      : [];
    const plannedPages = Array.isArray(profileData.planned_pages)
      ? profileData.planned_pages
      : [];

    // Validate website URL if provided
    if (website && !isValidUrl(website)) {
      return NextResponse.json(
        { error: "Invalid website URL format" },
        { status: 400 }
      );
    }

    // Validate cover photo URL if provided
    if (coverPhoto && !isValidUrl(coverPhoto)) {
      return NextResponse.json(
        { error: "Invalid cover photo URL format" },
        { status: 400 }
      );
    }

    // Validate priority level
    if (!["low", "medium", "high", "critical"].includes(priorityLevel)) {
      return NextResponse.json(
        { error: "Invalid priority level" },
        { status: 400 }
      );
    }

    // Create business profile
    const { data: newProfile, error } = await supabase
      .from("business_profiles")
      .insert({
        user_id: user.id,
        business_name: businessName,
        business_type: businessType,
        location: location,
        phone: phone,
        website: website,
        description: description,
        offering: offering,
        is_listed: profileData.is_listed ?? true,
        requirements: requirements,
        cover_photo: coverPhoto,
        priority_level: priorityLevel,
        contact_name: contactName,
        contact_phone: contactPhone,
        contact_email: contactEmail,
        planned_pages: plannedPages,
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation
        return NextResponse.json(
          { error: "Business profile already exists" },
          { status: 409 }
        );
      }
      console.error("Error creating profile:", error);
      return NextResponse.json(
        { error: "Failed to create profile" },
        { status: 500 }
      );
    }

    return NextResponse.json(newProfile, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Missing Supabase configuration" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    // Set the session with the token
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updates = await request.json();

    // Remove fields that shouldn't be updated
    delete updates.user_id;
    delete updates.created_at;

    // Update business profile
    const { data: updatedProfile, error } = await supabase
      .from("business_profiles")
      .update(updates)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Profile not found" },
          { status: 404 }
        );
      }
      console.error("Error updating profile:", error);
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Missing Supabase configuration" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete business profile
    const { error } = await supabase
      .from("business_profiles")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error("Error deleting profile:", error);
      return NextResponse.json(
        { error: "Failed to delete profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
