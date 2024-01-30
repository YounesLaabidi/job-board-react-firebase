import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import JobFilter from "./JobFilter";
import Spinner from "../ui/Spinner";

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "jobs"), limit(10));

    const unsub = onSnapshot(q, (querySnapshot) => {
      const d = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setAllJobs(d);
      setFilteredJobs(d);
      if (d.length < 10) {
        setLastVisible(false);
      } else {
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }
      setLoading(false);
    });

    return () => unsub;
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    filterJobs(e.target.value, category);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    filterJobs(search, e.target.value);
  };

  const filterJobs = (searchTerm, selectedCategory) => {
    if (!searchTerm && selectedCategory === "all") {
      setFilteredJobs(allJobs);
      return;
    }

    const filteredJobs = allJobs.filter((job) => {
      const titleMatch = job.jobTitle
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryMatch =
        selectedCategory === "all" ||
        job.category.toLowerCase() === selectedCategory.toLowerCase();
      return titleMatch && categoryMatch;
    });

    setFilteredJobs(filteredJobs);
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "jobs"),
        startAfter(lastVisible),
        orderBy("postedAt", "asc"),
        limit(10)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllJobs((prev) => [...prev, ...newData]);
        setFilteredJobs((prev) => [...prev, ...newData]);
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
    <div className="md:flex mt-6 max-w-5xl mx-auto px-8">
      <JobFilter
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSearchChange={handleSearchChange}
        search={search}
        handleCategoryChange={handleCategoryChange}
        category={category}
      />
      <div className="">
        <div className="md:max-w-2xl md:mx-auto">
          <div className="flex justify-end md:hidden">
            <button className="" onClick={() => setIsOpen((prev) => !prev)}>
              <img
                src="/images/filter-icon.png"
                className="w-8 pointer-events-none"
                alt="filter-icon"
              />
            </button>
          </div>
          <div className="max-w-3xl">
            {loading ? (
              <div>
                <div className="mx-auto animate-pulse bg-gray-700 rounded-md h-32 md:w-[500px] md:ms-5 mb-2"></div>
                <div className="mx-auto animate-pulse bg-gray-700 rounded-md h-32 md:w-[500px] md:ms-5 mb-2"></div>
                <div className="mx-auto animate-pulse bg-gray-700 rounded-md h-32 md:w-[500px] md:ms-5 mb-2"></div>
              </div>
            ) : (
              <>
                {filteredJobs.length > 0 ? (
                  <div>
                    {filteredJobs.map((job) => (
                      <Link
                        key={job.id}
                        className=" mb-3 max-w-3xl border-2 border-gray-800 bg-gray-900 relative mx-4 hover:border-green-600 cursor-pointer rounded-md px-7 py-6 w-full"
                        to={`/dashboard/jobs/${job.id}`}
                      >
                        <div className="flexitems-center border-gray-700 w-full">
                          <div className="flex justify-between gap-4 items-start">
                            <img
                              src={job.photoURL}
                              alt="employer-image"
                              className="object-cover w-16 h-16 rounded-full flex-shrink-0"
                            />
                            <span className="flex flex-col gap-1">
                              <p className="font-medium capitalize text-gray-700">
                                {job.jobTitle}
                              </p>
                              <p className="font-normal text-gray-400 text-sm">
                                {job.companyName}
                              </p>
                            </span>
                            <span className="flex flex-col gap-1">
                              <p className="font-medium capitalize text-gray-700">
                                {job.category}
                              </p>
                              <p className="font-normal text-gray-400 text-sm">
                                {job.location}
                              </p>
                            </span>
                            <span>
                              <p className="font-medium capitalize text-gray-700">
                                {job.salary}$
                              </p>{" "}
                            </span>
                          </div>{" "}
                        </div>
                      </Link>
                    ))}
                    {lastVisible && (
                      <div className="">
                        {" "}
                        <button
                          className="text-center bg-green-600 py-3 px-3 mx-auto block mt-4 rounded-md"
                          onClick={loadMore}
                          disabled={loading}
                        >
                          {loading ? <Spinner /> : "Load More"}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <h1 className="mx-4 mt-4">No Jobs Posted Yet!</h1>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
