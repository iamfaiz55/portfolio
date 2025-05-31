import React from "react";
import { motion } from "framer-motion";

const ContactForm: React.FC = () => {
  return (
    <section
      className="min-h-screen bg-gradient-to-t from-white to-purple-100 py-12 px-4 sm:px-6 md:px-8 font-sans"
      id="contact"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 bg-white rounded-xl shadow-md p-6 sm:p-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-3">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-gray-700 mb-5 leading-relaxed">
            I'm{" "}
            <span className="font-semibold text-purple-800">Shaikh Faiz</span>,
            a passionate developer building dynamic websites, apps, and
            software. Let’s connect — share your idea or query below!
          </p>
          <div className="space-y-3 text-sm text-gray-800">
            <p>
              <span className="font-semibold text-purple-600">
                📍 Location:
              </span>{" "}
              India
            </p>
            <p>
              <span className="font-semibold text-purple-600">📧 Email:</span>{" "}
              <a
                href="mailto:faizuddinshaikh55@gmail.com"
                className="text-purple-700 underline"
              >
                faizuddinshaikh55@gmail.com
              </a>
            </p>
            <p>
              <span className="font-semibold text-purple-600">📱 Mobile:</span>{" "}
              <a href="tel:+919960669724" className="text-purple-700 underline">
                +91 99606 69724
              </a>
            </p>
            <p>
              <span className="font-semibold text-purple-600">
                💼 Services:
              </span>{" "}
              Web & Mobile Apps, SEO, Hosting, UI/UX, Business Automation
            </p>

            <p>
              <span className="font-semibold text-purple-600">
                📷 Instagram:
              </span>{" "}
              <a
                href="https://www.instagram.com/iamfaizz55/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 underline"
              >
                @iamfaizz55
              </a>
            </p>
            <p>
              <span className="font-semibold text-purple-600">
                💼 LinkedIn:
              </span>{" "}
              <a
                href="https://www.linkedin.com/in/shaikh-faiz-3b7119270/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 underline"
              >
                /shaikh-faiz
              </a>
            </p>
            <p>
              <span className="font-semibold text-purple-600">🐙 GitHub:</span>{" "}
              <a
                href="https://github.com/iamfaiz55"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 underline"
              >
                @iamfaiz55
              </a>
            </p>
            <p>
              <span className="font-semibold text-purple-600">
                🕓 Availability:
              </span>{" "}
              Open to freelance, part-time & full-time roles
            </p>
          </div>
        </motion.div>

        {/* Right - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 bg-white rounded-xl shadow-md p-6 sm:p-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-5">
            Contact Form
          </h2>
          <form
            action="https://formspree.io/f/YOUR_FORMSPREE_ID"
            method="POST"
            className="space-y-4"
          >
            <div>
              <label
                className="block text-sm font-medium text-purple-700 mb-1"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your name"
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-purple-700 mb-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-purple-700 mb-1"
                htmlFor="phone"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-purple-700 mb-1"
                htmlFor="message"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Write your message..."
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 sm:py-3 bg-purple-600 text-white text-sm sm:text-base font-semibold rounded-md hover:bg-purple-700 transition"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
