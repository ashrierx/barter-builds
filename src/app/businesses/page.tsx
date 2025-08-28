import { MapPin, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Businesses() {
  const businesses = [
    {
      id: 1,
      name: "Maria's Bakery",
      type: "Bakery",
      location: "Portland, OR",
      datePosted: "2 days ago",
      description:
        "Looking for a simple website to showcase our daily fresh breads and pastries. Need online ordering capability.",
      offering: "Fresh bread delivery for 3 months + catering for one event",
      requirements: [
        "Simple design",
        "Online ordering",
        "Photo gallery",
        "Contact form",
      ],
      urgency: "Medium",
    },
    {
      id: 2,
      name: "Green Thumb Landscaping",
      type: "Landscaping",
      location: "Austin, TX",
      datePosted: "1 week ago",
      description:
        "Need a professional website to display our landscaping projects and attract new residential clients.",
      offering: "Complete front yard landscaping (up to $2,000 value)",
      requirements: [
        "Portfolio showcase",
        "Service pages",
        "Before/after gallery",
        "Quote request form",
      ],
      urgency: "High",
    },
    {
      id: 3,
      name: "Cozy Corner Bookstore",
      type: "Retail",
      location: "Denver, CO",
      datePosted: "3 days ago",
      description:
        "Independent bookstore seeking a website with book inventory and event calendar functionality.",
      offering: "$500 store credit + monthly book club hosting space",
      requirements: [
        "Book catalog",
        "Event calendar",
        "Newsletter signup",
        "About page",
      ],
      urgency: "Low",
    },
    {
      id: 4,
      name: "Fix-It Frank's Repair",
      type: "Home Services",
      location: "Nashville, TN",
      datePosted: "5 days ago",
      description:
        "Handyman service needs a website to book appointments and showcase completed projects.",
      offering: "Home repair services up to 20 hours of work",
      requirements: [
        "Service booking",
        "Project gallery",
        "Testimonials",
        "Contact info",
      ],
      urgency: "Medium",
    },
  ];

  const getUrgencyStyle = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-red-600 text-white";
      case "Medium":
        return "bg-gray-900 text-white";
      case "Low":
        return "bg-gray-200 text-gray-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl mb-6 font-bold">Businesses Seeking Help</h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
          Browse local businesses that need websites and discover what valuable
          goods and services they are offering in exchange.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {businesses.map((business) => (
          <Link key={business.id} href={`/businesses/${business.id}`}>
            <div
              key={business.id}
              className="rounded-2xl border bg-white shadow-sm p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xl font-semibold">{business.name}</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyStyle(
                      business.urgency
                    )}`}
                  >
                    {business.urgency} Priority
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {business.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {business.datePosted}
                  </span>
                </div>
                <span className="inline-block text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 mb-4">
                  {business.type}
                </span>

                <p className="text-gray-600 mb-4">{business.description}</p>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Offering in Exchange:</h4>
                  <p className="text-sm bg-gray-100 p-3 rounded-lg">
                    {business.offering}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {business.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-xl hover:bg-gray-800 transition">
                <ExternalLink className="w-4 h-4" />
                Contact {business.name}
              </button>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-500 mb-4">
          Don&apos;t see what you are looking for? New businesses join every day.
        </p>
        <button className="px-6 py-2 border rounded-xl hover:bg-gray-50 transition">
          Load More Businesses
        </button>
      </div>
    </div>
  );
}
