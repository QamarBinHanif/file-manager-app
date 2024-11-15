const express = require('express');
const { upload, getStatistics,getFiles, incrementViewsController } = require('../controllers/fileController');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/upload',authMiddleware, uploadMiddleware.single('file'), upload);
router.get('/:id/stats',authMiddleware, getStatistics);
router.get('/all/:id',authMiddleware, getFiles);
router.post('/view/:id',authMiddleware, incrementViewsController);


module.exports = router;
