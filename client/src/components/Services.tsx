import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Static Website Generation",
    description:
      "Creating lightning-fast static websites optimized for performance and SEO.",
  },
  {
    title: "Dynamic Website Management",
    description:
      "Admin-panel based websites with real-time content control — ideal for businesses managing pages, users, media, and blogs without coding.",
  },
  {
    title: "Enterprise Software Solutions",
    description:
      "Custom software for shopping, tasks, hospitals, inventory, and organizations — streamlining operations and boosting productivity.",
  },
  {
    title: "Mobile Application",
    description:
      "High-quality cross-platform mobile apps for iOS and Android with modern UI and performance.",
  },
  {
    title: "Domain & SEO",
    description:
      "Register domains and boost your site’s ranking with expert SEO techniques.",
  },
  {
    title: "Hosting Solutions",
    description:
      "Reliable, secure hosting tailored to your app or website's demands — fast, scalable, and supported.",
  },
  {
    title: "Computer Application & PWA",
    description:
      "Desktop apps and installable Progressive Web Apps for smooth, cross-device experiences.",
  },
  {
    title: "Google Business Profile Setup",
    description:
      "Professional Google Business setup to help you appear on Maps and Search results.",
  },
  {
    title: "Google Ads Campaigns",
    description:
      "Targeted Google Ads to increase traffic and drive quality leads to your business.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100,
      damping: 14,
    },
  }),
  hover: {
    scale: 1.03,
    boxShadow:
      "0 10px 20px rgba(139, 92, 246, 0.3), 0 4px 8px rgba(139, 92, 246, 0.2)",
  },
};

const Services = () => {
  return (
    <section
      className="min-h-screen bg-gradient-to-b from-white to-purple-100 py-14 px-4 sm:px-6"
      id="services"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-purple-800 mb-10">
        My Services
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {services.map(({ title, description }, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl p-5 sm:p-6 shadow hover:shadow-lg transition-all cursor-pointer"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            whileHover="hover"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-purple-900 mb-2">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-gray-700">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
