import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Your Dashboard
      </Typography>
      <Button variant="outlined" onClick={handleLogout}>
        Logout
      </Button>

      <Box sx={{ marginTop: "20px" }}>
        <FileUpload />
      </Box>

      <Box sx={{ marginTop: "40px" }}>
        <FileList />
      </Box>
    </Box>
  );
};

export default Dashboard;
