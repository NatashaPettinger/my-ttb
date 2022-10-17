const express = require('express')
const router = express.Router()
const warehouseCtrl = require('../controllers/warehousing')
const auth = require('../middleware/auth');

router.get('/', auth, warehouseCtrl.getTanks)
router.post('/', auth, warehouseCtrl.createTank)
router.patch('/', auth, warehouseCtrl.transferOutOfStorage)
router.post('/setProductionTank', auth, warehouseCtrl.setProductionTank)
router.patch('/transferFromProduction', auth, warehouseCtrl.transferFromProduction)
router.patch('/updateTank', auth, warehouseCtrl.updateTank)
router.patch('/updateFill', auth, warehouseCtrl.updateFill)
router.patch('/existing-to-new', auth, warehouseCtrl.transferToNewTank)
router.patch('/existing-to-existing', auth, warehouseCtrl.transferToExistingTank)
router.patch('/transferOutOfStorage', auth, warehouseCtrl.transferOutOfStorage)


module.exports = router