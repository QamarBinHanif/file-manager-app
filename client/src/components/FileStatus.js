import React from "react";
import { Box, Typography, Button, Badge } from "@mui/material";
import { getLocalStorage } from "../utils/localStorage";

const FileStatus = ({ selectedFile, onClose }) => {
  const currnetUser = getLocalStorage("userInfo");

  return (
    <Box
      sx={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h6">File Details</Typography>
      <>
        <Typography variant="body1">
          <strong>Name:</strong> {selectedFile?.path?.split("/").pop()}
        </Typography>
        <Typography variant="body1">
          <strong>Views:</strong> {selectedFile?.views}
        </Typography>
        <Typography variant="body1">
          <strong>Uploaded By:</strong> {currnetUser?.username || "Unknown"}
        </Typography>
        <Typography variant="body1">
          <strong>Tags: </strong>

          {selectedFile.tags.map((item, index) => (
            <Badge
              key={index}
              color="primary"
              badgeContent={item}
              sx={{ marginLeft: 2 }}
            ></Badge>
          ))}
        </Typography>
      </>
      <Button variant="outlined" onClick={onClose} sx={{ marginTop: "10px" }}>
        Close
      </Button>
    </Box>
  );
};

export default FileStatus;
