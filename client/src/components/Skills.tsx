import React from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaDatabase,
  FaGithub,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiTailwindcss,
  SiRedux,
  SiExpo,
  SiFirebase,
  SiRedis,
  SiSocketdotio,
  SiExpress,
  SiPostgresql,
  SiVercel,
} from "react-icons/si";

const skills = [
  { name: "React", icon: <FaReact className="text-blue-500" /> },
  { name: "React Native", icon: <FaReact className="text-sky-500" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
  { name: "JavaScript", icon: <FaJsSquare className="text-yellow-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-700" /> },
  { name: "HTML5", icon: <FaHtml5 className="text-orange-600" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-600" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-700" /> },
  { name: "Vercel", icon: <SiVercel className="text-black" /> },

  { name: "Redis", icon: <SiRedis className="text-red-600" /> },
  { name: "Socket.IO", icon: <SiSocketdotio className="text-black" /> },
  { name: "Express.js", icon: <SiExpress className="text-gray-700" /> },
  { name: "Git", icon: <FaGitAlt className="text-red-500" /> },
  { name: "GitHub", icon: <FaGithub className="text-black" /> },
  { name: "Expo", icon: <SiExpo className="text-gray-700" /> },
  { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
  { name: "Redux", icon: <SiRedux className="text-indigo-600" /> },
];

const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="py-24 px-6 bg-gradient-to-b from-white via-purple-100 to-purple-200"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-purple-700 mb-10">
          My Skillset
        </h2>

        <p className="text-gray-600 mb-14 text-lg sm:text-xl max-w-2xl mx-auto">
          From backend infrastructure to frontend finesse — these are the tools
          I use to craft scalable, reliable, and beautiful applications.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center justify-center p-4 bg-white/90 backdrop-blur-sm shadow-md rounded-2xl hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300"
              whileHover={{ scale: 1.06 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="text-3xl sm:text-4xl mb-2">{skill.icon}</div>
              <div className="text-sm font-medium text-gray-700 text-center">
                {skill.name}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
