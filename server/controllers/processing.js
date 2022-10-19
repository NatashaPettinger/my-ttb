const Tank = require('../db/Tank');
const Processing = require('../db/Processing');
const ProcessingLog = require('../db/ProcessingLog');
const StorageLog = require('../db/StorageLog');


getBatches = async (req, res) => {
    try {
        const batches = await Processing.find({ userId: req.user.id }).sort({ batchNumber: 'desc' }).lean()
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
        batch.userId = req.user.id;
        batch.totalWineGal = req.body.count750mLBottles/5 + req.body.count375mLBottles/10;
        batch.totalProofGal = batch.totalWineGal * batch.finalProof / 100;

        const tank = await Tank.findOne({ _id: req.body.id })
        batch.tankInfo = tank.tankInfo;
        batch.currentFill = tank.currentFill;
        batch.losses = batch.currentFill.proofGal - batch.totalProofGal;

        const procLog = {
            transferDate: req.body.bottleDate,
            yearMonth: req.body.bottleDate.slice(0,7),
            spiritType: req.body.spiritType,
            quantity: batch.totalProofGal, //proofGallons
            quantityWG: batch.totalWineGal, //wineGallons
            proof: req.body.finalProof,
            storageTankId: tank._id,
            processType: 'deposit',
            description: req.body.description,
            distillData: batch.currentFill.distillData,
            userId: req.user.id
        };

        const storLog1 = {
            transferDate: req.body.bottleDate,
            yearMonth: req.body.bottleDate.slice(0,7),
            spiritType: req.body.spiritType,
            quantity: batch.totalProofGal, //proofGallons
            proof: req.body.finalProof,
            storageTankId: tank._id,
            processType: 'withdrawal',
            description: 'storageToProcessing',
            distillData: batch.currentFill.distillData,
            userId: req.user.id
        };
        const storLog2 = {
            transferDate: req.body.bottleDate,
            yearMonth: req.body.bottleDate.slice(0,7),
            spiritType: req.body.spiritType,
            quantity: batch.losses, //proofGallons
            proof: req.body.finalProof,
            storageTankId: tank._id,
            processType: 'withdrawal',
            description: 'storageLosses',
            distillData: batch.currentFill.distillData,
            userId: req.user.id
        };

        //reset tank.currentFill
        tank.currentFill = {
            duration: 0,
            emptyDate: null,
            contents: '',
            fillDate: null,
            fillProof: 0,
            wineGal: 0,
            proofGal: 0,
            distillData: [],
            agingData: [],
            duration: 0,
            notes: ''
        }


        await Processing.create(batch);
        await tank.save();
        await StorageLog.create([storLog1, storLog2]);
        await ProcessingLog.create(procLog);
        
        
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
}