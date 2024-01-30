import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { storage } from "../../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import Spinner from '../ui/Spinner'
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../providers/AuthProvider";
import { useFormik } from "formik";
import * as Yup from "yup";

import { updateProfile } from "firebase/auth";
import FileInput from "../ui/FileInput";
import { getImageURL } from "../../firebase/getImageURL";
export default function CreateProfile() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      occupation: "",
      birthDate: "",
      accountType: "employee",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(2, "Name is too short"),
      occupation: Yup.string().required("Occupation is required"),
      birthDate: Yup.date()
        .required("Birth date is required")
        .max(new Date(), "Birth date cannot be in the future"),
      accountType: Yup.string()
        .required("Account type is required")
        .oneOf(["employee", "employer"], "Invalid account type"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError("");
        if (image) {
          const url = await getImageURL(fileName);

          await setDoc(doc(db, "users", currentUser.uid), {
            ...values,
            email: currentUser.email,
            uid: currentUser.uid,
            image: url,
          });
          await updateProfile(currentUser, {
            displayName: values.name,
            photoURL: url,
          });
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        setError("Failed to update profile");
      } finally {
        setSubmitting(false); // Moved inside the finally block
      }
    },
  });

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2">Account Completion</h2>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={formik.handleSubmit}>
              {/* Image */}
              <div className="mb-4">
                <FileInput
                  image={image}
                  setImage={setImage}
                  fileName={fileName}
                  setFileName={setFileName}
                />
              </div>

              {/* Full Name */}
              <div className="mb-4">
                <label
                  className="block text-gray-600 text-sm font-medium mb-1"
                  htmlFor="full-name"
                >
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="full-name"
                  type="text"
                  className="form-input w-full text-gray-600"
                  name="name"
                  placeholder="Name"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              {/* Occupation */}
              <div className="mb-4">
                <label
                  className="block text-gray-600 text-sm font-medium mb-1"
                  htmlFor="occupation"
                >
                  Occupation <span className="text-red-600">*</span>
                </label>
                <input
                  id="occupation"
                  type="text"
                  className="form-input w-full text-gray-600"
                  name="occupation"
                  placeholder="Occupation"
                  {...formik.getFieldProps("occupation")}
                />
                {formik.touched.occupation && formik.errors.occupation && (
                  <p className="text-red-600 text-sm mt-1">
                    {formik.errors.occupation}
                  </p>
                )}
              </div>

              {/* Birth Date */}
              <div className="mb-4">
                <label
                  className="block text-gray-600 text-sm font-medium mb-1"
                  htmlFor="birth-date"
                >
                  Birth Date <span className="text-red-600">*</span>
                </label>
                <input
                  id="birth-date"
                  type="date"
                  className="form-input w-full text-gray-600"
                  name="birthDate"
                  {...formik.getFieldProps("birthDate")}
                />
                {formik.touched.birthDate && formik.errors.birthDate && (
                  <p className="text-red-600 text-sm mt-1">
                    {formik.errors.birthDate}
                  </p>
                )}
              </div>

              {/* Account Type */}
              <div className="mb-4">
                <label
                  className="block text-gray-600 text-sm font-medium mb-1"
                  htmlFor="account-type"
                >
                  Account Type <span className="text-red-600">*</span>
                </label>
                <select
                  id="account-type"
                  className="form-select w-full text-gray-600"
                  name="accountType"
                  {...formik.getFieldProps("accountType")}
                >
                  <option value="employee">Employee</option>
                  <option value="employer">Employer</option>
                </select>
                {formik.touched.accountType && formik.errors.accountType && (
                  <p className="text-red-600 text-sm mt-1">
                    {formik.errors.accountType}
                  </p>
                )}
              </div>
              {/* Save button */}
              <div className="flex flex-wrap mt-5">
                <div className="w-full">
                  <button
                    type="submit"
                    className={`btn w-full block ${
                      formik.isSubmitting
                        ? "bg-purple-300 text-purple-600 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700"
                    }`}
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? <Spinner /> : "Save"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
