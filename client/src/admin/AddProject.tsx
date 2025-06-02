import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import {
  useAddProjectMutation,
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
} from "../redux/projectApi";
import {
  PlusIcon,
  XMarkIcon,
  CloudArrowUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

interface IProjectForm {
  _id?: string;
  name: string;
  desc: string;
  shortDesc: string;
  image?: FileList | string | null;
  tech: string[];
  duration: string;
  link?: string | null;
}

// Update the Yup schema to match the interface exactly
const schema = yup.object().shape({
  name: yup.string().required("Project name is required"),
  desc: yup
    .string()
    .required("Description is required")
    .min(50, "Description should be at least 50 characters"),
  shortDesc: yup.string().required("Short description is required"),
  tech: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one technology is required")
    .required("Technologies are required"),
  duration: yup.string().required("Duration is required"),
  link: yup.string().url("Please enter a valid URL").nullable().optional(),
  image: yup.mixed<any>().nullable().optional(),
});

const AddProject = () => {
  const { id: projectId } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { data: existingProject } = useGetSingleProjectQuery(projectId || "", {
    skip: !projectId,
  });
  console.log("existingProject", existingProject);

  const [addProject, { isSuccess: addSuccess, isLoading: addLoading }] =
    useAddProjectMutation();
  const [
    updateProject,
    { isSuccess: updateSuccess, isLoading: updateLoading },
  ] = useUpdateProjectMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
    watch,
    reset,
  } = useForm<IProjectForm>({
    resolver: yupResolver(schema) as Resolver<IProjectForm>,
    defaultValues: {
      name: "",
      desc: "",
      shortDesc: "",
      tech: [],
      duration: "",
      link: null,
    },
  });

  const imageFile = watch("image");
  const techArray = watch("tech") || [];

  useEffect(() => {
    if (existingProject) {
      reset({
        ...existingProject,
        // Handle existing image if it's a string (URL)
        image: existingProject.image,
      });
    }
  }, [existingProject, reset]);

  useEffect(() => {
    if (addSuccess || updateSuccess) {
      navigate("/admin/projects"); // Redirect after success
    }
  }, [addSuccess, updateSuccess, navigate]);

  const onSubmit = async (data: IProjectForm) => {
    const formData = new FormData();
    console.log("data :", data);

    // Append all fields
    formData.append("name", data.name);
    formData.append("desc", data.desc);
    formData.append("shortDesc", data.shortDesc);
    formData.append("duration", data.duration);
    formData.append("tech", JSON.stringify(data.tech));

    // Optional fields
    if (data.link) formData.append("link", data.link);

    // Handle image upload
    if (data.image instanceof FileList && data.image.length > 0) {
      formData.append("image", data.image[0]);
    } else if (typeof data.image === "string") {
      // If editing and keeping existing image
      formData.append("existingImage", data.image);
    }

    try {
      if (projectId) {
        await updateProject({
          id: projectId,
          data: formData,
        }).unwrap();
      } else {
        await addProject(formData).unwrap();
      }
      // Handle success (navigate, show toast, etc.)
    } catch (error) {
      // Handle error
      console.error("Failed to submit project:", error);
    }
  };
  const handleAddTech = () => {
    const techInput = (
      document.getElementById("tech-input") as HTMLInputElement
    ).value;
    if (techInput && !techArray.includes(techInput)) {
      setValue("tech", [...techArray, techInput]);
      (document.getElementById("tech-input") as HTMLInputElement).value = "";
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    setValue(
      "tech",
      techArray.filter((tech) => tech !== techToRemove)
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg"
    >
      <h2 className="text-3xl font-bold text-purple-800 mb-8">
        {projectId ? "Edit Project" : "Add New Project"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Project Name<span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition duration-200 ${
              errors.name
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-purple-500 focus:ring-purple-200"
            }`}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label
            htmlFor="shortDesc"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Short Description<span className="text-red-500">*</span>
          </label>
          <textarea
            id="shortDesc"
            rows={3}
            {...register("shortDesc")}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition duration-200 ${
              errors.shortDesc
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-purple-500 focus:ring-purple-200"
            }`}
          />
          {errors.shortDesc && (
            <p className="mt-2 text-sm text-red-600">
              {errors.shortDesc.message}
            </p>
          )}
        </div>

        {/* Full Description */}
        <div>
          <label
            htmlFor="desc"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Description<span className="text-red-500">*</span>
          </label>
          <textarea
            id="desc"
            rows={5}
            {...register("desc")}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition duration-200 ${
              errors.desc
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-purple-500 focus:ring-purple-200"
            }`}
          />
          {errors.desc && (
            <p className="mt-2 text-sm text-red-600">{errors.desc.message}</p>
          )}
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Technologies<span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <input
              id="tech-input"
              type="text"
              className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition duration-200"
              placeholder="Add technology"
            />
            <button
              type="button"
              onClick={handleAddTech}
              className="inline-flex items-center px-5 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
          <input type="hidden" {...register("tech")} />
          {errors.tech && (
            <p className="mt-2 text-sm text-red-600">{errors.tech.message}</p>
          )}

          {/* Tech Tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {techArray.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center pl-3 pr-2 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveTech(tech)}
                  className="ml-1.5 text-purple-500 hover:text-purple-700 rounded-full p-0.5 hover:bg-purple-200 transition duration-200"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Duration<span className="text-red-500">*</span>
          </label>
          <input
            id="duration"
            type="text"
            {...register("duration")}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition duration-200 ${
              errors.duration
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-purple-500 focus:ring-purple-200"
            }`}
            placeholder="e.g., 2 weeks, 1 month"
          />
          {errors.duration && (
            <p className="mt-2 text-sm text-red-600">
              {errors.duration.message}
            </p>
          )}
        </div>

        {/* Project Link */}
        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Project Link (optional)
          </label>
          <input
            id="link"
            type="url"
            {...register("link")}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition duration-200 ${
              errors.link
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-purple-500 focus:ring-purple-200"
            }`}
            placeholder="https://example.com"
          />
          {errors.link && (
            <p className="mt-2 text-sm text-red-600">{errors.link.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Project Image{" "}
            {!projectId && <span className="text-red-500">*</span>}
          </label>
          <div className="flex items-center gap-4">
            <label
              htmlFor="image"
              className="flex-1 cursor-pointer px-4 py-3 border-2 border-dashed rounded-lg hover:border-purple-500 transition duration-200"
            >
              <div className="flex flex-col items-center justify-center text-center">
                <CloudArrowUpIcon className="w-8 h-8 text-purple-500 mb-2" />
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-purple-600 hover:text-purple-500">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
              <input
                id="image"
                type="file"
                accept="image/*"
                {...register("image")}
                className="hidden"
              />
            </label>
          </div>
          {errors.image && (
            <p className="mt-2 text-sm text-red-600">{errors.image.message}</p>
          )}

          {/* Image Preview */}
          <div className="mt-4">
            {imageFile instanceof FileList && imageFile.length > 0 && (
              <div className="relative w-full max-w-xs">
                <img
                  src={URL.createObjectURL(imageFile[0])}
                  alt="Preview"
                  className="h-40 w-full object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => resetField("image")}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition duration-200"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
            {typeof imageFile === "string" && imageFile && (
              <div className="relative w-full max-w-xs">
                <img
                  src={imageFile}
                  alt="Current"
                  className="h-40 w-full object-cover rounded-lg border"
                />
                <p className="text-sm text-gray-500 mt-1">Current image</p>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={addLoading || updateLoading}
            className="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed transition duration-200"
          >
            {addLoading || updateLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {projectId ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                {projectId ? (
                  <>
                    <PencilSquareIcon className="w-5 h-5 mr-2" />
                    Update Project
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Create Project
                  </>
                )}
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddProject;
