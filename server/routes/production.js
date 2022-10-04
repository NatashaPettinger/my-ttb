const express = require('express')
const router = express.Router()
const production = require('../controllers/production')
const auth = require('../middleware/auth');

router.get('/', auth, production.getFerments)
router.post('/', auth, production.createMash)
router.patch('/addIngredient', auth, production.addIngredient)
router.patch('/setFermentTank', production.setFermentTank)
router.patch('/addFermentData', production.addFermentData)
router.patch('/addStillDataPoint', production.addStillDataPoint)
router.patch('/stillMashData', production.stillMashData)
router.patch('/stillCutStarts', production.stillCutStarts)
router.post('/log', production.makeProductionLogEntry)
router.post('/productionTransferLog', production.productionTransferLog)


module.exports = router
