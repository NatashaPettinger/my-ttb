const express = require('express')
const router = express.Router()
const warehouseCtrl = require('../controllers/warehousing')

router.get('/', warehouseCtrl.getTanks)
router.post('/', warehouseCtrl.createTank)
router.patch('/', warehouseCtrl.transferOutOfStorage)
router.post('/setProductionTank', warehouseCtrl.setProductionTank)
router.patch('/transferFromProduction', warehouseCtrl.transferFromProduction)
router.patch('/updateTank', warehouseCtrl.updateTank)
router.patch('/updateFill', warehouseCtrl.updateFill)
router.patch('/existing-to-new', warehouseCtrl.transferToNewTank)
router.patch('/existing-to-existing', warehouseCtrl.transferToExistingTank)
router.patch('/transferOutOfStorage', warehouseCtrl.transferOutOfStorage)
router.post('/log', warehouseCtrl.makeStorageLogEntry),


module.exports = router