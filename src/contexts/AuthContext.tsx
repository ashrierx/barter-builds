"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

interface User {
  id: string;
  name: string;
  email: string;
  type: "business" | "developer";
  location?: string;
  phone?: string;
  businessName?: string;
  businessType?: string;
  offering?: string;
  portfolio?: string;
  github?: string;
  skills?: string;
  experience?: string;
  availability?: string;
  interestedIn?: string;
}

type SignupPayload = {
  name: string;
  email: string;
  password: string;
  type: "business" | "developer";
  location?: string;
  phone?: string;
  businessName?: string;
  businessType?: string;
  offering?: string;
  portfolio?: string;
  github?: string;
  skills?: string;
  experience?: string;
  availability?: string;
  interestedIn?: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  signup: (profileData: SignupPayload) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session && session.user) {
          // fetch profile from 'users' table
          const { data: profile } = await supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single();
          setUser(profile);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    );
    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.session || !data.user) return false;
    // Fetch profile from your 'users' table
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single();
    if (profileError || !profile) return false;
    setUser(profile);
    setIsAuthenticated(true);
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  const signup = async (profileData: SignupPayload): Promise<boolean> => {
    const { name, email, password, ...rest } = profileData;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error || !data.user) return false;
    const userProfile = { id: data.user.id, name, email, ...rest };
    const { error: profileError } = await supabase
      .from("users")
      .insert([userProfile]);
    if (profileError) return false;
    setUser(userProfile);
    setIsAuthenticated(true);
    return true;
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    const { error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", user.id);

    if (!error) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, updateProfile, signup }}
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
