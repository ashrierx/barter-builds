import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { SignupModal } from "./SignupModal";
import { useRouter } from "next/navigation";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <>
      {mode === "login" ? (
        <LoginModal
          isOpen={isOpen}
          onClose={onClose}
          switchToSignup={() => setMode("signup")}
        />
      ) : (
        <SignupModal
          isOpen={isOpen}
          onClose={onClose}
          switchToLogin={() => setMode("login")}
        />
      )}
    </>
  );
}

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  switchToSignup: () => void;
};

export function LoginModal({
  isOpen,
  onClose,
  switchToSignup,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        console.log("Login successful, resetting form...");
        setEmail("");
        setPassword("");
        // Reset loading state BEFORE closing modal
        setIsLoading(false);
        onClose();
        // Remove the manual redirect - let AuthContext handle it
        // router.push("/dashboard"); // Remove this line
      } else {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

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
          disabled={isLoading}
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-semibold mb-4">
          Welcome back to Barter Builds
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div role="alert" className="alert">
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block">
              <span className="label">Email</span>
              <input
                className="input w-full"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </label>
          </div>

          <div className="space-y-2">
            <label className="block">
              <span className="label">Password</span>
              <input
                className="input w-full"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </label>
          </div>

          <button type="submit" className="btn w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="text-center text-sm text-muted-foreground mt-4">
          <p>
            New here?{" "}
            <button
              onClick={switchToSignup}
              className="text-blue-600 hover:underline"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
