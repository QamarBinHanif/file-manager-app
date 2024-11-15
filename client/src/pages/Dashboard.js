import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import axiosInstance from "../services/axiosService";
import { FILE_LIST } from "../constants/api";
import { getLocalStorage } from "../utils/localStorage";

const Dashboard = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const currentUser = await getLocalStorage("userInfo");
      const response = await axiosInstance.get(FILE_LIST + currentUser._id);
      setFiles(response.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* Header Section */}
      <Paper
        sx={{
          width: "100%",
          maxWidth: "800px",
          padding: "20px",
          textAlign: "center",
          marginBottom: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Your Dashboard
        </Typography>
        <Typography variant="body1" paragraph>
          Manage your files with ease. Upload, view, and track file statistics seamlessly.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          sx={{
            backgroundColor: "#007bff",
            "&:hover": { backgroundColor: "#0056b3" },
          }}
        >
          Logout
        </Button>
      </Paper>

      {/* File Upload Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          marginBottom: "20px",
        }}
      >
        <Paper
          sx={{
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Upload Files
          </Typography>
          <FileUpload fetchFiles={fetchFiles} />
        </Paper>
      </Box>

      {/* File List Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          marginTop: "20px",
        }}
      >
        <Paper
          sx={{
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Your Files
          </Typography>
          <FileList files={files} fetchFiles={fetchFiles} />
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
