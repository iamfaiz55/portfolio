import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaJsSquare } from "react-icons/fa";

const typingText =
  "I’m a Full Stack Engineer experienced with the MERN stack, React Native, and microservices architecture. Skilled in modern JavaScript, TypeScript, and building scalable, responsive web and mobile apps with clean, efficient code.";

const keywords = [
  "Full Stack Engineer",
  "MERN stack",
  "React Native",
  "microservices architecture",
  "clean, efficient code",
  "responsive design",
  "fast-paced teams",
  "impactful digital products",
];

const HeroSection: React.FC = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < typingText.length - 1) {
        setDisplayedText((prev) => prev + typingText[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const renderHighlightedText = () => {
    if (!displayedText) return null;
    let result = displayedText;
    keywords.forEach((keyword) => {
      result = result.replace(
        new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
        '<span class="text-purple-700 font-semibold hover:underline hover:brightness-125 transition duration-300">$&</span>'
      );
    });
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-b from-purple-100 via-purple-50 to-white flex items-center px-6 py-16">
      {/* Background blob */}
      <motion.div
        className="absolute w-[40rem] h-[40rem] bg-purple-300/20 rounded-full blur-3xl z-0"
        animate={{ x: [0, 100, -100, 0], y: [0, 50, -50, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />

      {/* Floating Icons */}
      <motion.div
        className="absolute top-10 left-10 text-purple-500"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        <FaReact size={40} />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 text-green-600"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        <FaNodeJs size={40} />
      </motion.div>
      <motion.div
        className="absolute bottom-16 left-12 text-yellow-500"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <FaJsSquare size={35} />
      </motion.div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 w-full relative z-10">
        {/* Left */}
        <motion.div
          className="text-gray-900 basis-[70%] max-w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-snug">
            Hi, I'm{" "}
            <span className="text-purple-700 animate-text-glow">
              Shaikh Faiz
            </span>
          </h1>

          <motion.div
            className="mb-6 text-lg sm:text-xl leading-relaxed whitespace-pre-wrap border-l-4 border-purple-500 pl-4 glow-typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            {renderHighlightedText()}
            {isTyping && (
              <motion.span
                className="inline-block w-1 h-7 bg-purple-700 ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            )}
          </motion.div>

          {/* Optional Call-to-Action Button */}
          <motion.a
            href="#projects"
            className="inline-block mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
        </motion.div>

        {/* Right */}
        <motion.div
          className="flex justify-center md:justify-end basis-[30%]"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 15, delay: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
            className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-8 border-purple-300 shadow-xl"
          >
            <img
              src="https://res.cloudinary.com/dpc5d15ci/image/upload/v1748432329/my_image_yl6p9r.jpg"
              alt="Shaikh Faiz"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
