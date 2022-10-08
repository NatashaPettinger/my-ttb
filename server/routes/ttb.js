const express = require('express')
const router = express.Router()
const ttbCtrl = require('../controllers/ttb')
const auth = require('../middleware/auth');

router.get('/', auth, ttbCtrl.getReports)
router.post('/', auth, ttbCtrl.processReports)


module.exports = router