import { Outlet, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../providers/AuthProvider";
export default function Dashboard() {
  const [error, setError] = useState("");
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        if (currentUser) {
          const q = query(
            collection(db, "users"),
            where("uid", "==", currentUser.uid)
          );
          const querySnapshot = await getDocs(q);
          const querySnapshotData = querySnapshot.docs[0];
          const document = {
            ...querySnapshotData.data(),
            docId: querySnapshotData.id,
          };
          setUser(document);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="md:pt-5 md:pb-5 ">
      {user && (
        <div>
          <Outlet context={{ user }} />
        </div>
      )}
    </div>
  );
}
