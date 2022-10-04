const express = require('express')
const router = express.Router()
const transferCtrl = require('../controllers/spiritTransfers')

router.post('/', transferCtrl.createTank)

router.put('/barrel-to-new-barrel', transferCtrl.barrelToNewBarrel)
router.put('/tank-to-new-barrel', transferCtrl.tankToNewBarrel)
/*router.put('/tank-to-used-barrel', transferCtrl.tankToOldBarrel)
router.put('/barrel-to-used-barrel', transferCtrl.barrelToOldBarrel) */

router.get('/full-tanks', transferCtrl.getFullTanks)
router.get('/empty-tanks', transferCtrl.getEmptyTanks)

module.exports = router