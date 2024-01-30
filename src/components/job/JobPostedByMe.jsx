import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";

async function getPostedJobs(currentUser, setLoading, setPostedJobs) {
  try {
    setLoading(true);
    const querySnapshot = await getDocs(
      query(collection(db, "jobs"), where("postedBy", "==", currentUser.uid))
    );
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostedJobs(data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}

export default function JobPostedByMe() {
  const { currentUser } = useAuth();
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPostedJobs(currentUser, setLoading, setPostedJobs);

    return () => {};
  }, []);

  const deleteFirestoreDoc = async (id) => {
    try {
      try {
        await deleteDoc(doc(db, "jobs", id));
        const updatedPostedJob = postedJobs.filter((item) => item.id !== id);

        setPostedJobs(updatedPostedJob);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {loading ? (
        <div>
              <div className="mx-auto animate-pulse bg-gray-700 rounded-md w-[80%]  h-32  md:ms-5 mb-2" ></div>
			   <div className="mx-auto animate-pulse bg-gray-700 rounded-md w-[80%]  h-32  md:ms-5 mb-2" ></div>
			    <div className="mx-auto animate-pulse bg-gray-700 rounded-md w-[80%]  h-32 md:ms-5 mb-2" ></div>
			  
			  </div>

      ) : (
        <>
          {postedJobs.length > 0 ? (
            postedJobs.map((c) => {
              return (
                <div
                  key={c.id}
                  className=" mb-3 max-w-2xl border-2 border-gray-800 bg-gray-900 relative mx-4 hover:border-green-600 cursor-pointer rounded-md px-7 py-6 w-full"
                >
                  <div className="flexitems-center border-gray-700 w-full pt-4">
                    <div className="flex justify-between gap-4 items-start">
                      <span className="flex flex-col gap-1">
                        <p className="font-medium capitalize text-gray-700">
                          {c.jobTitle}
                        </p>
                        <p className="font-normal text-gray-400 text-sm">
                          {c.companyName}
                        </p>
                      </span>
                      <span className="flex flex-col gap-1">
                        <p className="font-medium capitalize text-gray-700">
                          {c.category}
                        </p>
                        <p className="font-normal text-gray-400 text-sm">
                          {c.location}
                        </p>
                      </span>
                      <span>
                        <p className="font-medium capitalize text-gray-700">
                          {c.salary}$
                        </p>{" "}
                      </span>
                    </div>{" "}
                  </div>
                  <div className="absolute top-2 right-3 flex gap-1 w-fit justify-end">
                    <Link to={`/dashboard/job-posted/${c.id}`}>
                      <img
                        src="/images/enter-icon.svg"
                        alt="enter-icon"
                        className="w-6"
                      />
                    </Link>

                    <Link>
                      <img
                        src="/images/edit-icon.svg"
                        alt="edit-icon"
                        className="w-6"
                      />
                    </Link>
                    <button onClick={() => deleteFirestoreDoc(c.id)}>
                      <img
                        src="/images/delete-icon.svg"
                        alt="delete-icon"
                        className="w-6"
                      />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="mx-4 mt-4">No Applications yet!</h1>
          )}
        </>
      )}
    </div>
  );
}
