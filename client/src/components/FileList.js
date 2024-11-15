import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import axiosInstance from "../services/axiosService";
import { FILE_LIST } from "../constants/api";
import { useNavigate } from "react-router-dom";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFiles();
  }, []);
  const fetchFiles = async () => {
    try {
      const response = await axiosInstance.get(FILE_LIST);
      setFiles(response.data.data);
    } catch (error) {
        if(error.response.status===401){
            navigate("/login")
        }
        
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h5">Your Files</Typography>
      <Grid container spacing={2}>
        {files.map((file) => (
          <Grid item xs={12} sm={6} md={4} key={file._id}>
            <Box
              sx={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="body2">{file.name}</Typography>
              <Button
                variant="outlined"
                fullWidth
                href={file.sharedLink}
                target="_blank"
              >
                Share Link
              </Button>
              <Button variant="outlined" fullWidth>
                View Statistics
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FileList;
