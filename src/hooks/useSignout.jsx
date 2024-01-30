import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const useSignout = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const handleSignout = async () => {
    try {
      await signout();
      return navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  return handleSignout;
};

export { useSignout };
