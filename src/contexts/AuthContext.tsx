"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { createClient } from "@supabase/supabase-js";

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
  is_listed: boolean;
  created_at?: string;
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
  is_listed: boolean;
  created_at?: string;
};

interface AuthContextType {
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
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
            if (error) {
              console.error("User profile fetch error:", error);
              return;
            }

            if (profile) {
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
            }
          } catch (err) {
            console.error("Profile fetch exception:", err);
          }
        } else {
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

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
      }
      setUser(null);
      setBusinessProfile(null);
      setDeveloperProfile(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Logout exception:", err);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: "business" | "developer"
  ): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role, name },
        },
      });

      if (error || !data.user) {
        console.error("Auth signup error:", error);
        return false;
      }

      return true;
    } catch (err) {
      console.error("Signup exception:", err);
      return false;
    }
  };

  const createBusinessProfile = async (
    profile: Omit<BusinessProfile, "user_id" | "created_at">
  ): Promise<boolean> => {
    if (!user) return false;
    try {
      const { data, error } = await supabase
        .from("business_profiles")
        .insert({
          ...profile,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) {
        console.error("Business profile creation error:", error);
        return false;
      }

      setBusinessProfile(data);
      return true;
    } catch (err) {
      console.error("Business profile creation exception:", err);
      return false;
    }
  };

  const updateBusinessProfile = async (
    updates: Partial<BusinessProfile>
  ): Promise<boolean> => {
    if (!user || !businessProfile) return false;
    try {
      const { data, error } = await supabase
        .from("business_profiles")
        .update(updates)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Business profile update error:", error);
        return false;
      }

      setBusinessProfile(data);
      return true;
    } catch (err) {
      console.error("Business profile update exception:", err);
      return false;
    }
  };

  const createDeveloperProfile = async (
    profile: Omit<DeveloperProfile, "user_id" | "created_at">
  ): Promise<boolean> => {
    if (!user) return false;
    try {
      const { data, error } = await supabase
        .from("developer_profiles")
        .insert({
          ...profile,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) {
        console.error("Developer profile creation error:", error);
        return false;
      }

      setDeveloperProfile(data);
      return true;
    } catch (err) {
      console.error("Developer profile creation exception:", err);
      return false;
    }
  };

  const updateDeveloperProfile = async (
    updates: Partial<DeveloperProfile>
  ): Promise<boolean> => {
    if (!user || !developerProfile) return false;
    try {
      const { data, error } = await supabase
        .from("developer_profiles")
        .update(updates)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Developer profile update error:", error);
        return false;
      }

      setDeveloperProfile(data);
      return true;
    } catch (err) {
      console.error("Developer profile update exception:", err);
      return false;
    }
  };

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
