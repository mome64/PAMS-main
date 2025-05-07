import React, { useState, useEffect, useContext } from "react";
import getAuth from "../utils/auth";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState("");

  // const [userId, setUserId] = useState(() => {
  //   try {
  //     const storedUserId = localStorage.getItem("userId");
  //     return storedUserId ? JSON.parse(storedUserId) : null;
  //   } catch (error) {
  //     console.error("Error parsing userId from localStorage:", error);
  //     return null;
  //   }
  // });

  const [userId, setUserId] = useState(() => {
    try {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId || storedUserId === "undefined") return null;
      return JSON.parse(storedUserId);
    } catch (error) {
      console.error("Error parsing userId from localStorage:", error);
      return null;
    }
  });

  const [username, setUsername] = useState("");
  const [secondName, setSecondName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDepartment, setIsDepartment] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [isAcadamic, setIsAcadamic] = useState(false);
  const [collage, setCollage] = useState({});
  const [users, setUsers] = useState({});

  const value = {
    isLogged,
    userRole,
    collage,
    userId,
    username,
    secondName,
    isAdmin,
    isDepartment,
    isStudent,
    users,
    isCompany,
    isAcadamic,
    setIsLogged,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAuth();

        if (response.token) {
          setIsLogged(true);
          setUserRole(response.role);
          setUserId(response.userId);
          setUsername(response.username);
          setIsAdmin(response.role === "Admin");
          setIsDepartment(response.role === "Department");
          setIsStudent(response.role === "Student");
          setIsCompany(response.role === "Company");
          setIsAcadamic(response.role === "acadamic");
          setUsers(response?.userL);
          setCollage(response?.userL?.college_name);

          // Extract the second name from the username and set it in state
          const secondName = response.username.split(".")[1];
          setSecondName(secondName);

          // Store userId in localStorage
          localStorage.setItem("userId", JSON.stringify(response.userId));
        }
      } catch (error) {
        console.error("Error fetching authentication:", error);
      }
    };

    fetchData();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
