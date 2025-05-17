import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import loginService from "../../services/login.service";
import SpinnerMini from "../../ui/SpinnerMini";
import { MdEmail } from "react-icons/md";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username cannot be empty";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email cannot be empty";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
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
      const response = await loginService.forgotPassword(formData);
      const data = await response.json();

      if (response.status === 200) {
        setError(null);
        setSuccess("Password reset instructions have been sent to your email!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setSuccess(null);
        setError(
          data.message || "Failed to send reset instructions. Please try again."
        );
      }
    } catch (err) {
      console.error("Forgot password failed:", err.message);
      setSuccess(null);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Forgot Password
      </h2>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
          {error}
        </p>
      )}
      {success && (
        <p
          style={{
            color: "#1BA345",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          {success}
        </p>
      )}

      <FormRowVertical label="Username" error={errors.username}>
        <Input
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
        />
      </FormRowVertical>

      <FormRowVertical label="Email" error={errors.email}>
        <div style={{ position: "relative" }}>
          <Input
            style={{ width: "100%" }}
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your registered email"
          />
          <MdEmail
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              fontSize: "20px",
              color: "#7DC400",
            }}
          />
        </div>
      </FormRowVertical>

      <FormRowVertical>
        <Button type="submit" size="large" disabled={loading}>
          {loading ? <SpinnerMini /> : "Reset Password"}
        </Button>
      </FormRowVertical>

      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <button
          type="button"
          onClick={() => navigate("/login")}
          style={{
            background: "none",
            border: "none",
            color: "#7DC400",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Back to Login
        </button>
      </div>
    </Form>
  );
}

export default ForgotPasswordPage;
