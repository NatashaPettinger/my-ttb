const express = require('express')
const router = express.Router()
const ttbCtrl = require('../controllers/ttb')

router.get('/', ttbCtrl.getReports)
router.post('/', ttbCtrl.processReports)


module.exports = router