"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form:", form);
    alert(
      "Thank you for your message! We will get back to you within 24 hours."
    );
    setForm({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    });
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-[#0a0a0a] text-white py-32 px-6 mb-12 relative overflow-hidden">
        {/* Multi-layered Glow */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#432ad5]/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-[#7864ff]/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-[0.3em] uppercase bg-white/5 border border-white/10 rounded-full backdrop-blur-sm text-[#7864ff]">
            Get in Touch
          </span>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Let&apos;s talk <br />
            <span className="bg-gradient-to-r from-[#7864ff] to-[#bca6ff] bg-clip-text text-transparent">
              Barter.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Have questions about the platform? We&apos;re here to help you navigate
            the world of skill-based trading.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
        {/* Left Column: Info & FAQ */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Contact Info
            </h2>
            <div className="space-y-6">
              {[
                { Icon: Mail, label: "Email", value: "hello@barterbuilds.com" },
                { Icon: Phone, label: "Phone", value: "(555) 123-4567" },
                {
                  Icon: MapPin,
                  label: "Office",
                  value: "123 Innovation Blvd, CA",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#432ad5]">
                    <item.Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {item.label}
                    </p>
                    <p className="text-slate-900 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#432ad5]/5 p-8 rounded-3xl border border-[#432ad5]/10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Quick FAQ</h2>
            <div className="space-y-4">
              <details className="group cursor-pointer">
                <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                  Is it really free?
                  <span className="transition-transform group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <p className="text-sm text-slate-600 mt-2">
                  Absolutely. No hidden fees or commissions on trades.
                </p>
              </details>
              <details className="group cursor-pointer">
                <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                  How long does approval take?
                  <span className="transition-transform group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <p className="text-sm text-slate-600 mt-2">
                  Usually 2-3 business days for both businesses and developers.
                </p>
              </details>
              <details className="group cursor-pointer">
                <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                  What if a deal goes wrong?
                  <span className="transition-transform group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <p className="text-sm text-slate-600 mt-2">
                  We provide mediation services to help resolve any disputes.
                </p>
              </details>
              <details className="group cursor-pointer">
                <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                  How do I get started with a helping a business?
                  <span className="transition-transform group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <p className="text-sm text-slate-600 mt-2">
                  Check out their profile page to understand their needs. If it
                  is something you are interested in helping with, click the
                  contact button to email them.
                </p>
              </details>
              <div className="h-px bg-slate-200" />
              {/* Add more details tags as needed */}
            </div>
          </div>
        </div>

        {/* Right Column: The Form */}
        <div className="lg:col-span-8 bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Full Name
                </label>
                <input
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:bg-white"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:bg-white"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Inquiry Category
              </label>
              <select
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-slate-900 focus:bg-white appearance-none"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select a topic...</option>
                <option value="general">General Question</option>
                <option value="technical">Technical Issue</option>
                <option value="business-help">Business Application Help</option>
                <option value="developer-help">
                  Developer Application Help
                </option>
                <option value="dispute">Dispute Resolution</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Message
              </label>
              <textarea
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:bg-white"
                placeholder="How can we help you?"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#432ad5] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#3920cb] hover:shadow-lg hover:shadow-[#432ad5]/30 transition-all active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
