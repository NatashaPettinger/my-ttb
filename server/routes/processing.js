const express = require('express');
const router = express.Router();
const processingCtrl = require('../controllers/processing');
const auth = require('../middleware/auth');

router.get('/', auth, processingCtrl.getBatches)
router.post('/', auth, processingCtrl.processBatch)


module.exports = router