const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
   name: String,
   path: String,
   tags: [String],
   views: { type: Number, default: 0 },
   sharedLink: { type: String, unique: true },
   uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);
