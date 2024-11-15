import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import FileStats from "../components/FileStats";

const FilePage = () => {
  const { fileId } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/files/${fileId}`);
        setFile(response.data.file);
      } catch (error) {
        console.error("Error fetching file details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFileDetails();
  }, [fileId]);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ padding: "20px" }}>
      {file ? (
        <>
          <Typography variant="h4">{file.name}</Typography>
          <Typography variant="body1" paragraph>
            Tags: {file.tags.join(", ")}
          </Typography>
          <Button variant="outlined" fullWidth href={file.sharedLink} target="_blank">
            Share Link
          </Button>
          <Box sx={{ marginTop: "20px" }}>
            <FileStats fileId={file._id} />
          </Box>
        </>
      ) : (
        <Typography variant="body1">File not found.</Typography>
      )}
    </Box>
  );
};

export default FilePage;
