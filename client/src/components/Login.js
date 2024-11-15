import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosService";
import { AUTH_LOGIN } from "../constants/api";
import { setLocalStorage } from "../utils/localStorage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post(AUTH_LOGIN, {
        email,
        password,
      });
      
      setLocalStorage("token", response.data.data.token);
      setLocalStorage("userInfo", response.data.data.user);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <Box sx={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <Typography variant="h5">Login</Typography>
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
      <Button variant="contained" fullWidth onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
