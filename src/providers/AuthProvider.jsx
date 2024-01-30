import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";

import { Navigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(true);
    });
    return unsubscribe;
  }, []);
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const signin = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const signout = () => signOut(auth);

  const value = {
    currentUser,
    signup,
    signin,
    signout,
  };
  return (
    <AuthContext.Provider value={value}>
      {loading && children}
    </AuthContext.Provider>
  );
};
