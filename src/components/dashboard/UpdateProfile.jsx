import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../../providers/AuthProvider";
import FileInput from "../ui/FileInput";
import { getImageURL } from "../../firebase/getImageURL";
import Spinner from '../ui/Spinner'
export default function UpdateProfile() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { user } = useOutletContext();

  const formik = useFormik({
    initialValues: {
      name: currentUser?.displayName || "",
      occupation: user?.occupation || "",
      birthDate: user?.birthDate || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(2, "Name is too short"),
      occupation: Yup.string().required("Occupation is required"),
      birthDate: Yup.date()
        .required("Birth date is required")
        .max(new Date(), "Birth date cannot be in the future"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError("");
        if (image) {
          const docRef = doc(db, "users", user.docId);

          const url = await getImageURL(fileName);

          await updateDoc(docRef, { ...values, image: url });
          await updateProfile(currentUser, {
            displayName: values.name,
            photoURL: url,
          });
          navigate("/dashboard");
        }
      } catch (error) {
        setError("Failed to update profile");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-3 pb-3 md:pt-5 md:pb-5">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-5 md:pb-5">
            <h2 className="h2">Account Completion</h2>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            {error && (
              <p className="text-center bg-red-800 rounded-sm mb-4 py-1">
                {error}
              </p>
            )}
            <form onSubmit={formik.handleSubmit}>
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
              {/* <div className="mb-4">
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
              </div> */}

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
