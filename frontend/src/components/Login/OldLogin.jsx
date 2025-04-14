// // Import necessary dependencies
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../../ui/Button";
// import Form from "../../ui/Form";
// import FormRowVertical from "../../ui/FormRowVertical";
// import Input from "../../ui/Input";
// import loginService from "../../services/login.service";
// import SpinnerMini from "../../ui/SpinnerMini";

// function LoginForm() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [loginError, setLoginError] = useState(null);
//   const [loginSuccess, setLoginSuccess] = useState(null);

//   // Display error message for 2000 milliseconds
//   useEffect(() => {
//     if (loginError) {
//       const errorTimeout = setTimeout(() => {
//         setLoginError(null);
//       }, 2000);
//       return () => clearTimeout(errorTimeout);
//     }
//   }, [loginError]);

//   // General login form validation logic
//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {};

//     if (!formData.username.trim()) {
//       newErrors.username = "Username cannot be empty";
//       valid = false;
//     }

//     if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters long";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   // Handle form submission logic
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await loginService.logIn(formData);
//       const data = await response.json();

//       // Save the token for automatic user login
//       if (response.status === 200) {
//         localStorage.setItem(
//           "user_token",
//           JSON.stringify(data.data.user_token)
//         );

//         setLoginError(null);
//         setLoginSuccess("User login successful!");
//       } else {
//         setLoginSuccess(null);
//         setLoginError(data.message);
//       }

//       setLoading(false);

//       if (response.status === 200) {
//         const tokenData = JSON.parse(atob(data.data.user_token.split(".")[1]));
//         const userRole = tokenData.user_role;

//         // Redirect based on user role obtained from localStorage token
//         let redirectTo = "";
//         switch (userRole) {
//           case "Admin":
//             redirectTo = "/admin/dashboard";
//             break;
//           case "Company":
//             redirectTo = "/company/dashboard";
//             break;
//           case "Student":
//             redirectTo = "/student/dashboard";
//             break;
//           case "Department":
//             redirectTo = "/department/dashboard";
//             break;
//           default:
//             redirectTo = "/";
//         }

//         setTimeout(() => {
//           if (navigate) {
//             navigate(redirectTo);
//             window.location.reload();
//           }
//         }, 1000); // Redirect after 1 second
//       }
//     } catch (error) {
//       console.error("Login failed:", error.message);
//       setLoginSuccess(null);
//       setLoginError("An error occurred. Please try again later.");
//       setLoading(false); // Reset loading state here
//     }
//   };

//   // Handle form input change
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   // Render the login form
//   return (
//     <Form onSubmit={handleSubmit}>
//       {loginError && (
//         <p
//           style={{
//             color: "red",
//             textAlign: "center",
//             marginBottom: "-5px",
//             border: "1px solid red",
//             background: "red",
//             color: "white",
//           }}
//         >
//           {loginError}
//         </p>
//       )}
//       {loginSuccess && (
//         <p
//           style={{
//             color: "#1BA345",
//             textAlign: "center",
//             border: "1px solid #1BA345",
//             background: "#1BA345",
//             color: "white",
//           }}
//         >
//           {loginSuccess}
//         </p>
//       )}
//       <FormRowVertical label="Username" error={errors.username}>
//         <Input
//           type="text"
//           id="username"
//           autoComplete="username"
//           value={formData.username}
//           onChange={handleChange}
//           placeholder="Enter your username"
//         />
//       </FormRowVertical>
//       <FormRowVertical label="Password" error={errors.password}>
//         <Input
//           type="password"
//           id="password"
//           autoComplete="current-password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Enter your password"
//         />
//       </FormRowVertical>

//       <FormRowVertical>
//         <Button type="submit" size="large" disabled={loading}>
//           {loading ? <SpinnerMini /> : "Log in"}
//         </Button>
//       </FormRowVertical>
//     </Form>
//   );
// }
