"use client";

import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

type SignupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  switchToLogin: () => void;
};

export function SignupModal({
  isOpen,
  onClose,
  switchToLogin,
}: SignupModalProps) {
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "developer" as "business" | "developer",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { name, email, password, role } = formData;
      const success = await signup(name, email, password, role);

      if (!success) {
        setError("Sign-up failed. Please check your details and try again.");
        return;
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "developer",
      });

      // Close modal
      onClose();

      // Optional: toast/notification system instead of alert
      alert("✅ Account created successfully! You can now build your profile.");
    } catch (err) {
      console.error("Signup error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          disabled={isLoading}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-4">Create your account</h3>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          {error && (
            <div role="alert" className="alert text-red-600">
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block">
              <span className="label">Name</span>
              <input
                className="input w-full"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                disabled={isLoading}
              />
            </label>
          </div>

          <div>
            <label className="block">
              <span className="label">Email</span>
              <input
                className="input w-full"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </label>
          </div>

          <div>
            <label className="block">
              <span className="label">Password</span>
              <input
                className="input w-full"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a password"
                required
                disabled={isLoading}
              />
            </label>
          </div>

          <div>
            <span className="label block mb-1">I am a...</span>
            <select
              className="input w-full"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              disabled={isLoading}
            >
              <option value="developer">Developer</option>
              <option value="business">Business Owner</option>
            </select>
          </div>

          <button type="submit" className="btn w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground mt-4">
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={switchToLogin}
              className="text-blue-600 hover:underline"
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
