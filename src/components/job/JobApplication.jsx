import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import Spinner from "../ui/Spinner";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../providers/AuthProvider";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function JobApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  // CHECK IF JOB APPLICATION IF ALREADY SUBMITTED

  const checkSubmission = async () => {
    try {
      const q = query(
        collection(db, "jobs", id, "applications"),
        where("email", "==", currentUser.email)
      );
      const querySnapshot = await getDocs(q);
      setAlreadySubmitted(!querySnapshot.empty);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getUserData = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", currentUser.email)
      );
      const docSnap = await getDocs(q);
      const data = docSnap.docs[0].data();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkSubmission();
    getUserData();
    return () => {};
  }, []);
  const formik = useFormik({
    initialValues: {
      coverLetter: "",
    },
    validationSchema: Yup.object({
      coverLetter: Yup.string()
        .required("Cover Letter is required")
        .min(50, "Cover Letter should be at least 50 characters")
        .max(500, "Cover Letter should not exceed 500 characters"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors, setStatus }) => {
      try {
        const submissionData = {
          ...values,
          name: currentUser.displayName,
          photoUrl: currentUser.photoURL,
          email: currentUser.email,
          occupation: user.occupation,
          birthDate: user.birthDate,
          postedAt: new Date().toISOString(),
        };

        await addDoc(
          collection(db, "jobs", id, "applications"),
          submissionData
        );

        navigate("/dashboard");
      } catch (e) {
        setStatus({ error: "Failed to post job" });
        setErrors("Failed to post job");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center"></div>
          <div className="">
            <Link
              className="underline flex items-center mb-5"
              to={`/dashboard/jobs/${id}`}
            >
              <img
                src="/images/back-icon.svg"
                className="w-5 object-contain me-2"
              />
              Back To Job
            </Link>

            {formik.status && (
              <p className="text-center bg-red-800 rounded-sm mb-4 py-1">
                {formik.status.error}
              </p>
            )}
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-600 text-sm font-medium mb-1"
                  htmlFor="coverLetter"
                >
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  type="text"
                  className={`form-input w-full text-gray-500 resize-none scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 h-40 ${
                    formik.touched.coverLetter && formik.errors.coverLetter
                      ? "border-red-600"
                      : "text-gray-300"
                  }`}
                  name="coverLetter"
                  placeholder="write your cover letter"
                  {...formik.getFieldProps("coverLetter")}
                />

                {formik.touched.coverLetter && formik.errors.coverLetter && (
                  <p className="text-red-600 text-sm mt-1">
                    {formik.errors.coverLetter}
                  </p>
                )}
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className={`flex btn w-full block ${
                    formik.isSubmitting
                      ? "bg-purple-300 text-purple-600 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  } ${alreadySubmitted && "disabled:bg-black"}`}
                  disabled={formik.isSubmitting || alreadySubmitted}
                >
                  {formik.isSubmitting ? (
                    <Spinner />
                  ) : alreadySubmitted ? (
                    "Submitted"
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
