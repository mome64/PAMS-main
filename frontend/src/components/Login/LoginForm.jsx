import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import loginService from "../../services/login.service";
import SpinnerMini from "../../ui/SpinnerMini";
import { BiSolidShow } from "react-icons/bi";

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  useEffect(() => {
    if (loginError) {
      const errorTimeout = setTimeout(() => {
        setLoginError(null);
      }, 2000);
      return () => clearTimeout(errorTimeout);
    }
  }, [loginError]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username cannot be empty";
      valid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const response = await loginService.logIn(formData);
      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem(
          "user_token",
          JSON.stringify(data.data.user_token)
        );

        setLoginError(null);
        setLoginSuccess("User login successful!");
      } else {
        setLoginSuccess(null);
        setLoginError("Invalid username or password!");
      }

      setLoading(false);

      if (response.status === 200) {
        const tokenData = JSON.parse(atob(data.data.user_token.split(".")[1]));
        const userRole = tokenData.user_role;

        let redirectTo = "";
        switch (userRole) {
          case "Admin":
            redirectTo = "/admin/dashboard";
            break;
          case "Company":
            redirectTo = "/company/dashboard";
            break;
          case "Student":
            redirectTo = "/student/dashboard";
            break;
          case "Department":
            redirectTo = "/department/dashboard";
            break;
          case "acadamic":
            redirectTo = "/acadamic/dashboard";
            break;
          default:
            redirectTo = "/";
        }

        setTimeout(() => {
          if (navigate) {
            navigate(redirectTo);
            window.location.reload();
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setLoginSuccess(null);
      setLoginError("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Function to toggle password visibility
  const togglePasswordView = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {loginError && (
        <p
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: "-5px",
            border: "1px solid red",
          }}
        >
          {loginError}
        </p>
      )}
      {loginSuccess && (
        <p
          style={{
            color: "#1BA345",
            textAlign: "center",
            border: "1px solid #1BA345",
            borderRadius: "7px",
          }}
        >
          {loginSuccess}
        </p>
      )}
      <FormRowVertical label="Username" error={errors.username}>
        <Input
          type="text"
          id="username"
          autoComplete="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors.password}>
        <div style={{ position: "relative" }}>
          <Input
            style={{ width: "100%" }}
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <BiSolidShow
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              fontSize: "22px",
              cursor: "pointer",
              color: "#7DC400",
            }}
            onClick={togglePasswordView}
          />
        </div>
      </FormRowVertical>

      <FormRowVertical>
        <Button type="submit" size="large" disabled={loading}>
          {loading ? <SpinnerMini /> : "Log in"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
