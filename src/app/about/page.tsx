import { Users, Handshake, Globe } from "lucide-react";
import "./about.css"; 

interface Step {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export default function About() {
  const steps: Step[] = [
    {
      icon: Users,
      title: "Businesses Post Their Needs",
      description:
        "Small business owners describe their website requirements and what goods or services they can offer in exchange.",
    },
    {
      icon: Globe,
      title: "Developers Browse & Connect",
      description:
        "Skilled developers review business listings and reach out to those offering exchanges that interest them.",
    },
    {
      icon: Handshake,
      title: "Fair Trade Agreements",
      description:
        "Both parties agree on the scope of work and the goods/services to be exchanged, creating win-win partnerships.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Building the Web, One Barter at a Time
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Barter Builds is a platform where creativity and commerce collide,
          enabling small businesses and developers to trade skills for goods
          and services, building a vibrant ecosystem of fair exchange.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-gray-100 rounded-lg p-8 mb-16 shadow-inner">
        <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
          Our Mission
        </h2>
        <p className="text-lg text-center max-w-4xl mx-auto text-gray-600">
          We are on a mission to democratize professional web development,
          making it accessible to small businesses regardless of their budget.
          At the same time, we empower developers to grow their portfolios and
          gain valuable goods, services, and experience through meaningful,
          mutually beneficial partnerships.
        </p>
      </div>

      {/* How It Works Flow */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-16">
          How It Works
        </h2>
        <div className="relative">
          {/* Dotted line path for mobile */}
          <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-px border-l-2 border-dashed border-gray-300 md:hidden animate-line-draw-mobile"></div>

          <div className="relative flex flex-col items-center md:items-stretch">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex items-center justify-center md:justify-between w-full relative mb-12 md:mb-0 ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  <div className={`relative z-10 w-full md:w-1/2 flex justify-center md:block step-card animate-fade-in-up`} style={{ animationDelay: `${index * 0.5 + 0.5}s` }}>
                    <div className="card w-full max-w-sm bg-white shadow-lg border border-gray-200">
                      <div className="card-body items-center text-center">
                        <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
                          <Icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                          {step.title}
                        </h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:hidden flex items-center justify-center z-0">
                      <div className="w-px h-full border-l-2 border-dashed border-gray-300"></div>
                    </div>
                  )}

                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full z-0">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 400 200"
                        preserveAspectRatio="none"
                        className="absolute"
                        style={{
                          transform: isEven
                            ? "rotateY(180deg) translateX(50%)"
                            : "translateX(-50%)",
                          left: "50%",
                        }}
                      >
                        <path
                          d="M 0 100 C 150 0, 250 200, 400 100"
                          stroke="rgb(209 213 219)"
                          strokeWidth="2"
                          strokeDasharray="8,8"
                          fill="none"
                          className="path-animation"
                          style={{ animationDelay: `${index * 0.5}s` }}
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* For Businesses */}
        <div className="card bg-gradient-to-br from-blue-50 to-indigo-100 shadow-md">
          <div className="card-body">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Benefits for Businesses
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 text-xl">•</span>
                <span>
                  <b>Access Professional Websites</b>: Get a high-quality,
                  custom website without the high upfront costs.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 text-xl">•</span>
                <span>
                  <b>Trade Your Assets</b>: Exchange your goods or services
                  instead of cash, turning what you already have into value.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 text-xl">•</span>
                <span>
                  <b>Connect with Passionate Creators</b>: Work with developers
                  who are genuinely excited about your business.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 text-xl">•</span>
                <span>
                  <b>Build Lasting Partnerships</b>: Develop meaningful business
                  relationships based on mutual respect and shared goals.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* For Developers */}
        <div className="card bg-gradient-to-br from-purple-50 to-pink-100 shadow-md">
          <div className="card-body">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Benefits for Developers
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 text-xl">•</span>
                <span>
                  <b>Expand Your Portfolio</b>: Build your professional
                  portfolio with real-world projects and testimonials.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 text-xl">•</span>
                <span>
                  <b>Gain Valuable Goods & Services</b>: Receive tangible
                  products or services that you need or want in exchange for
                  your work.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 text-xl">•</span>
                <span>
                  <b>Network with Local Businesses</b>: Connect with local
                  entrepreneurs and open doors to new opportunities.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 text-xl">•</span>
                <span>
                  <b>Practice Entrepreneurial Skills</b>: Learn to manage
                  client relationships, define project scope, and negotiate
                  agreements.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}