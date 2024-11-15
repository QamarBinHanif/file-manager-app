import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import axiosInstance from "../services/axiosService";
import { FILE_LIST } from "../constants/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  useEffect(() => {
    fetchFiles();
  }, []);
  const fetchFiles = async () => {
    try {
      const response = await axiosInstance.get(FILE_LIST);
      setFiles(response.data.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      }
    }
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
        <FileUpload fetchFiles={fetchFiles} />
      </Box>

      <Box sx={{ marginTop: "40px" }}>
        <FileList files={files}  />
      </Box>
    </Box>
  );
};

export default Dashboard;
