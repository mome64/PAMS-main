import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import getAuth from "../../utils/auth";

const PrivateAuthRoute = ({ roles, children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const loggedInUser = await getAuth();
        const userRole = loggedInUser.role;

        if (userRole) {
          setIsLoggedin(true);
          if (roles && roles.includes(userRole)) {
            setIsAuthorized(true);
          }
        }
        setIsChecked(true);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsChecked(true);
      }
    };

    checkAuth();
  }, [roles]);

  if (isChecked) {
    if (!isLoggedin) {
      return <Navigate to="/login" />;
    }
    if (!isAuthorized) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return children;
};

export default PrivateAuthRoute;
