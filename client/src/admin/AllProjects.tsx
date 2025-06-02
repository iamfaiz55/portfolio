import React from "react";
import { motion } from "framer-motion";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useGetAllProjectsQuery } from "../redux/projectApi";
import { useNavigate } from "react-router-dom";

const AllProjects: React.FC = () => {
  const { data, isLoading, isError } = useGetAllProjectsQuery();
  const navigate = useNavigate();
  const handleEdit = (id: string) => {
    console.log("Edit project:", id);
    navigate(`/admin/update-project/${id}`);
  };

  const handleDelete = (id: string) => {
    console.log("Delete project:", id);
  };

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (isError || !data)
    return (
      <div className="p-10 text-center text-red-500">
        Error loading projects.
      </div>
    );

  return (
    <section className="min-h-screen bg-purple-50 py-10 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-8">
          All Projects
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((project: any, index: number) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
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

                {/* Long Description */}
                <h3 className="text-md font-semibold text-purple-600 mb-1">
                  Long Description:
                </h3>
                <p className="text-gray-600 text-sm mb-3 whitespace-pre-line max-h-40 overflow-auto">
                  {project.desc || "No long description available."}
                </p>

                <div className="mb-3">
                  <p className="text-xs text-gray-500">
                    Duration: {project.duration}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 underline"
                  >
                    Visit Project
                  </a>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
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

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(project._id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md"
                  >
                    <AiOutlineEdit /> Edit
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(project._id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md"
                  >
                    <AiOutlineDelete /> Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProjects;
