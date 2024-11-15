const File = require("../models/File");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid"); // for generating unique shareable links
const dotenv = require("dotenv");
dotenv.config();


// Upload file with tags and shareable link
const uploadFile = async (fileData, userId, tags) => {
  try {

    const file = new File({
      name: fileData.originalname,
      path: process.env.APP_URL + "/" + fileData.path,
      tags: tags || [],
      uploadedBy: userId,
      sharedLink: uuidv4(),
      createdAt: new Date(),
    });

    const savedFile = await file.save();

    // Link file to the user
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.files.push(savedFile._id);
    await user.save();

    return savedFile;
  } catch (error) {
    throw new Error(`File upload failed: ${error.message}`);
  }
};

// Get file statistics, incrementing view count
const getFileStatistics = async (fileId) => {
  const file = await File.findById(fileId);
  if (!file) throw new Error("File not found");

  file.views += 1; // Increment view count
  await file.save();

  return file;
};

// Find file by shared link
const getAllFiles = async (sharedLink) => {
  return await File.find();
};

module.exports = { uploadFile, getFileStatistics, getAllFiles };
