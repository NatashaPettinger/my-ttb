const e = require('express');
const Ferment = require('../db/Ferment');
const Tank = require('../db/Tank')
const StorageLog = require('../db/StorageLog')
const ProductionLog = require ('../db/ProductionLog')

const makeStorageLogEntry = async (req, res) => {
    try {
        const log = req.body;
        log.userId = req.user.id;
        await StorageLog.create(req.body);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "Something went wrong."
        })
    }
}

const getTanks = async (req, res) => {
    try{
        const tanks = await Tank.find({ userId: req.user.id }).sort({ tankNumber: 'desc' }).lean();
        res.status(200).json({ success: true, data: tanks });
    } catch (err) {
        console.error(err);
    }
}

// Use for TIBs:
const createTank = async (req, res) => {
    try {
        console.log(req.body)
        const newTank = req.body;
        newTank.tankInfo.status = {useable: true};
        newTank.currentFill.distillData = [];
        newTank.currentFill.agingData = [];
        newTank.tankHistory = [];
        newTank.userId = req.user.id;
        

        const tank = await Tank.create(newTank);
        res.json({
            success: true,
            id: tank._id,
            message: `${tank.tankInfo.tankType} #${tank.tankInfo.tankNumber} has been added.`,
        })
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "New tank not added."
        })
    }
}

// use updateTank instead of decomissionTank
/* decomissionTank = async (req, res) => {
    try {
        const tank = await Tank.find({ _id: req.body.id });
        if (tank.currentFill.proofGal) throw error('tank not empty');
        tank.tankInfo.outOfCommission = req.body.data;
        await tank.save();
        return res.status(201).json({
            success:true,
            message: "Decomission successful",
        })
    } catch (error) {
        console.error(err);
        return res.status(400).json({
            message: "Something went wrong."
        })
    }
} */

setProductionTank = async (req, res) => {
    try {
        const prodTank = req.body.data;
        prodTank.productionTank = true;
        prodTank.tankInfo.tankNumber = 0;
        prodTank.tankInfo.char = 0;
        prodTank.tankInfo.status = {
            useable: true,
        };
        prodTank.currentFill = {
            distillData: [],
            wineGal: 0,
            proofGal: 0,
        }
        prodTank.userId = req.user.id;
        await Tank.create(prodTank)
        return res.status(201).json({
            success:true,
            message: "Tank Created",
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "Something went wrong."
        })
    }
}

//transfer from processing: adds all processing runs to spiritSafe, which is tank0 in the warehouse.
transferFromProduction = async (req, res) => {
    try {
        console.log(req.body);
        const ferment = await Ferment.find({ transferred: false, distilled: true });
        const tank = await Tank.findOne({ productionTank: true });

        ferment.forEach(x => tank.currentFill.distillData.push({ 
            fermentId: x._id,
            mashDate: x.mashDate,
            distillDate: x.distillData.distillDate,
        }))
        
        ferment.map(x => x.transferred = true);

        const productionLog = req.body.productionLog;
        productionLog.transferDate = req.body.currentFill.fillDate;
        productionLog.yearMonth = req.body.currentFill.fillDate.slice(0,7);
        productionLog.description = 'productionToStorage';
        productionLog.processType = 'withdrawal';
        productionLog.quantity = req.body.currentFill.wineGal * req.body.currentFill.fillProof/100;
        productionLog.proof = req.body.currentFill.fillProof;
        productionLog.distillData = tank.currentFill.distillData
        productionLog.notes = req.body.currentFill.notes;

        const storageLog = productionLog;
        storageLog.description = 'depositedInStorage';
        storageLog.processType = 'deposit';
        if (req.body.productionLog.spiritType === "brandyWeakGrapes" || req.body.productionLog.spiritType === "brandyWeakNoGrapes"){
            storageLog.spiritType = "brandyWeak";
        } else if (req.body.productionLog.spiritType === "brandyStrongGrapes" || req.body.productionLog.spiritType === "brandyStrongNoGrapes" ){
            storageLog.spiritType = "brandyStrong";
        } else if (req.body.productionLog.spiritType === "neutralGrain" || 
            req.body.productionLog.spiritType === "neutralFruit" ||
            req.body.productionLog.spiritType === "neutralMolasses" ||
            req.body.productionLog.spiritType === "neutralRedistilled"){
            storageLog.spiritType = "neutral";
        } 

        tank.currentFill.fillDate = req.body.currentFill.fillDate;
        tank.currentFill.wineGal = req.body.currentFill.wineGal;
        tank.currentFill.proofGal = req.body.currentFill.wineGal * req.body.currentFill.fillProof/100;
        tank.currentFill.fillProof = req.body.currentFill.fillProof;
        tank.currentFill.contents = req.body.currentFill.contents;
        tank.currentFill.notes = req.body.currentFill.notes;
        tank.currentFill.productionOperationsDate = req.body.currentFill.fillDate.slice(0,7);
        tank.currentFill.productionOperationsKind = req.body.currentFill.productionOperationsKind;

        await tank.save();
        await ferment.forEach(x => x.save());
        await ProductionLog.create(productionLog);
        await StorageLog.create(storageLog);
        
        return res.status(201).json({
            success:true,
            message: "Transfer successful",
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "Something went wrong."
        })
    }
}

transferToExistingTank = async (req, res) => {
    try {
        console.log(req.body)
        const startTank = await Tank.findOne({ _id: req.body.id });
        const endTank = await Tank.findOne({ _id: req.body.data.endTank });
        
        //currentFill info for new tank
        agingData = Array.from(startTank.currentFill.agingData);
        agingData.push({
            tankType: startTank.tankInfo.tankType,
            tankNumber: startTank.tankInfo.tankNumber,
            tankId: startTank._id,
            duration: (new Date(req.body.data.emptyDate) - new Date(startTank.currentFill.fillDate))/(1000 * 60 * 60 * 24 * 365/12),
            fillDate: startTank.currentFill.fillDate,
            emptyDate: req.body.data.emptyDate
        })
        endTank.currentFill.contents = (endTank.currentFill.contents === startTank.currentFill.contents || endTank.currentFill.contents === '') ? startTank.currentFill.contents: startTank.currentFill.contents + ' | ' + endTank.currentFill.contents;
        endTank.currentFill.fillDate = req.body.data.emptyDate;
        endTank.currentFill.fillProof = (endTank.currentFill.fillProof * endTank.currentFill.wineGal + req.body.data.currentFill.fillProof * req.body.data.currentFill.wineGal)/(endTank.currentFill.wineGal + req.body.data.currentFill.wineGal);
        endTank.currentFill.wineGal += +req.body.data.currentFill.wineGal + +req.body.data.currentFill.waterAdded;
        endTank.currentFill.proofGal = endTank.currentFill.wineGal * endTank.currentFill.fillProof/100;
        endTank.currentFill.distillData = endTank.currentFill.distillData.concat(startTank.currentFill.distillData);
        endTank.currentFill.agingData = endTank.currentFill.agingData.concat(agingData);
        endTank.currentFill.notes += startTank.currentFill.notes || '';

        if (req.body.data.empty) {
            startTank.currentFill.duration = (new Date(req.body.data.emptyDate) - new Date(startTank.currentFill.fillDate))/(1000 * 60 * 60 * 24 * 365/12);
            startTank.currentFill.emptyDate = new Date(req.body.data.emptyDate);
            startTank.tankHistory.push(startTank.currentFill);

            startTank.currentFill.contents = '';
            startTank.currentFill.fillDate = null;
            startTank.currentFill.fillProof = 0;
            startTank.currentFill.wineGal = 0;
            startTank.currentFill.proofGal = 0;
            startTank.currentFill.distillData = [];
            startTank.currentFill.agingData = [];
            startTank.currentFill.duration = 0;
            startTank.currentFill.notes = '';

        } else {

            startTank.currentFill.wineGal -= req.body.data.currentFill.wineGal;
            startTank.currentFill.proofGal = startTank.currentFill.wineGal * startTank.currentFill.fillProof/100;

        }

        await endTank.save();
        await startTank.save();
        return res.status(201).json({
            success:true,
            message: "Transfer successful",
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "Something went wrong."
        })
    }
}

transferToNewTank = async (req, res) => {
    try {
        const startTank = await Tank.findOne({ _id: req.body.id });
        //tankInfo for new tank
        const endTank = {
            tankInfo: {},
            tankHistory: [],
            currentFill: {},
        };
        endTank.tankInfo = req.body.data.tankInfo;
        endTank.tankInfo.status = { useable: true };
        //currentFill info for new tank
        agingData = Array.from(startTank.currentFill.agingData);
        agingData.push({
            tankType: startTank.tankInfo.tankType,
            tankNumber: startTank.tankInfo.tankNumber,
            tankId: startTank._id,
            duration: (new Date(req.body.data.emptyDate) - new Date(startTank.currentFill.fillDate))/(1000 * 60 * 60 * 24 * 365/12),
            fillDate: startTank.currentFill.fillDate,
            emptyDate: req.body.data.emptyDate,
        })
        
        endTank.currentFill.contents = startTank.currentFill.contents;
        endTank.currentFill.fillDate = req.body.data.emptyDate;
        endTank.currentFill.fillProof = req.body.data.currentFill.fillProof;
        endTank.currentFill.wineGal = req.body.data.currentFill.wineGal + req.body.data.currentFill.waterAdded;
        endTank.currentFill.proofGal = endTank.currentFill.wineGal * endTank.currentFill.fillProof/100;
        endTank.currentFill.distillData = Array.from(startTank.currentFill.distillData);
        endTank.currentFill.agingData = agingData;
        endTank.currentFill.notes += startTank.currentFill.notes || '';

        endTank.userId = req.user.id;

        //edit initial tank to reflect either loss in volume or emptied.
        if (req.body.data.empty) {
            startTank.currentFill.duration = (new Date(req.body.data.emptyDate) - new Date(startTank.currentFill.fillDate))/(1000 * 60 * 60 * 24 * 365);
            startTank.currentFill.emptyDate = new Date(req.body.data.emptyDate);
            startTank.tankHistory.push(startTank.currentFill);

            startTank.currentFill.contents = '';
            startTank.currentFill.fillDate = null;
            startTank.currentFill.fillProof = 0;
            startTank.currentFill.wineGal = 0;
            startTank.currentFill.proofGal = 0;
            startTank.currentFill.distillData = [];
            startTank.currentFill.agingData = [];
            startTank.currentFill.duration = 0;
            startTank.currentFill.notes = '';
        } else {
            startTank.currentFill.wineGal -= req.body.data.currentFill.wineGal;
            startTank.currentFill.proofGal = startTank.currentFill.wineGal * startTank.currentFill.fillProof/100;
        }
        await Tank.create(endTank);
        await startTank.save();
        return res.status(201).json({
            success:true,
            message: "Transfer successful",
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "Something went wrong."
        })
    }
}

transferOutOfStorage = async (req, res) => {
    // add transfer to storage log. Remove distillate from current tank.
    try {
        console.log(req.body)
        //should get req.body.log = { transferDate, spiritType, description, fillProof, notes};
        //need: log = {yearMonth, quantity(PG), storageTankId, distillData}
        
        const tank = await Tank.findOne({ _id: req.body.id })
        const log1 = req.body.data.log;
        log1.yearMonth = req.body.data.log.transferDate.slice(0,7);
        log1.quantity = req.body.data.wineGal * log1.proof/100;
        log1.storageTankId = tank._id;
        log1.userId = req.user.id;
        if (tank.currentFill.distillData) log1.distillData = tank.currentFill.distillData;
        //check to make sure that there are no losses.
        if (req.body.data.empty) {
            if (tank.currentFill.proofGal - log1.quantity > 0) {
                const log2 = log1;
                log2.quantity = tank.currentFill.proofGal - log1.quantity;
                log2.description = 'storageLosses';
                log2.userId = req.user.id;
                await StorageLog.create(log2);
            }

            tank.currentFill.duration = (new Date(req.body.data.emptyDate) - new Date(tank.currentFill.fillDate))/(1000 * 60 * 60 * 24 * 365);
            tank.currentFill.emptyDate = new Date(req.body.data.emptyDate);
            tank.tankHistory.push(tank.currentFill);

            tank.currentFill.contents = '';
            tank.currentFill.fillDate = null;
            tank.currentFill.fillProof = 0;
            tank.currentFill.wineGal = 0;
            tank.currentFill.proofGal = 0;
            tank.currentFill.distillData = [];
            tank.currentFill.agingData = [];
            tank.currentFill.duration = 0;
            tank.currentFill.notes = '';
        } else {
            tank.currentFill.wineGal -= req.body.data.wineGal;
            tank.currentFill.proofGal = tank.currentFill.wineGal * tank.currentFill.fillProof/100;
        }

        await StorageLog.create(log1);
        await tank.save();
        res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);
        return res.status(400).json({
        message: "Something went wrong."});
    }
}

updateTank = async (req, res) => {
    try {
        const tank = await Tank.findOne({ _id: req.body.parentId });

        if (req.body.entryKey === 'status.saleDate' || req.body.entryKey === 'status.brokenDate') {
            tank.tankInfo.status.useable = false;
        }
        tank.tankInfo[req.body.entryKey] = req.body.data.data;

        res.status(200).json({ message: "tank updated" })
    } catch (error) {
        console.error(error);
    }
}

updateFill = async (req, res) => {
    try { 
        const tank = await Tank.findOne({ _id: req.body.parentId });
        tank.currentFill[req.body.entryKey] = req.body.data.data;

        if (req.body.entryKey === 'wineGal' || req.body.entryKey === 'fillProof') {
            tank.currentFill.proofGal = tank.currentFill.wineGal * tank.currentFill.fillProof/100;
        }

        await tank.save();
        res.status(200).json({ message: "tank updated" })
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    makeStorageLogEntry,
    getTanks,
    createTank,
    setProductionTank,
    transferFromProduction,
    transferToExistingTank,
    transferToNewTank,
    transferOutOfStorage,
    updateTank,
    updateFill,
}