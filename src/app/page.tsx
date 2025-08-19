import Link from "next/link";

export default function Home() {
  return (
    // subtract navbar height (h-16 = 64px)
    <div className="relative h-[calc(100vh-2.5rem)] overflow-hidden">
      {/* Background Image - starts below navbar */}
      <img
        src="https://images.unsplash.com/photo-1485841890310-6a055c88698a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0"
        alt="Small business owners and developers working together"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/5 pointer-events-none"></div> */}

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="max-w-2xl md:max-w-4xl mx-auto text-center text-black pb-[200px]">
          <h1 className="text-4xl md:text-6xl mb-6">Barter Builds</h1>
          <p>Trade goods, get online</p>
          <p className="text-md md:text-xl mb-8 max-w-2xl mx-auto">
            Connecting small businesses who need websites with talented
            developers who want to trade their skills for goods and services. No
            money required - just fair exchange.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/businesses">
              <button className="btn btn-primary">Browse Businesses</button>
            </Link>
            <Link href="/apply">
              <button className="btn btn-outline">Apply to Join</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
