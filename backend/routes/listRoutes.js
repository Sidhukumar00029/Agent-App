const express = require('express');
const router = express.Router();
const { uploadList, getListItems } = require('../controllers/listController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.post('/upload', protect, upload.single('csvFile'), uploadList);
router.get('/', protect, getListItems);

module.exports = router;