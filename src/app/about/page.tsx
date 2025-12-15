import { Users, Handshake, Globe } from "lucide-react";

// Define the structure for a step item
interface Step {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

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

interface StepCardProps {
  step: Step;
  index: number;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const StepCard: React.FC<StepCardProps> = ({ step, index, Icon }) => (
    <div
      className="relative z-10 w-full max-w-sm flex justify-center step-card-container animate-fade-in-up md:w-auto"
      style={{ animationDelay: `${index * 0.3}s` }}
    >
      <div className="step-card w-full bg-white rounded-xl shadow-2xl p-6 border-t-4 border-barterPurple transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-3xl">
        <div className="card-body items-center text-center">
          {/* Icon Circle */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg animate-pulse-subtle">
            <Icon className="w-8 h-8" />
          </div>
          {/* Content */}
          <h3 className="text-2xl font-bold mb-2 text-gray-800">
            {step.title}
          </h3>
          <p className="text-gray-600">{step.description}</p>
        </div>
      </div>
    </div>
);

export default function About() {

  // All custom CSS is now embedded within the component
  const customStyles = `
    /* Custom Keyframes for Animations */

    /* 1. Subtle Pulsing for Icons */
    @keyframes pulse-subtle {
        0%, 100% {
            box-shadow: 0 0 0 0px rgba(59, 130, 246, 0.4); /* Blue-500 with opacity */
        }
        50% {
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
        }
    }

    /* 2. Fade In Up for Step Cards */
    @keyframes fade-in-up {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* 3. Tilt on Hover effect */
    .step-card-container {
        perspective: 1000px; /* Establishes 3D space */
    }

    /* The actual 3D rotation on hover */
    .step-card {
        /* Set default state for transition */
        transform: rotateY(0deg);
        transition: transform 0.5s ease-out, box-shadow 0.3s ease-out, scale 0.3s ease-out;
    }

    /* Only apply the subtle tilt on desktop */
    @media (min-width: 768px) {
        .step-card-container:hover .step-card {
            /* 3D tilt */
            transform: rotateY(3deg) translateY(-2px);
            box-shadow: 0 0 50px 0px rgba(0, 0, 0, 0.2); /* Stronger shadow on hover */
        }
    }


    /* Apply Keyframes to Classes */

    /* Step Card Icon */
    .animate-pulse-subtle {
        animation: pulse-subtle 3s infinite cubic-bezier(0.4, 0, 0.6, 1);
    }

    /* Step Card Fade-In */
    .animate-fade-in-up {
        animation: fade-in-up 0.8s ease-out forwards;
        opacity: 0; /* Start hidden */
    }

    /* Desktop Flow Styling */
    @media (min-width: 768px) {
        /* Ensures the vertical line is hidden on desktop */
        .md-hidden {
            display: none !important;
        }
        
        /* Ensure z-index layers correctly for the desktop flow */
        .step-card-container {
            z-index: 10;
        }
    }
  `;

  return (
    <div className="font-inter bg-white pb-10">
      {/* Embedded Styles */}
      <style>{customStyles}</style>

      {/* Hero Section */}
      <div className="text-center mb-16 py-20 px-5 bg-barterPurple/90 text-white ">
        <h1 className="text-4xl font-extrabold mb-6 leading-tight">
          Building the Web, One Barter at a Time
        </h1>
        <p className="text-xl max-w-3xl mx-auto italic font-medium text-white">
          Barter Builds is a platform where creativity and commerce collide,
          enabling small businesses and developers to trade skills for goods
          and services, building a vibrant ecosystem of fair exchange.
        </p>
      </div>

      {/* Mission Statement */}
      {/* <div className="bg-gray-100 rounded-2xl p-10 mb-20 shadow-xl  transition duration-500 hover:shadow-2xl">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Our Mission 🚀
        </h2>
        <p className="text-lg text-center max-w-4xl mx-auto text-gray-600 leading-relaxed">
          We are on a mission to democratize professional web development,
          making it accessible to small businesses regardless of their budget.
          At the same time, we empower developers to grow their portfolios and
          gain valuable goods, services, and experience through meaningful,
          mutually beneficial partnerships.
        </p>
      </div> */}

      {/* How It Works Flow - Horizontal for Desktop, Vertical for Mobile */}
      <div className="mb-20 mx-6">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
          How It Works
        </h2>
        <div className="relative">
          {/* Mobile Vertical Flow Line (Full Height) */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 border-l-2 border-dashed border-blue-300 md:hidden h-full"></div>

          {/* Desktop Horizontal Flow Line (Runs across the center of the cards) */}
          {/* Line is drawn between the cards using margin offsets */}
          <div className="hidden md:block absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-blue-300 z-0 mx-[calc(16.666%-1rem)]"></div>
          
          <div className="relative flex flex-col items-center md:flex-row md:justify-between md:items-start">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  // Container for each step. On desktop, they are equal width and positioned for the flow.
                  className={`relative w-full md:w-1/3 flex flex-col items-center justify-start mb-16 md:mb-0 px-4`}
                >
                  
                  {/* Step Card (The Box) */}
                  <StepCard step={step} index={index} Icon={Icon} />

                  {/* Horizontal Connector Dot (Desktop) - Overlays the horizontal line */}
                  {/* <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 z-20 shadow-lg border-2 border-white"></div> */}

                  {/* Vertical Spacer Dot (Mobile - Overlays the dashed line) */}
                  <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 translate-y-4 w-4 h-4 rounded-full bg-blue-500 md:hidden z-20 shadow-md"></div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* END How It Works Flow */}

      {/* Benefits Section */}
      <div className="grid md:grid-cols-2 gap-10 mx-8">
        {/* For Businesses */}
        <div className="card bg-gradient-to-br from-blue-50 to-indigo-100 shadow-xl rounded-xl p-8 transform transition duration-300 hover:shadow-2xl hover:translate-y-[-4px]">
          <div className="card-body">
            <h3 className="text-3xl font-extrabold mb-5 text-gray-800 border-b-2 border-blue-300 pb-2">
              Benefits for Businesses 💼
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 text-2xl">⚡</span>
                <span>
                  <b>Access Professional Websites</b>: Get a high-quality,
                  custom website without the high upfront costs.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 text-2xl">🤝</span>
                <span>
                  <b>Trade Your Assets</b>: Exchange your goods or services
                  instead of cash, turning what you already have into value.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 text-2xl">💡</span>
                <span>
                  <b>Connect with Passionate Creators</b>: Work with developers
                  who are genuinely excited about your business.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 text-2xl">🌱</span>
                <span>
                  <b>Build Lasting Partnerships</b>: Develop meaningful business
                  relationships based on mutual respect and shared goals.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* For Developers */}
        <div className="card bg-gradient-to-br from-purple-50 to-pink-100 shadow-xl rounded-xl p-8 transform transition duration-300 hover:shadow-2xl hover:translate-y-[-4px]">
          <div className="card-body">
            <h3 className="text-3xl font-extrabold mb-5 text-gray-800 border-b-2 border-purple-300 pb-2">
              Benefits for Developers 💻
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-500 mr-3 text-2xl">✨</span>
                <span>
                  <b>Expand Your Portfolio</b>: Build your professional
                  portfolio with real-world projects and testimonials.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-3 text-2xl">🎁</span>
                <span>
                  <b>Gain Valuable Goods & Services</b>: Receive tangible
                  products or services that you need or want in exchange for
                  your work.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-3 text-2xl">📍</span>
                <span>
                  <b>Network with Local Businesses</b>: Connect with local
                  entrepreneurs and open doors to new opportunities.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-3 text-2xl">🎓</span>
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
