import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { FILE_UPLOAD } from "../constants/api";
import axiosInstance from "../services/axiosService";
import { getLocalStorage } from "../utils/localStorage";

const FileUpload = ({ fetchFiles }) => {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
    },
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        console.error("Rejected files:", rejectedFiles);
        setMessage("Unsupported file type or size.");
        return;
      }
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        setMessage(""); // Clear any error messages
      }
    },
    onError: (error) => {
      console.error("Dropzone error:", error);
      setMessage("An error occurred while selecting the file.");
    },
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
    const currnetUser = await getLocalStorage("userInfo");
    formData.append("userId", currnetUser?._id);

    try {
      await axiosInstance.post(FILE_UPLOAD, formData);
      setMessage("File uploaded successfully!");
      setFile(null);
      fetchFiles();

      setTags("");
    } catch (error) {
      setMessage("Error uploading file.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Upload a File
      </Typography>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #1976d2",
          padding: "20px",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <input {...getInputProps()} />
        <Typography>Drag & drop your file here, or click to select</Typography>
      </div>
      {file && <Typography variant="body2">{file.name}</Typography>}
      <TextField
        label="Tags (comma separated)"
        fullWidth
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        onDrag={(e) => console.log(e.target.value)}
        sx={{ marginBottom: 3 }}
      />
      <Button
        variant="contained"
        fullWidth
        onClick={handleUpload}
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </Button>
      {message && (
        <Typography color={message.includes("Error") ? "error" : "primary"}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
