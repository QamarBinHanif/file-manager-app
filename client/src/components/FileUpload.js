import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { FILE_UPLOAD } from "../constants/api";
import axiosInstance from "../services/axiosService";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,video/*", 
    onDrop: (acceptedFiles) =>{
        
        setFile(acceptedFiles[0])},
  });

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", tags.split(","));
    formData.append("userId", '6736f2a2f68345ec78047f00');



    try {
      await axiosInstance.post(FILE_UPLOAD, formData);
      setMessage("File uploaded successfully!");
      setFile(null);
      setTags("")
    } catch (error) {
      setMessage("Error uploading file.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <Typography variant="h5">Upload a File</Typography>
      <div {...getRootProps()} style={{ border: "2px dashed #1976d2", padding: "20px", textAlign: "center" }}>
        <input {...getInputProps()} />
        <Typography>Drag & drop your file here, or click to select</Typography>
      </div>
      {file && <Typography variant="body2">{file.name}</Typography>}
      <TextField
        label="Tags (comma separated)"
        fullWidth
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <Button variant="contained" fullWidth onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </Button>
      {message && <Typography color={message.includes("Error") ? "error" : "primary"}>{message}</Typography>}
    </Box>
  );
};

export default FileUpload;
