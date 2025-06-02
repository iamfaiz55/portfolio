import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleProjectQuery } from "../redux/projectApi";
// import Navbar from "./Navbar";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Make sure to pass non-null id to query
  const {
    data: project,
    isLoading,
    isError,
  } = useGetSingleProjectQuery(id ?? "");

  if (isLoading)
    return <p className="text-center py-10 text-purple-700">Loading...</p>;

  if (isError || !project)
    return (
      <p className="text-center py-10 text-red-600 font-medium">
        Project not found.
      </p>
    );

  const imageSrc =
    typeof project.image === "string"
      ? project.image
      : project.image && project.image.length > 0
      ? URL.createObjectURL(project.image[0]) // if it's a FileList, use first file as URL
      : ""; // fallback to empty string

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 sm:p-10">
          {/* Image */}
          <div className="w-full h-48 sm:h-64 md:h-80 rounded-lg overflow-hidden mb-8">
            <img
              src={imageSrc}
              alt={project.name}
              className="w-full h-full object-contain object-center"
            />
          </div>

          {/* Project Name */}
          <h1 className="text-4xl font-extrabold text-purple-900 mb-6 leading-tight">
            {project.name}
          </h1>

          {/* Short Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-purple-700 mb-3">
              Short Description
            </h2>
            <p className="text-gray-800 whitespace-pre-line leading-relaxed">
              {project.shortDesc ?? "No short description provided."}
            </p>
          </section>

          {/* Full Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-purple-700 mb-3">
              Project Details
            </h2>
            <div
              className="text-gray-800 whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100"
              style={{ scrollbarWidth: "thin" }}
            >
              {project.desc ?? "No description available."}
            </div>
          </section>

          {/* Duration and Link */}
          <section className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-purple-700">Duration:</span>{" "}
              {project.duration ?? "N/A"}
            </p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-600 underline hover:text-purple-800 transition"
              >
                Visit Live Project
              </a>
            )}
          </section>

          {/* Tech Stack */}
          {project.tech?.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-purple-700 mb-4">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((item, index) => {
                  try {
                    const parsed = JSON.parse(item);
                    return (
                      <span
                        key={index}
                        className="px-4 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                      >
                        {parsed}
                      </span>
                    );
                  } catch {
                    return (
                      <span
                        key={index}
                        className="px-4 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                      >
                        {item}
                      </span>
                    );
                  }
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Details;
