import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the File Management App
      </Typography>
      <Typography variant="body1" paragraph>
        This app allows you to upload, organize, and share your image or video files securely.
        You can also track how often your files are viewed.
      </Typography>
      <Button variant="contained" onClick={handleLoginRedirect}>
        Login
      </Button>
    </Box>
  );
};

export default Home;
