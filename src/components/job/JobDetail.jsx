import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
export default function JobDetail() {
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const checkSubmission = async () => {
    try {
      const docRef = doc(db, "jobs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().postedBy === currentUser.uid) {
        setAlreadySubmitted(true);
      } else {
        const q = query(
          collection(db, "jobs", id, "applications"),
          where("email", "==", currentUser.email)
        );
        const querySnapshot = await getDocs(q);
        setAlreadySubmitted(!querySnapshot.empty);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const getJobDetail = async () => {
    try {
      const docRef = doc(db, "jobs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setJob(docSnap.data());
      } else {
        throw new Error("No such document!");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    setLoading(true);
    getJobDetail();
    checkSubmission();
    setLoading(false);
    return () => {};
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="flex gap-2">
        <img src="/images/back-icon.svg" alt="back-icon" className="w-4" />
        <Link className="underline " to="/dashboard/">
          Back To All Jobs
        </Link>
      </div>
      <div className="">
        {!loading ? (
          <div className="">
            {job && (
              <div className="mt-6 max-w-xl">
                <div className="flex gap-4 items-start">
                  <img
                    src={job?.photoURL ? job.photoURL : "/images/photoUrl.svg"}
                    alt="user-profile-image"
                    className="rounded-full object-cover w-20 h-20 flex-shrink-0"
                  />
                  <div className="flex flex-col gap-3">
                    <h2 className="text-gray-500 text-xl capitalize">
                      {job.jobTitle}
                    </h2>
                    <h4 className="">
                      <span
                        style={{ fontSize: "14px" }}
                        className="capitalize text-gray-500 mb-4"
                      >
                        {job.category}
                      </span>
                      <span
                        style={{ fontSize: "14px" }}
                        className="capitalize text-gray-500 mb-4"
                      >
                        {", "}
                        {job.location}
                      </span>
                      <span
                        style={{ fontSize: "14px" }}
                        className="capitalize text-gray-500 mb-4"
                      >
                        {", "}
                        {job.salary}
                        {"$"}
                      </span>
                    </h4>
                    <p className="w-full pb-3">{job.jobDescription}</p>
                    <Link
                      className={`bg-green-600 py-2 px-8 rounded-sm ${
                        alreadySubmitted &&
                        "pointer-events-none bg-zinc-700 ms-auto"
                      }`}
                      to={`/dashboard/jobs/${id}/apply`}
                    >
                      apply
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-6 max-w-xl">
            <div className="flex gap-4 items-start">
              <div className="animate-pulse bg-gray-700 rounded-full w-20 h-20 flex-shrink-0"></div>
              <div className="flex flex-col gap-3">
                <div className="animate-pulse bg-gray-700  w-40 h-5 rounded-xl"></div>
                <div className="animate-pulse bg-gray-700  w-40 h-5 rounded-xl"></div>
                <div className="animate-pulse bg-gray-700  w-40 h-5 rounded-xl"></div>
                <div className="animate-pulse bg-gray-700  w-full h-32 rounded-xl"></div>
                <div className="animate-pulse bg-gray-700  w-24 h-10 ms-auto rounded-xl"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
