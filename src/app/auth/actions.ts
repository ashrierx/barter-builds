// src/app/auth/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export type AuthResult = {
  success: boolean;
  error?: string;
};

// export async function loginAction(formData: FormData): Promise<AuthResult> {
//   const supabase = await createClient();

//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   if (!email || !password) {
//     return { success: false, error: "Email and password are required" };
//   }

//   const { error } = await supabase.auth.signInWithPassword({
//     email: email.trim(),
//     password: password.trim(),
//   });

//   if (error) {
//     console.error("Login error:", error);
//     return { success: false, error: "Invalid email or password" };
//   }

//   revalidatePath("/", "layout");
//   redirect("/dashboard");
// }

export async function loginAction(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: password.trim(),
  });

  if (error) {
    throw new Error("Invalid email or password");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signupAction(formData: FormData): Promise<AuthResult> {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as "business" | "developer";

  if (!name || !email || !password || !role) {
    return { success: false, error: "All fields are required" };
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password: password.trim(),
    options: {
      data: {
        name: name.trim(),
        role: role,
      },
    },
  });

  if (error) {
    console.error("Signup error:", error);
    return { success: false, error: error.message };
  }

  if (data.user) {
    // Wait for trigger to complete
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logoutAction() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    return { success: false, error: "Failed to logout" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function getUser() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return null;
    }

    return profile;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}

export async function getUserProfile() {
  const user = await getUser();

  if (!user)
    return { user: null, businessProfile: null, developerProfile: null };

  const supabase = await createClient();

  let businessProfile = null;
  let developerProfile = null;

  if (user.role === "business") {
    const { data } = await supabase
      .from("business_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();
    businessProfile = data;
  } else if (user.role === "developer") {
    const { data } = await supabase
      .from("developer_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();
    developerProfile = data;
  }

  return { user, businessProfile, developerProfile };
}

// ============================================================================
// PROFILE UPDATE ACTIONS
// ============================================================================

type DeveloperProfileData = {
  location: string;
  portfolio: string;
  github: string;
  skills: string;
  experience: string;
  availability: string;
  interested_in: string;
  is_listed: boolean;
};

type BusinessProfileData = {
  business_name: string;
  business_type: string;
  location: string;
  phone: string;
  website: string;
  description: string;
  offering: string;
  is_listed: boolean;
};

export async function updateDeveloperProfile(
  data: DeveloperProfileData
): Promise<AuthResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from("developer_profiles")
    .select("user_id")
    .eq("user_id", user.id)
    .single();

  const profileData = {
    user_id: user.id,
    location: data.location || null,
    portfolio: data.portfolio || null,
    github: data.github || null,
    skills: data.skills || null,
    experience: data.experience || null,
    availability: data.availability || null,
    interested_in: data.interested_in || null,
    is_listed: data.is_listed,
  };

  if (existingProfile) {
    // Update existing profile
    const { error } = await supabase
      .from("developer_profiles")
      .update(profileData)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating developer profile:", error);
      return { success: false, error: "Failed to update profile" };
    }
  } else {
    // Insert new profile
    const { error } = await supabase
      .from("developer_profiles")
      .insert(profileData);

    if (error) {
      console.error("Error creating developer profile:", error);
      return { success: false, error: "Failed to create profile" };
    }
  }

  revalidatePath("/dashboard/developer");
  return { success: true };
}

export async function updateBusinessProfile(
  data: BusinessProfileData
): Promise<AuthResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  // Validate required fields
  if (
    !data.business_name ||
    !data.business_type ||
    !data.location ||
    !data.description ||
    !data.offering
  ) {
    return { success: false, error: "Please fill in all required fields" };
  }

  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from("business_profiles")
    .select("user_id")
    .eq("user_id", user.id)
    .single();

  const profileData = {
    user_id: user.id,
    business_name: data.business_name.trim(),
    business_type: data.business_type.trim(),
    location: data.location.trim(),
    phone: data.phone?.trim() || null,
    website: data.website?.trim() || null,
    description: data.description.trim(),
    offering: data.offering.trim(),
    is_listed: data.is_listed,
  };

  if (existingProfile) {
    // Update existing profile
    const { error } = await supabase
      .from("business_profiles")
      .update(profileData)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating business profile:", error);
      return { success: false, error: "Failed to update profile" };
    }
  } else {
    // Insert new profile
    const { error } = await supabase
      .from("business_profiles")
      .insert(profileData);

    if (error) {
      console.error("Error creating business profile:", error);
      return { success: false, error: "Failed to create profile" };
    }
  }

  revalidatePath("/dashboard/business");
  return { success: true };
}
