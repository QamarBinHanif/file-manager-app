import React, { useState } from "react";
import { Box, Grid, Typography, Button, Dialog } from "@mui/material";
import axiosInstance from "../services/axiosService";
import { FILE_VIEW } from "../constants/api";
import FileStatus from "./FileStatus";

const FileList = ({ files, fetchFiles }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const incrementViews = async (fileId) => {
    try {
      await axiosInstance.post(FILE_VIEW + fileId);
      fetchFiles();
    } catch (error) {
      console.error("Error incrementing file views:", error);
    }
  };
  const handleCloseStatus = () => {
    setSelectedFile(null);
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
                href={file.path}
                target="_blank"
                onClick={() => incrementViews(file._id)}
              >
                Share Link
              </Button>
              <Button
                variant="outlined"
                onClick={() => setSelectedFile(file)}
                fullWidth
              >
                View Statistics
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      {/* Show File Status in Dialog */}
      <Dialog open={!!selectedFile} onClose={handleCloseStatus}>
        {selectedFile && (
          <FileStatus selectedFile={selectedFile} onClose={handleCloseStatus} />
        )}
      </Dialog>
    </Box>
  );
};

export default FileList;
