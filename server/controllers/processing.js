const Tank = require('../db/Tank');
const Processing = require('../db/Processing');
const ProcessingLog = require('../db/ProcessingLog');

const makeProcessingLogEntry = async (req, res) => {
    try {
        console.log(req.body)
        await ProcessingLog.create(req.body);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "Something went wrong."
        })
    }
}

getBatches = async (req, res) => {
    try {
        const batches = await Processing.find().sort({ batchNumber: 'desc' }).lean()
        res.status(200).json({ success: true, data: batches });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "Something went wrong."
        })
    }
}

processBatch = async (req, res) => {
    try {
        console.log(req.body)
        const batch = req.body;
        batch.totalWineGal = req.body.count750mLBottles/5 + req.body.count375mLBottles/10;
        batch.totalProofGal = batch.totalWineGal * batch.finalProof / 100;
        const tank = await Tank.findOne({ _id: req.body.id })
        batch.tankInfo = tank.tankInfo;
        batch.currentFill = tank.currentFill;
        batch.losses = batch.currentFill.proofGal - batch.totalProofGal;
        console.log(batch)
        await Processing.create(batch);
        //reset tank.currentFill
        tank.currentFill.contents = '';
        tank.currentFill.fillDate = null;
        tank.currentFill.fillProof = 0;
        tank.currentFill.wineGal = 0;
        tank.currentFill.proofGal = 0;
        tank.currentFill.distillData = [];
        tank.currentFill.agingData = [];
        tank.currentFill.duration = 0;
        tank.currentFill.emptyDate = null;
        tank.currentFill.notes = '';

        await tank.save();
        
        
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "Something went wrong."
        })
    }
}

module.exports = {
    getBatches,
    processBatch,
    makeProcessingLogEntry
}