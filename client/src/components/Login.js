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

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Box
        sx={{
          maxWidth: "400px",
          width: "100%",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" textAlign="center" marginBottom="20px">
          Login
        </Typography>
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
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <Button onClick={handleSignUp} sx={{ marginLeft: "10px" }}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
