const express = require('express')
const router = express.Router()
const production = require('../controllers/production')
const auth = require('../middleware/auth');

router.get('/', auth, production.getFerments)
router.post('/', auth, production.createMash)
router.patch('/addIngredient', auth, production.addIngredient)
router.patch('/setFermentTank', auth, production.setFermentTank)
router.patch('/addFermentData', auth, production.addFermentData)
router.patch('/addStillDataPoint', auth, production.addStillDataPoint)
router.patch('/stillMashData', auth, production.stillMashData)
router.patch('/stillCutStarts', auth, production.stillCutStarts)
router.patch('/redistillFromStorage', auth, production.redistillFromStorage)
router.patch('/redistillFromProduction', auth, production.redistillFromProduction)
router.post('/productionTransferLog', auth, production.productionTransferLog)


module.exports = router
