// import React from "react";
import { motion } from "framer-motion";
// import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import { useNavigate } from "react-router-dom";
import { useGetAllProjectsQuery } from "../redux/projectApi";

const Projects = () => {
  const { data, isLoading, isError } = useGetAllProjectsQuery();
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError || !data)
    return (
      <p className="text-center text-red-500 py-10">Failed to load projects.</p>
    );

  return (
    <section
      className="min-h-screen bg-gradient-to-b from-purple-100 to-white py-14 px-4 sm:px-6"
      id="projects"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-10">
        My Projects
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {data.map((project: any, index: number) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(`/project-details/${project._id}`)}
            className="cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform-gpu"
          >
            <div className="w-full h-48 bg-gray-200 overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-5">
              <h2 className="text-xl font-semibold text-purple-800 mb-2">
                {project.name}
              </h2>

              {/* Short Description */}
              <h3 className="text-md font-semibold text-purple-600 mb-1">
                Short Description:
              </h3>
              <p className="text-gray-700 text-sm mb-3 whitespace-pre-line">
                {project.shortDesc || "No short description available."}
              </p>

              {/* Duration & Link */}
              {/* <div className="mb-3 text-sm text-gray-500">
                <p>Duration: {project.duration}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit Project
                </a>
              </div> */}

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {(project.tech || []).map((item: string, i: number) => {
                  try {
                    const parsed = JSON.parse(item);
                    return (
                      <span
                        key={i}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        {parsed}
                      </span>
                    );
                  } catch {
                    return (
                      <span
                        key={i}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        {item}
                      </span>
                    );
                  }
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
