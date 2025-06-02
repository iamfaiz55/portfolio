// import React from "react";
import { motion } from "framer-motion";
import { IContact } from "../redux/userApi";

// Replace this with actual fetched data
const contacts: IContact[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    message: "I have a query about your services.",
    mobile: "1234567890",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    message: "Interested in collaboration.",
    mobile: "9876543210",
  },
];

const Contacts = () => {
  return (
    <section className="min-h-screen bg-purple-50 py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center">
          Contact Queries
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-purple-100"
            >
              <h2 className="text-xl font-semibold text-purple-800 mb-2">
                {contact.name}
              </h2>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-semibold text-purple-600">Email:</span>{" "}
                {contact.email}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-semibold text-purple-600">Mobile:</span>{" "}
                {contact.mobile}
              </p>
              <p className="text-sm text-gray-700 mt-3">
                <span className="font-semibold text-purple-600">Message:</span>{" "}
                {contact.message}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contacts;
