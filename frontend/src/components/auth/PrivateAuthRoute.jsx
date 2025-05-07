import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import getAuth from "../../utils/auth";
import { useAuth } from "../../context/AuthContext";

const PrivateAuthRoute = ({ roles, children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const loggedInUser = await getAuth();
        const { userL } = getAuth();

        const userRole = loggedInUser.role;

        switch (userRole) {
          case "Admin":
            document.title = "Admin-Page"; // Change title for Admin role

            break;
          case "Company":
            document.title = "Company-Page"; // Change title for Company role

            break;
          case "Student":
            document.title = "Student-Page"; // Change title for Student role

            break;
          case "Department":
            document.title = "Department-Page"; // Change title for Department role

            break;
          case "acadamic":
            document.title = `${userL.college_name} - Page`; // Change title for Academic role

            break;
          default:
            document.title = "Home - MySite"; // Default title for other roles
        }

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
