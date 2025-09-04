"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { redirect } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  role: "business" | "developer";
  created_at?: string;
};

type BusinessProfile = {
  user_id: string;
  business_name: string;
  business_type: string;
  location: string;
  phone?: string;
  website?: string;
  description: string;
  offering: string;
  is_listed?: boolean;
  created_at?: string;
  updated_at?: string;
};

type DeveloperProfile = {
  user_id: string;
  location?: string;
  portfolio?: string;
  github?: string;
  skills?: string;
  experience?: string;
  availability?: string;
  interested_in?: string;
  is_listed?: boolean;
  created_at?: string;
  updated_at?: string;
};

type AuthContextType = {
  user: User | null;
  businessProfile: BusinessProfile | null;
  developerProfile: DeveloperProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    role: "business" | "developer"
  ) => Promise<boolean>;
  createBusinessProfile: (
    profile: Omit<BusinessProfile, "user_id" | "created_at">
  ) => Promise<boolean>;
  updateBusinessProfile: (
    updates: Partial<BusinessProfile>
  ) => Promise<boolean>;
  createDeveloperProfile: (
    profile: Omit<DeveloperProfile, "user_id" | "created_at">
  ) => Promise<boolean>;
  updateDeveloperProfile: (
    updates: Partial<DeveloperProfile>
  ) => Promise<boolean>;
  fetchUserProfiles: () => Promise<void>;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [businessProfile, setBusinessProfile] =
    useState<BusinessProfile | null>(null);
  const [developerProfile, setDeveloperProfile] =
    useState<DeveloperProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session && session.user) {
          try {
            // Fetch user profile
            const { data: profile, error } = await supabase
              .from("users")
              .select("*")
              .eq("id", session.user.id)
              .single();

            console.log("Profile query result:", { profile, error });

            if (error) {
              console.error("User profile fetch error:", error);
              setIsAuthenticated(true);
              return;
            }

            if (profile) {
              console.log("Profile fetched successfully:", profile);
              setUser(profile);
              setIsAuthenticated(true);

              // Fetch role-specific profile
              if (profile.role === "business") {
                const { data: businessData } = await supabase
                  .from("business_profiles")
                  .select("*")
                  .eq("user_id", profile.id)
                  .single();
                setBusinessProfile(businessData);
              } else if (profile.role === "developer") {
                const { data: developerData } = await supabase
                  .from("developer_profiles")
                  .select("*")
                  .eq("user_id", profile.id)
                  .single();
                setDeveloperProfile(developerData);
              }
            } else {
              console.log("No profile found, but user is authenticated");
              setIsAuthenticated(true);
            }
          } catch (err) {
            console.error("Profile fetch exception:", err);
            setIsAuthenticated(true);
          }

          // Only redirect on SIGNED_IN event and if we're not already on dashboard
          if (
            event === "SIGNED_IN" &&
            window.location.pathname !== "/dashboard"
          ) {
            redirect("/dashboard");
          }
        } else {
          console.log("User not authenticated, clearing state");
          setUser(null);
          setBusinessProfile(null);
          setDeveloperProfile(null);
          setIsAuthenticated(false);
        }
      }
    );

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        console.error("Login error:", error);
        return false;
      }

      if (!data.session || !data.user) {
        console.error("No session or user returned");
        return false;
      }
      return true;
    } catch (err) {
      console.error("Login exception:", err);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);
        return;
      }
      setUser(null);
      setBusinessProfile(null);
      setDeveloperProfile(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Logout exception:", err);
    }
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        console.error("Signup error:", error);
        return false;
      }

      if (!data.user) {
        console.error("No user returned after signup");
        return false;
      }

      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error("Signup exception:", err);
      return false;
    }
  };

  async function createBusinessProfile(
    profile: Omit<BusinessProfile, "user_id" | "created_at" | "updated_at">
  ): Promise<boolean> {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        console.error("No active session");
        return false;
      }

      const res = await fetch("/api/business-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error("Failed to create business profile");
      const result = await res.json();
      setBusinessProfile(result);
      return true;
    } catch (error) {
      console.error("Error creating business profile:", error);
      return false;
    }
  }

  async function updateBusinessProfile(
    updates: Partial<Omit<BusinessProfile, "user_id" | "created_at">>
  ): Promise<boolean> {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        console.error("No active session");
        return false;
      }

      const res = await fetch("/api/business-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update business profile");
      const result = await res.json();
      setBusinessProfile(result);
      return true;
    } catch (error) {
      console.error("Error updating business profile:", error);
      return false;
    }
  }

  async function createDeveloperProfile(
    profile: Omit<DeveloperProfile, "user_id" | "created_at" | "updated_at">
  ): Promise<boolean> {
    try {
      const res = await fetch("/api/developer-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile), // Fixed: was using 'data' instead of 'profile'
      });
      if (!res.ok) throw new Error("Failed to create developer profile");
      const result = await res.json();
      setDeveloperProfile(result);
      return true;
    } catch (error) {
      console.error("Error creating developer profile:", error);
      return false;
    }
  }

  async function updateDeveloperProfile(
    updates: Partial<Omit<DeveloperProfile, "user_id" | "created_at">>
  ): Promise<boolean> {
    try {
      const res = await fetch("/api/developer-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update developer profile");
      const result = await res.json();
      setDeveloperProfile(result);
      return true;
    } catch (error) {
      console.error("Error updating developer profile:", error);
      return false;
    }
  }

  async function deleteBusinessProfile(): Promise<boolean> {
    try {
      const res = await fetch("/api/business-profile", {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete business profile");
      setBusinessProfile(null);
      return true;
    } catch (error) {
      console.error("Error deleting business profile:", error);
      return false;
    }
  }

  async function deleteDeveloperProfile(): Promise<boolean> {
    try {
      const res = await fetch("/api/developer-profile", {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete developer profile");
      setDeveloperProfile(null);
      return true;
    } catch (error) {
      console.error("Error deleting developer profile:", error);
      return false;
    }
  }

  // Fetch user's own profiles (for dashboard)
  async function fetchUserProfiles(): Promise<void> {
    if (!user) return;

    try {
      // Fetch business profile if user is a business
      if (user.role === "business") {
        const businessRes = await fetch("/api/business-profile");
        if (businessRes.ok) {
          const businessData = await businessRes.json();
          setBusinessProfile(businessData);
        }
      }

      // Fetch developer profile if user is a developer
      if (user.role === "developer") {
        const developerRes = await fetch("/api/developer-profile");
        if (developerRes.ok) {
          const developerData = await developerRes.json();
          setDeveloperProfile(developerData);
        }
      }
    } catch (error) {
      console.error("Error fetching user profiles:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        businessProfile,
        developerProfile,
        isAuthenticated,
        login,
        logout,
        signup,
        createBusinessProfile,
        updateBusinessProfile,
        createDeveloperProfile,
        updateDeveloperProfile,
        fetchUserProfiles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
