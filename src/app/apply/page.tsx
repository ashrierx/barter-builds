import { useState } from "react";
import { Users, Code, CheckCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
export default function Apply() {
  const {
    user,
    businessProfile,
    developerProfile,
    createBusinessProfile,
    createDeveloperProfile,
  } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"business" | "developer">(
    "business"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [businessForm, setBusinessForm] = useState({
    business_name: "",
    business_type: "",
    location: "",
    phone: "",
    website: "",
    description: "",
    offering: "",
    is_listed: true,
  });
  const [developerForm, setDeveloperForm] = useState({
    location: "",
    portfolio: "",
    github: "",
    skills: "",
    experience: "",
    availability: "",
    interested_in: "",
    is_listed: true,
  });
  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to create your business profile.");
      return;
    }
    setIsSubmitting(true);
    try {
      const success = await createBusinessProfile(businessForm);
      if (success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/businesses");
        }, 2000);
      } else {
        alert("Failed to create business profile. Please try again.");
      }
    } catch (err) {
      console.error("Business profile creation error:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDeveloperSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to create your developer profile.");
      return;
    }
    setIsSubmitting(true);
    try {
      const success = await createDeveloperProfile(developerForm);
      if (success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/developers");
        }, 2000);
      } else {
        alert("Failed to create developer profile. Please try again.");
      }
    } catch (err) {
      console.error("Developer profile creation error:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-semibold mb-3">Join Barter Builds</h1>
        <p className="text-lg text-gray-600 mb-8">
          Please sign in or create an account to build your profile.
        </p>
        <button onClick={() => router.push("/")} className="btn btn-primary">
          Go to Home Page
        </button>
      </div>
    );
  }
  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-4xl font-semibold mb-3">Profile Created!</h1>
        <p className="text-lg text-gray-600">
          Your profile has been created successfully. Redirecting you now...
        </p>
      </div>
    );
  }
  // Show message if user already has a profile for the selected tab
  const hasBusinessProfile = businessProfile !== null;
  const hasDeveloperProfile = developerProfile !== null;
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold mb-3">Build Your Profile</h1>
        <p className="text-lg text-gray-600">
          Create your profile to start trading skills for services.
        </p>
      </div>
      {/* Show user role info */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-500">
          Signed in as: <span className="font-medium">{user.name}</span> (
          {user.role})
        </p>
      </div>

      {/* Tabs - only show if user doesn't have both profiles */}
      {!(hasBusinessProfile && hasDeveloperProfile) && (
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setActiveTab("business")}
              className={`flex items-center px-5 py-2 rounded-full text-sm font-medium transition ${
                activeTab === "business"
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              Business Profile
            </button>
            <button
              onClick={() => setActiveTab("developer")}
              className={`flex items-center px-5 py-2 rounded-full text-sm font-medium transition ${
                activeTab === "developer"
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Code className="w-4 h-4 mr-2" />
              Developer Profile
            </button>
          </div>
        </div>
      )}

      {/* Business Form */}
      {activeTab === "business" && (
        <div className="bg-white shadow rounded-2xl p-6">
          {hasBusinessProfile ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">
                Business Profile Already Created
              </h2>
              <p className="text-gray-600 mb-4">
                You already have a business profile set up.
              </p>
              <button
                onClick={() => router.push("/businesses")}
                className="btn btn-primary"
              >
                View Your Business Profile
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-2">
                Create Business Profile
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Tell us about your business and what you can offer in exchange
                for website development.
              </p>
              <form onSubmit={handleBusinessSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Business Name *
                    </label>
                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={businessForm.business_name}
                      onChange={(e) =>
                        setBusinessForm({
                          ...businessForm,
                          business_name: e.target.value,
                        })
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Business Type *
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={businessForm.business_type}
                      onChange={(e) =>
                        setBusinessForm({
                          ...businessForm,
                          business_type: e.target.value,
                        })
                      }
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select business type</option>
                      <option value="restaurant">Restaurant/Food</option>
                      <option value="retail">Retail</option>
                      <option value="professional">
                        Professional Services
                      </option>
                      <option value="healthcare">Healthcare</option>
                      <option value="fitness">Fitness/Wellness</option>
                      <option value="creative">Creative Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location *
                    </label>
                    <input
                      placeholder="City, State"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={businessForm.location}
                      onChange={(e) =>
                        setBusinessForm({
                          ...businessForm,
                          location: e.target.value,
                        })
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={businessForm.phone}
                      onChange={(e) =>
                        setBusinessForm({
                          ...businessForm,
                          phone: e.target.value,
                        })
                      }
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    type="url"
                    placeholder="https://your-website.com"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={businessForm.website}
                    onChange={(e) =>
                      setBusinessForm({
                        ...businessForm,
                        website: e.target.value,
                      })
                    }
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Business Description *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your business and what you do..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={businessForm.description}
                    onChange={(e) =>
                      setBusinessForm({
                        ...businessForm,
                        description: e.target.value,
                      })
                    }
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    What You're Offering in Exchange *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the goods or services you can offer to developers..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={businessForm.offering}
                    onChange={(e) =>
                      setBusinessForm({
                        ...businessForm,
                        offering: e.target.value,
                      })
                    }
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-medium shadow hover:bg-indigo-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Creating Profile..."
                    : "Create Business Profile"}
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* Developer Form */}
      {activeTab === "developer" && (
        <div className="bg-white shadow rounded-2xl p-6">
          {hasDeveloperProfile ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">
                Developer Profile Already Created
              </h2>
              <p className="text-gray-600 mb-4">
                You already have a developer profile set up.
              </p>
              <button
                onClick={() => router.push("/developers")}
                className="btn btn-primary"
              >
                View Your Developer Profile
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-2">
                Create Developer Profile
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Showcase your skills and experience to connect with businesses.
              </p>
              <form onSubmit={handleDeveloperSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    placeholder="City, State"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={developerForm.location}
                    onChange={(e) =>
                      setDeveloperForm({
                        ...developerForm,
                        location: e.target.value,
                      })
                    }
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Portfolio Website
                    </label>
                    <input
                      type="url"
                      placeholder="https://your-portfolio.com"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={developerForm.portfolio}
                      onChange={(e) =>
                        setDeveloperForm({
                          ...developerForm,
                          portfolio: e.target.value,
                        })
                      }
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      GitHub Profile
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/yourusername"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={developerForm.github}
                      onChange={(e) =>
                        setDeveloperForm({
                          ...developerForm,
                          github: e.target.value,
                        })
                      }
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Skills & Technologies
                  </label>
                  <textarea
                    rows={3}
                    placeholder="List your programming languages, frameworks, tools, etc..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={developerForm.skills}
                    onChange={(e) =>
                      setDeveloperForm({
                        ...developerForm,
                        skills: e.target.value,
                      })
                    }
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Experience Level
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={developerForm.experience}
                    onChange={(e) =>
                      setDeveloperForm({
                        ...developerForm,
                        experience: e.target.value,
                      })
                    }
                    disabled={isSubmitting}
                  >
                    <option value="">Select experience level</option>
                    <option value="beginner">Beginner (0-2 years)</option>
                    <option value="intermediate">
                      Intermediate (2-5 years)
                    </option>
                    <option value="advanced">Advanced (5+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Availability
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={developerForm.availability}
                    onChange={(e) =>
                      setDeveloperForm({
                        ...developerForm,
                        availability: e.target.value,
                      })
                    }
                    disabled={isSubmitting}
                  >
                    <option value="">Select availability</option>
                    <option value="full-time">
                      Available for full-time projects
                    </option>
                    <option value="part-time">
                      Available for part-time projects
                    </option>
                    <option value="weekends">Weekends only</option>
                    <option value="flexible">Flexible schedule</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    What Services Are You Interested In?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What goods or services would you be interested in receiving from businesses?"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={developerForm.interested_in}
                    onChange={(e) =>
                      setDeveloperForm({
                        ...developerForm,
                        interested_in: e.target.value,
                      })
                    }
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-medium shadow hover:bg-indigo-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Creating Profile..."
                    : "Create Developer Profile"}
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
