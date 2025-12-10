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
    <div className="bg-gray-50">
      <div className="text-center mb-12 p-6">
        <h1 className="text-5xl mb-6">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Have questions about Barter Builds? Need help with your application?
          We are here to help you navigate the world of skill-based trading.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 px-12">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-white">
            <h2 className="font-semibold mb-4">Get in Touch</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-700 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">
                    hello@barterbuilds.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-700 mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-700 mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">
                    123 Innovation Blvd
                    <br />
                    Tech City, CA 94016
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-700 mt-0.5" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-muted-foreground">
                    Mon-Fri: 9:00 AM - 6:00 PM PST
                    <br />
                    Sat-Sun: 10:00 AM - 4:00 PM PST
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-white">
            <h2 className="font-semibold mb-4">Frequently Asked</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium">How long does approval take?</p>
                <p className="text-muted-foreground">
                  Usually 2-3 business days for both businesses and developers.
                </p>
              </div>
              <div>
                <p className="font-medium">Is there a fee to join?</p>
                <p className="text-muted-foreground">
                  No, Barter Builds is completely free to use.
                </p>
              </div>
              <div>
                <p className="font-medium">What if a deal goes wrong?</p>
                <p className="text-muted-foreground">
                  We provide mediation services to help resolve any disputes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 border rounded-lg p-6 bg-white">
          <h2 className="font-semibold">Send us a Message</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Fill out the form below and we will get back to you as soon as
            possible.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactName" className="block text-sm mb-1">
                  Name *
                </label>
                <input
                  className="w-full border rounded-md px-3 py-2"
                  id="contactName"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-sm mb-1">
                  Email *
                </label>
                <input
                  id="contactEmail"
                  className="w-full border rounded-md px-3 py-2"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm mb-1">
                Category
              </label>
              <select
                id="category"
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="">What is this regarding?</option>
                <option value="general">General Question</option>
                <option value="business-help">Business Application Help</option>
                <option value="developer-help">Developer Application Help</option>
                <option value="technical">Technical Issue</option>
                <option value="dispute">Dispute Resolution</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="press">Press/Media</option>
              </select>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm mb-1">
                Subject *
              </label>
              <input
                className="w-full border rounded-md px-3 py-2"
                id="subject"
                placeholder="Brief description of your inquiry"
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm mb-1">
                Message *
              </label>
              <textarea
                id="message"
                className="w-full border rounded-md px-3 py-2"
                placeholder="Please provide details about your question or concern..."
                rows={6}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}