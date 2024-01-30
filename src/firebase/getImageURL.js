import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
const getImageURL = async (file) => {
  const { currentUser } = getAuth();

  let url = null;

  if (file) {
    try {
      const ImageRef = ref(storage, `images/${currentUser.uid}`);
      await uploadBytes(ImageRef, file);
      url = await getDownloadURL(ImageRef);
    } catch (error) {
      console.log(error);
    }
  }
  return url;
};

export { getImageURL };
