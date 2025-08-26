// src/app/businesses/[id]/page.tsx
// This file assumes a dynamic route like /businesses/1, where the 'id' is a parameter.
// For this example, we're using a hard-coded business. When you connect to your backend,
// you'll use the 'params' prop to get the ID and fetch the correct business data.

import { MapPin, Calendar, ExternalLink, Mail, Phone, Globe } from 'lucide-react';
import Image from 'next/image';
import { NextPage } from 'next';

const businessData = {
  id: 1,
  name: "Maria's Bakery",
  owner: "Maria Rodriguez",
  ownerTitle: "Owner, Maria's Bakery",
  email: "maria@mariasbakery.com",
  phone: "(503) 555-0123",
  website: "https://mariasbakery.com",
  location: "Portland, OR",
  datePosted: "2 days ago",
  urgency: "Medium",
  type: "Bakery",
  description: "Maria's Bakery has been serving the Portland community for over 5 years with authentic Latin American breads and pastries. We specialize in fresh daily bakes using traditional family recipes passed down through generations. Our current website is outdated and doesn't reflect the quality of our products. We need a modern, mobile-friendly site that can handle online orders and showcase our beautiful baked goods.",
  offering: "Fresh bread delivery for 3 months + catering for one event (up to 50 people)",
  requirements: ["Simple design", "Online ordering", "Photo gallery", "Contact form", "Store hours display"],
  establishedYear: "2018",
  teamSize: "5-10",
  responseTime: "Within 24 hours",
  photos: [
    { src: "/images/maria-bakery-1.jpg", alt: "Fresh baked breads" },
    { src: "/images/maria-bakery-2.jpg", alt: "Pastries on display" },
    // These image paths are placeholders. You will need to replace them with actual images from your project's `public` directory
    // or from a CDN. For now, they're included to show the structure.
  ],
  timeline: "4-6 weeks",
  budgetType: "Trade-based",
  plannedPages: ["Home", "Menu/Products", "Online Ordering", "About Us", "Contact"],
};


const getUrgencyStyle = (urgency: string) => {
  switch (urgency) {
    case 'High':
      return 'bg-red-600 text-white';
    case 'Medium':
      return 'bg-gray-900 text-white';
    case 'Low':
      return 'bg-gray-200 text-gray-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

const BusinessPage: NextPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main container with padding for all devices */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content column */}
          <div className="md:col-span-2 space-y-8">
            {/* Top section with name, location, and priority */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4 border">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{businessData.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {businessData.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Posted {businessData.datePosted}
                    </span>
                    <span className="inline-block px-2 py-1 rounded bg-gray-100 text-gray-700">
                      {businessData.type}
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyStyle(businessData.urgency)}`}>
                  {businessData.urgency} Priority
                </div>
              </div>
              <p className="text-gray-600">{businessData.description}</p>
            </div>

            {/* Business Photos section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Business Photos</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src="/images/maria-bakery-1.jpg"
                    alt="Fresh baked breads"
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src="/images/maria-bakery-2.jpg"
                    alt="Pastries on display"
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Project Requirements section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Project Requirements</h2>
              <div className="space-y-4">
                {/* Offering in Exchange */}
                <div>
                  <h3 className="text-lg font-medium mb-1 text-gray-800">What They're Offering:</h3>
                  <p className="bg-gray-100 p-4 rounded-lg text-gray-700">{businessData.offering}</p>
                </div>
                
                {/* Required Features */}
                <div>
                  <h3 className="text-lg font-medium mb-2 text-gray-800">Required Features:</h3>
                  <div className="flex flex-wrap gap-2">
                    {businessData.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-sm rounded-full bg-gray-100 text-gray-700 font-medium"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold">Timeline:</h4>
                    <p>{businessData.timeline}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Budget Type:</h4>
                    <p>{businessData.budgetType}</p>
                  </div>
                  <div className="col-span-2">
                    <h4 className="font-semibold">Planned Pages:</h4>
                    <p>{businessData.plannedPages.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar content column */}
          <div className="md:col-span-1 space-y-8">
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white font-bold text-xl mr-4">
                  MR
                </div>
                <div>
                  <p className="font-semibold">{businessData.owner}</p>
                  <p className="text-sm text-gray-500">{businessData.ownerTitle}</p>
                </div>
              </div>
              <div className="space-y-3 text-gray-700">
                <a href={`mailto:${businessData.email}`} className="flex items-center gap-2 text-sm hover:text-gray-900 transition">
                  <Mail className="w-4 h-4 text-gray-500" />
                  {businessData.email}
                </a>
                <a href={`tel:${businessData.phone}`} className="flex items-center gap-2 text-sm hover:text-gray-900 transition">
                  <Phone className="w-4 h-4 text-gray-500" />
                  {businessData.phone}
                </a>
                <a href={businessData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-gray-900 transition">
                  <Globe className="w-4 h-4 text-gray-500" />
                  Current Website
                </a>
              </div>
            </div>

            {/* Business Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Business Info</h3>
              <div className="grid grid-cols-2 gap-y-4 text-gray-700">
                <div>
                  <h4 className="font-medium">Established</h4>
                  <p>{businessData.establishedYear}</p>
                </div>
                <div>
                  <h4 className="font-medium">Team Size</h4>
                  <p>{businessData.teamSize}</p>
                </div>
                <div>
                  <h4 className="font-medium">Response Time</h4>
                  <p>{businessData.responseTime}</p>
                </div>
              </div>
            </div>

            {/* Call to Action Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border text-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Interested?</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition">
                  <ExternalLink className="w-4 h-4" />
                  Contact {businessData.name}
                </button>
                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-800 py-3 rounded-xl hover:bg-gray-100 transition">
                  Save for Later
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Make sure to mention you found them on Barter Builds!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;

