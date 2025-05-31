import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A modern personal portfolio built with React, TailwindCSS, and Framer Motion.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60",
    link: "https://your-portfolio.vercel.app",
  },
  {
    title: "Chat App",
    description:
      "Real-time chat app using Socket.io, Redis, and Express.js backend.",
    image:
      "https://plus.unsplash.com/premium_photo-1684769161054-2fa9a998dcb6?w=600&auto=format&fit=crop&q=60",
    link: "https://your-chatapp.vercel.app",
  },
  {
    title: "Blog CMS",
    description:
      "A full-stack blog platform powered by PostgreSQL and Next.js.",
    image:
      "https://media.istockphoto.com/id/1464672040/photo/business-and-finance.webp?s=612x612",
    link: "https://your-blogcms.vercel.app",
  },
  {
    title: "Task Manager",
    description:
      "Minimal task tracking tool built with React and Zustand for state management.",
    image:
      "https://media.istockphoto.com/id/2149038061/photo/hand-business-and-sticky-note.webp?s=612x612",
    link: "https://your-taskmanager.vercel.app",
  },
  {
    title: "Dev Tools Dashboard",
    description:
      "Interactive dashboard with developer productivity tools, built with Next.js.",
    image:
      "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=600&auto=format&fit=crop&q=60",
    link: "https://your-devtools.vercel.app",
  },
];

const Projects = () => {
  return (
    <section
      className="min-h-screen bg-gradient-to-b from-purple-100 to-white py-14 px-4 sm:px-6"
      id="projects"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-purple-700 mb-10">
        My Projects
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <motion.a
            href={project.link}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
            className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transform-gpu transition-shadow duration-300"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 sm:h-44 object-cover"
            />
            <div className="p-4 sm:p-5">
              <h3 className="text-lg sm:text-xl font-semibold text-purple-800 mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
