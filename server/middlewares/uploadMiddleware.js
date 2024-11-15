const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to the uploads directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Save files with unique names
  }
});

// Limit file size (optional), e.g., 10 MB
const uploadMiddleware = multer({ 
  storage: storage,
  limits: { fileSize: 10000000 } // 10 MB file size limit
});

module.exports = uploadMiddleware;
