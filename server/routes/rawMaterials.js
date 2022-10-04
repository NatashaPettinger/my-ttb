const express = require('express')
const router = express.Router()
const rawMaterials = require('../controllers/rawMaterials')

router.get('/', rawMaterials.getRawMaterials)
router.patch('/', rawMaterials.receiveRawMaterials)
router.patch('/quantityAdjust', rawMaterials.quantityAdjust)
router.patch('/edit', rawMaterials.editRawMaterials)
router.patch('/editQuantityAdjust', rawMaterials.editQuantityAdjust)
router.patch('/editMaterialsLog', rawMaterials.editMaterialLog)

module.exports = router