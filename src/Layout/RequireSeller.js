import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import useSeller from "../hooks/useSeller";
import auth from "../Shared/Firebase.init";
import Loading from "../Shared/LoadingPage";

const RequireSeller = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [seller, sellerLoading] = useSeller(user?.email);
  const location = useLocation();

  if (loading || sellerLoading) {
    return <Loading />;
  }

  if (!seller) {
    signOut(auth);
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireSeller;
