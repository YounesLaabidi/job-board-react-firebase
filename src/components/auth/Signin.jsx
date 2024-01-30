import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { useFormik } from "formik";
import Spinner from '../ui/Spinner'

import * as Yup from "yup";

export default function Signin() {
  const { signin } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError("");
        await signin(values.email, values.password);
        navigate("/dashboard");
      } catch (error) {
        setError("Failed to sign in");
      }
      setSubmitting(false);
    },
  });

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-16 pb-12 md:pt-20  md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Sign In</h1>
          </div>
          <div className="max-w-sm mx-auto">
            {error && (
              <p className="text-center bg-red-800 rounded-sm mb-4 py-1">
                {error}
              </p>
            )}

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-300 text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  autoComplete="off"
                  id="email"
                  type="email"
                  className={`form-input w-full ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-600"
                      : "text-gray-300"
                  }`}
                  placeholder="you@yourcompany.com"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-300 text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  className={`form-input w-full ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-600"
                      : "text-gray-300"
                  }`}
                  placeholder="Enter your password"
                  type="password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="flex justify-end mb-4">
                <Link
                  to="/reset-password"
                  className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className={`btn w-full ${
                    formik.isSubmitting
                      ? "bg-purple-300 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? <Spinner /> : "Sign in"}
                </button>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
