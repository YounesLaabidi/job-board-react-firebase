import { useState, useEffect, cloneElement } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getDocs,
  collection,
  query,
  onSnapshot,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export default function Candidats() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const q = query(
      collection(db, "jobs", id, "applications"),
      orderBy("postedAt", "desc"),
      limit(10)
    );
    setLoading(true);
    const unsub = onSnapshot(q, (querySnapshot) => {
      const d = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setCandidates(d);
      if (d.length < 10) {
        setLastVisible(false);
      } else {
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }
      setLoading(false);
    });

    return () => unsub;
  }, []);

  const loadMore = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "jobs", id, "applications"),
        startAfter(lastVisible),
        limit(10)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));


        setCandidates((prev) => [...prev, ...newData]);
        if (newData.length < 10) {
          setLastVisible(false);
        } else {
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
      }

      setLoading(false);
    } catch (error) {}
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="">
        <div className="candidatsCardsContainer">
          {loading ? (
            <div>
              <div className="mx-auto animate-pulse bg-gray-700 rounded-md w-[80%]  h-32  md:ms-5 mb-2"></div>
              <div className="mx-auto animate-pulse bg-gray-700 rounded-md w-[80%]  h-32  md:ms-5 mb-2"></div>
              <div className="mx-auto animate-pulse bg-gray-700 rounded-md w-[80%]  h-32 md:ms-5 mb-2"></div>
            </div>
          ) : (
            <>
              {candidates.length > 0 ? (
                <div className="">
                  {candidates.map((c) => {
                    return (
                      <Link
                        key={c.id}
                        className="max-w-3xl border-2 border-gray-800 bg-gray-900 relative mx-4 pt-4 px-4 hover:border-green-600 cursor-pointer"
                        to={`/dashboard/job-posted/${id}/candidats/${c.id}`}
                      >
                        <div className="flex gap-4 items-center pb-3 border-b-2 mb-3 border-gray-700">
                          <img
                            src={
                              c?.photoUrl ? c?.photoUrl : "/images/photoUrl.svg"
                            }
                            alt="user-profile-image"
                            className="rounded-full w-14 h-14 object-cover"
                          />
                          <div className="">
                            <p className="font-semibold text-gray-600">
                              {c.name}
                            </p>
                            <p className="font-medium text-gray-600">
                              {/* {c.userDoc.occupation} */}
                            </p>
                          </div>
                        </div>
                        <p className="h-24 overflow-y-hidden text-sm">
                          {c.coverLetter}
                        </p>
                      </Link>
                    );
                  })}
                  {!loading && lastVisible && (
                    <button
                      className="text-center bg-green-600 py-3 px-3 mx-auto block mt-4 rounded-md"
                      onClick={loadMore}
                    >
                      Load More
                    </button>
                  )}
                </div>
              ) : (
                <h1 className="mx-4 mt-4">No Candidats Applied Yet!</h1>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
