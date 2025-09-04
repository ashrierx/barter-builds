// src/app/auth/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export type AuthResult = {
  success: boolean;
  error?: string;
};

export async function loginAction(formData: FormData): Promise<AuthResult> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: password.trim(),
  });

  if (error) {
    console.error("Login error:", error);
    return { success: false, error: "Invalid email or password" };
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
  });

  if (error) {
    console.error("Signup error:", error);
    return { success: false, error: error.message };
  }

  if (data.user) {
    // Create user profile
    const { error: profileError } = await supabase.from("users").insert({
      id: data.user.id,
      name: name.trim(),
      email: email.trim(),
      role: role,
    });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      return { success: false, error: "Failed to create user profile" };
    }
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
