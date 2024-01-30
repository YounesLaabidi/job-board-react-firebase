import { useNavigate, Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import { useAuth } from "../../providers/AuthProvider";
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useSignout } from "../../hooks/useSignout";

export default function Header() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isPathEqualToSetup = pathname === "/setup";

  const [user, setUser] = useState();
  const { currentUser } = useAuth();
  const handleSignout = useSignout();

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;
      try {
        const docSnap = await getDoc(doc(db, "users", currentUser.uid));
        if (docSnap.exists()) {
          setUser(docSnap.data());
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {};
  }, [currentUser]);

  return (
    <header className="w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <div className="shrink-0 mr-4">
            <Link to="/" className="block" aria-label="Cruip">
              <img src="/logo.svg" alt="logo-icon" width={100} />
            </Link>
          </div>
          <nav>
            {!currentUser && (
              <ul className="flex grow justify-end flex-wrap items-center">
                <li>
                  <Link
                    to="/signin"
                    className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3"
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            )}
            {!isPathEqualToSetup && (
              <>
                {currentUser && (
                  <div className="flex items-center gap-2">
                    <div className="capitalize hidden sm:block text">
                      {`welcome, `}
                      <span className="">{currentUser?.displayName}</span>
                    </div>
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          onClick={() => setIsOpen((prev) => !prev)}
                          className="w-12"
                        >
                          <img
                            className="object-cover w-10 h-10 rounded-full"
                            src={
                              currentUser?.photoURL
                                ? currentUser.photoURL
                                : "/images/profile-img.png"
                            }
                            alt="profile-image"
                          />
                        </button>
                      </div>

                      {isOpen && (
                        <div
                          onClick={() => setIsOpen((prev) => !prev)}
                          className="absolute w-32 right-0 z-10 mt-2 rounded-md bg-gray-700 shadow-lg"
                        >
                          <ul className="py-1">
                            <li>
                              <Link
                                to="/dashboard"
                                className="block px-4 py-2 text-sm text-white"
                              >
                                Dashboard
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dashboard/settings"
                                className="block px-4 py-2 text-sm text-white"
                              >
                                Update Profile
                              </Link>
                            </li>
                            {user && user.accountType === "employer" && (
                              <div className="">
                                <li>
                                  <Link
                                    to="/dashboard/post"
                                    className="block px-4 py-2 text-sm text-white"
                                  >
                                    Post A Job
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/dashboard/job-posted"
                                    className="block px-4 py-2 text-sm text-white"
                                  >
                                    Job Posted
                                  </Link>
                                </li>
                              </div>
                            )}{" "}
                            <li>
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-indigo-500 hover:text-indigo-300 transition-all font-bold"
                                onClick={handleSignout}
                              >
                                Sign Out
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
