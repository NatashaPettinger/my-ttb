const express = require('express')
const router = express.Router()
const rawMaterials = require('../controllers/rawMaterials')
const auth = require('../middleware/auth');


router.get('/', auth, rawMaterials.getRawMaterials)
router.patch('/', auth, rawMaterials.receiveRawMaterials)
router.patch('/quantityAdjust', auth, rawMaterials.quantityAdjust)
router.patch('/edit', auth, rawMaterials.editRawMaterials)
router.patch('/editQuantityAdjust', auth, rawMaterials.editQuantityAdjust)
router.patch('/editMaterialsLog', auth, rawMaterials.editMaterialLog)

module.exports = router