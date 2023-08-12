import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Context was called outside of the provider");

  return context;
};

export default useAuth;
