import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const getUser = async (setCandidat, params) => {
  try {
    const { jobId, candidatId } = params;
    const docSnapshot = await getDoc(
      doc(db, "jobs", jobId, "applications", candidatId)
    );
    const data = docSnapshot.data();
    setCandidat(data);
  } catch (error) {}
};

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function CandidatDetail() {
  const [loading, setLoading] = useState(false);
  const { jobId, candidatId } = useParams();

  const [candidat, setCandidat] = useState(null);
  useEffect(() => {
    setLoading(true);
    getUser(setCandidat, { jobId, candidatId });
    setLoading(true);
    return () => {};
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="flex items-center gap-1 mb-5">
        <img src="/images/back-icon.svg" alt="back-icon" className="w-5" />
        <Link className="underline text-gray-500" to="/dashboard/job-posted">
          back to all candidats
        </Link>
      </div>
      {!loading ? (
        <div>
          <div className="flex gap-4 items-start">
            <div className="animate-pulse bg-gray-700 rounded-full w-20 h-20 flex-shrink-0"></div>
            <div className="flex flex-col gap-3">
              <div className="animate-pulse bg-gray-700  w-32 h-5 rounded-xl"></div>
              <div className="animate-pulse bg-gray-700  w-32 h-5 rounded-xl"></div>
              <div className="animate-pulse bg-gray-700  w-32 h-5 rounded-xl"></div>
            </div>
          </div>
          <div className="mx-auto animate-pulse bg-gray-700 w-50 h-40 mt-3 rounded-md"></div>
        </div>
      ) : (
        candidat && (
          <div className="mt-6">
            <div className="flex gap-4 items-start">
              <img
                src={
                  candidat?.photoUrl
                    ? candidat?.photoUrl
                    : "/images/photoUrl.svg"
                }
                alt="user-profile-image"
                className="rounded-full object-cover w-20 h-20 flex-shrink-0"
              />
              <div className="flex flex-col gap-3">
                <p className=" text-gray-600 font-medium ">
                  <span className="text-gray-600 capitalize">
                    {candidat.name} /{" "}
                  </span>
                  Email : {candidat.email}
                </p>
                <p className="text-gray-600 font-medium">
                  Date of Birth: {candidat.birthDate}
                </p>
              </div>
            </div>
            <p className="text-[16px] text-gray-600 mt-3">
              {candidat.coverLetter}
            </p>
          </div>
        )
      )}
      {/* {candidat && (
      
      )} */}
    </div>
  );
}
