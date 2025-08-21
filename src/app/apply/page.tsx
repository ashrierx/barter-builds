"use client";

import { useState } from "react";
import { Users, Code } from "lucide-react";

export default function Apply() {
  const [activeTab, setActiveTab] = useState<"business" | "developer">(
    "business"
  );

  const [businessForm, setBusinessForm] = useState({
    businessName: "",
    businessType: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    description: "",
    offering: "",
  });

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Business application:", businessForm);
    alert("Thanks! We’ll review your application and get back to you.");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold mb-3">Join Barter Builds</h1>
        <p className="text-lg text-gray-600">
          Ready to start trading skills for services? Choose your path below.
        </p>
      </div>

      {/* Tabs */}
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
            I’m a Business
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
            I’m a Developer
          </button>
        </div>
      </div>

      {/* Business Form */}
      {activeTab === "business" && (
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-2">Business Application</h2>
          <p className="text-sm text-gray-500 mb-6">
            Tell us about your business and what website you need. We’ll connect
            you with skilled developers.
          </p>
          <form onSubmit={handleBusinessSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business Name *
                </label>
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={businessForm.businessName}
                  onChange={(e) =>
                    setBusinessForm({
                      ...businessForm,
                      businessName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business Type *
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={businessForm.businessType}
                  onChange={(e) =>
                    setBusinessForm({
                      ...businessForm,
                      businessType: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select business type</option>
                  <option>Restaurant/Food</option>
                  <option>Retail</option>
                  <option>Professional Services</option>
                  <option>Healthcare</option>
                  <option>Fitness/Wellness</option>
                  <option>Creative Services</option>
                  <option>Other</option>
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
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={businessForm.email}
                  onChange={(e) =>
                    setBusinessForm({ ...businessForm, email: e.target.value })
                  }
                  required
                />
              </div>
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                What You’re Offering in Exchange *
              </label>
              <textarea
                rows={3}
                placeholder="Describe the goods or services you can offer..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={businessForm.offering}
                onChange={(e) =>
                  setBusinessForm({ ...businessForm, offering: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-medium shadow hover:bg-indigo-700"
            >
              Submit Business Application
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
