const { uploadFile, getFileStatistics,  getAllFiles } = require('../services/fileService');
const { sendResponse, sendError } = require('../utils/responseHelper');

// Upload file with tags and validate file type
exports.upload = async (req, res) => {
   try {
    
      const fileData = {
         name: req.file?.originalname,
         path: req.file?.path,
         size: req.file?.size,
         mimetype: req.file?.mimetype,
      };
      
      const tags = req.body?.tags ? req.body?.tags.split(',') : [];
      const file = await uploadFile(fileData, req.body.userId, tags);
      sendResponse(res, { message: 'File uploaded successfully', file });
   } catch (error) {
      sendError(res, error.message);
   }
};

// Retrieve file statistics and increment view count
exports.getStatistics = async (req, res) => {
   try {
      const fileId = req.params.id;
      const stats = await getFileStatistics(fileId);
      sendResponse(res, { file: stats, views: stats.views });
   } catch (error) {
      sendError(res, error.message);
   }
};

// Get file by shareable link
exports.getFiles = async (req, res) => {
   try {
      const file = await getAllFiles();

      if (!file) return sendError(res, 'File not found', 404);

      sendResponse(res, file);
   } catch (error) {
      sendError(res, error.message);
   }
};
