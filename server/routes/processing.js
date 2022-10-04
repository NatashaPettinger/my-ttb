const express = require('express')
const router = express.Router()
const processingCtrl = require('../controllers/processing')

router.get('/', processingCtrl.getBatches)
router.post('/', processingCtrl.processBatch)
router.post('/log', processingCtrl.makeProcessingLogEntry)


module.exports = router