import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosService";
import { AUTH_REGISTER } from "../constants/api"; // Make sure you define your API endpoint for registration.
import { setLocalStorage } from "../utils/localStorage";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axiosInstance.post(AUTH_REGISTER, {
        username,
        email,
        password,
      });

      navigate("/login"); // Navigate to the dashboard or home page
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <Typography variant="h5">Register</Typography>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <Button variant="contained" fullWidth onClick={handleRegister}>
        Register
      </Button>
    </Box>
  );
};

export default Register;
