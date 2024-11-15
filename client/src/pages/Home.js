import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleSignupRedirect = () => {
    navigate("/register");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to the File Management App
        </Typography>
        <Typography variant="body1" paragraph>
          Manage your files efficiently with features like uploading, organizing, sharing, and tracking views. Get started now!
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoginRedirect}
            sx={{ padding: "10px 20px" }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSignupRedirect}
            sx={{ padding: "10px 20px" }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
