import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"business" | "developer" | "">("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await signup({
        name,
        email,
        password,
        type: role as "business" | "developer",
      });
      if (success) {
        onClose();
        setName("");
        setEmail("");
        setRole("");
        setPassword("");
      } else {
        setError("Sign up failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
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
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-semibold mb-4">Create your account</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div role="alert" className="alert">
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block">
              <span className="label">Name</span>
              <input
                className="input w-full"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password"
                required
                disabled={isLoading}
              />
            </label>
          </div>

          <div>
            <span className="label block mb-1">Role</span>
            <select
              className="input w-full"
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "business" | "developer")
              }
              required
              disabled={isLoading}
            >
              <option value="">Select a role</option>
              <option value="business">Business</option>
              <option value="developer">Developer</option>
            </select>
          </div>

          <button type="submit" className="btn w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="text-center text-sm text-muted-foreground mt-4">
          <p>
            Already registered?{" "}
            <button
              onClick={switchToLogin}
              className="text-blue-600 hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
