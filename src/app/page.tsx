"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative w-full bg-[#0a0a0a]">
      {/* Background Image with a Dark Vignette */}
      <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1485841890310-6a055c88698a?q=80&w=1740&auto=format&fit=crop"
            alt="Developers working"
            fill
            className="object-cover opacity-80"
            priority
          />
          {/* Gradient Overlay for professional depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Small accent tag */}
              <span className="inline-block  px-4 py-1.5 mb-6 text-xs font-bold text-[#7864ff] tracking-[0.2em] uppercase bg-white/10 border border-white/10 rounded-full backdrop-blur-md">
                The Digital Trade Revolution
              </span>

              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 drop-shadow-2xl">
                Barter <span className="text-[rgb(120,100,255)]">Builds.</span>
              </h1>

              <p className="text-lg md:text-2xl text-white font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                Trade your talent for goods. We connect world-class developers
                with local businesses.{" "}
                <span className="text-white font-semibold">
                  No cash, just craft.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <Link href="/about">
                  <button className="btn-primary">Start Trading</button>
                </Link>
                <Link
                  href="/businesses"
                  className="text-white hover:text-purple-300 transition-colors font-medium"
                >
                  Browse Directory →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
