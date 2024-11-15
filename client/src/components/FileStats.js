import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const FileStats = ({ fileId }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await axios.get(`http://localhost:5000/api/files/${fileId}/stats`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
      });
      setStats(response.data);
    };

    fetchStats();
  }, [fileId]);

  return (
    <Box sx={{ padding: "20px" }}>
      {stats ? (
        <>
          <Typography variant="h6">File Views: {stats.views}</Typography>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default FileStats;
