"use client";

import { useState, useTransition } from "react";
import { Loader2, X } from "lucide-react";
import { signupAction } from "@/app/auth/actions";

type SignupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  switchToLogin?: () => void;
};

export function SignupModal({
  isOpen,
  onClose,
  switchToLogin,
}: SignupModalProps) {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError("");

    startTransition(async () => {
      try {
        const result = await signupAction(formData);

        if (!result.success) {
          setError(result.error || "Signup failed");
        }
        // If successful, the server action will handle the redirect
      } catch (error) {
        console.error("Signup error:", error);
        setError("An unexpected error occurred");
      }
    });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          disabled={isPending}
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-semibold mb-4">Join Barter Builds</h3>

        <form action={handleSubmit} className="space-y-4">
          {error && (
            <div
              role="alert"
              className="alert alert-error bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
            >
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Name</span>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                disabled={isPending}
              />
            </label>
          </div>

          <div className="space-y-2">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                disabled={isPending}
              />
            </label>
          </div>

          <div className="space-y-2">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Password
              </span>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                disabled={isPending}
              />
            </label>
          </div>

          <div className="space-y-2">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                I am a...
              </span>
              <select
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="role"
                required
                disabled={isPending}
              >
                <option value="">Select your role</option>
                <option value="business">
                  Business looking for developers
                </option>
                <option value="developer">
                  Developer looking for projects
                </option>
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {switchToLogin && (
          <div className="text-center text-sm text-gray-600 mt-4">
            <p>
              Already have an account?{" "}
              <button
                onClick={switchToLogin}
                className="text-blue-600 hover:underline"
                disabled={isPending}
              >
                Sign in
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
