import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../providers/AuthProvider";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "../ui/Spinner";

export default function JobPosting() {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      jobDescription: "",
      companyName: "",
      location: "",
      salary: "",
      category: "",
    },
    validationSchema: Yup.object({
      jobTitle: Yup.string()
        .trim()
        .min(3, "Job Title should be at least 3 characters")
        .max(50, "Job Title cannot exceed 50 characters")
        .required("Job Title is required"),
      jobDescription: Yup.string()
        .trim()
        .min(10, "Job Description should be at least 10 characters")
        .max(500, "Job Description cannot exceed 500 characters")
        .required("Job Description is required"),
      companyName: Yup.string()
        .trim()
        .min(3, "Company Name should be at least 3 characters")
        .max(50, "Company Name cannot exceed 50 characters")
        .required("Company Name is required"),
      location: Yup.string()
        .trim()
        .min(3, "Location should be at least 3 characters")
        .max(50, "Location cannot exceed 50 characters")
        .required("Location is required"),
      salary: Yup.string()
        .matches(/^\d+(\.\d{1,2})?$/, "Invalid Salary format")
        .required("Salary is required"),
      category: Yup.string().required("Category is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError("");
        const docSnap = await addDoc(collection(db, "jobs"), {
          ...values,
          postedBy: currentUser.uid,
          photoURL: currentUser.photoURL,
          postedAt: new Date().toISOString(),
        });
        navigate(`/dashboard/jobs/${docSnap.id}`);
      } catch (error) {
        console.error("Error posting job:", error);
        setError("Failed to post job");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h2 className="text-center text-2xl font-semibold mb-6">Post a Job</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="mx-11 md:mx-20 lg:space-y-4 lg:mx-0"
      >
        <div>
          <label
            htmlFor="jobTitle"
            className="block text-sm font-medium text-gray-300 mb-3"
          >
            Job Title
          </label>
          <input
            id="jobTitle"
            type="text"
            className="form-input w-full"
            {...formik.getFieldProps("jobTitle")}
          />
          {formik.touched.jobTitle && formik.errors.jobTitle && (
            <p className="text-red-600 text-sm mt-1">
              {formik.errors.jobTitle}
            </p>
          )}
        </div>

        {/* Occupation */}
        <div>
          <label
            htmlFor="jobDescription"
            className="block text-sm font-medium text-gray-300 mb-3"
          >
            Job Description
          </label>
          <input
            id="jobDescription"
            type="text"
            className="form-input w-full"
            {...formik.getFieldProps("jobDescription")}
          />
          {formik.touched.jobDescription && formik.errors.jobDescription && (
            <p className="text-red-600 text-sm mt-1">
              {formik.errors.jobDescription}
            </p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-300 mb-3"
          >
            Company Name
          </label>
          <input
            id="companyName"
            type="text"
            className="form-input w-full"
            {...formik.getFieldProps("companyName")}
          />
          {formik.touched.companyName && formik.errors.companyName && (
            <p className="text-red-600 text-sm mt-1">
              {formik.errors.companyName}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-300 mb-3"
          >
            Location
          </label>
          <input
            id="location"
            type="text"
            className="form-input w-full"
            {...formik.getFieldProps("location")}
          />
          {formik.touched.location && formik.errors.location && (
            <p className="text-red-600 text-sm mt-1">
              {formik.errors.location}
            </p>
          )}
        </div>

        {/* Salary */}
        <div>
          <label
            htmlFor="salary"
            className="block text-sm font-medium text-gray-300 mb-3"
          >
            Salary
          </label>
          <input
            id="salary"
            type="text"
            className="form-input w-full"
            {...formik.getFieldProps("salary")}
          />
          {formik.touched.salary && formik.errors.salary && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.salary}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300 mb-3"
          >
            Category
          </label>
          <select
            id="category"
            className="form-select w-full bg-gray-900"
            {...formik.getFieldProps("category")}
          >
            <option value="">Select Category</option>
            <option value="all">All</option>
            <option value="technology">Technology</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="finance">Finance</option>
            <option value="sales">Sales</option>
            <option value="customer-service">Customer Service</option>
            <option value="administration">Administration</option>
            <option value="human-resources">Human Resources</option>
            <option value="operations">Operations</option>
            <option value="legal">Legal</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="research">Research</option>
            <option value="manufacturing">Manufacturing</option>
            {/* Add other options as needed */}
          </select>
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-600 text-sm mt-1">
              {formik.errors.category}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`mt-7 btn w-full ${
            formik.isSubmitting
              ? "bg-purple-300 text-purple-600 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <Spinner /> : "Post Job"}
        </button>
      </form>
    </div>
  );
}
