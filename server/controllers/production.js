const Ferment = require('../db/Ferment');
const RawMaterial = require('../db/RawMaterial');
const ProductionLog = require('../db/ProductionLog');
const StorageLog = require('../db/StorageLog');
const ProcessingLog = require('../db/ProcessingLog');
const Tank = require('../db/Tank');
//const { transferFromProduction } = require('./warehousing');

// @PATCH api/production/productionTransferLog
// @desc transfer spirits out of production -> NOT TO STORAGE OR PROCESSING ACCOUNTS
// @access logged in user
const productionTransferLog = async (req, res) => {
    try {
        const log = req.body;
        log.userId = req.user.id;
        log.yearMonth = req.body.transferDate.slice(0,7);

        if (log.description === 'productionReceived') log.processType = 'deposit';
        else log.processType = 'withdrawal';
        
        log.distillData = [];
        const ferments = await Ferment.find({ transferred: false, distilled: true });
        ferments.map(x => x.transferred = true);

        await ProductionLog.create(log);
        await ferments.save();
        res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "Something went wrong."
        })
    }
}


/* 

if (req.body.description === 'productionToStorage') {
    const storageLog = Object.assign({},log);
    if (storageLog.spiritType === 'brandyWeakGrapes' || 
        storageLog.spiritType === 'brandyWeakNoGrapes') {
        storageLog.spiritType = 'brandyWeak'
    } else if (storageLog.spiritType === 'brandyStrongGrapes' ||
        storageLog.spiritType === 'brandyStrongNoGrapes') {
        storageLog.spiritType = 'brandyStrong';
    } else if (storageLog.spiritType === 'neutralGrain' ||
        storageLog.spiritType === 'neutralFruit' ||
        storageLog.spiritType === 'neutralMolasses' ||
        storageLog.spiritType === 'neutralRedistilled') {
            storageLog.spiritType = 'neutral'
    }
    storageLog.processType = 'deposit';
    storageLog.description = 'depositedInStorage';

    await ProductionLog.create(log);
    await StorageLog.create(storageLog);


    res.status(200).json({ success: true });
} else if (req.body.description === 'productionToProcessing') {
    
} else { */


const getFerments = async (req, res) => {
    try {
        const ferments = await Ferment.find({ userId: req.user.id }).sort({ mashDate: 'desc' });
        res.status(200).json({ success: true, data: ferments });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
}

const createMash = async (req, res) => {
    try {
        const ferment = req.body;
        ferment.userId = req.user.id;
        ferment.distillData = {};
        const savedFerment = await Ferment.create(ferment);
        res.json({
            success: true,
            id: ferment._id,
            message: `${savedFerment.mashDate} has been added.`,
        })
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "New ferment not added."
        })
    }
}

const redistillFromStorage = async (req, res) => {
    try {
        const distillate = await Tank.find({ _id: { $in: req.body.tanksTransferred } });
        const distillData = [];
        distillate.forEach(tank => distillData.push(tank.currentFill.distillData))

        const ferment = {
            mashDate: req.body.transferDate,
            mashBill: 'redistilled from distillate in storage',
            userId: req.user.id,
            distillData: {},
            lowWinesData: distillData,
        }


        const prodLog = {
            transferDate: req.body.transferDate,
            yearMonth: req.body.transferDate.slice(0,7),
            spiritType: req.body.spiritType,
            quantity: req.body.quantity,
            processType: 'deposit',
            description: 'productionReceived',
            distillData: ferment.lowWinesData,
            notes: req.body.notes,
            userId: req.user.id,
        }

        const storageLog = {
            transferDate: req.body.transferDate,
            yearMonth: req.body.transferDate.slice(0,7),
            spiritType: req.body.spiritType,
            quantity: req.body.quantity,
            processType: 'withdrawal',
            description: 'storageToProduction',
            distillData: ferment.lowWinesData,
            notes: req.body.notes,
            userId: req.user.id,
        }

        distillate.forEach(tank => {
            tank.tankHistory.push(tank.currentFill);

            tank.currentFill = {
                duration: (new Date(req.body.transferDate) - new Date(tank.currentFill.fillDate))/(1000 * 60 * 60 * 24 * 365/12),
                emptyDate: new Date(req.body.transferDate),
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
        })

        await distillate.forEach(x => x.save());
        const savedFerment = await Ferment.create(ferment);
        await ProductionLog.create(prodLog);
        await StorageLog.create(storageLog);
        res.json({
            success: true,
            id: ferment._id,
            message: `${savedFerment.mashDate} has been added.`,
        })
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "New ferment not added."
        })
    }
}

const redistillFromProduction = async (req, res) => {
    try {
        const lowWines = await Ferment.find({ _id: { $in: req.body.availableRuns } });
        const distillData = [];
        lowWines.forEach(ferment => {
            distillData.push(ferment.distillData);
        })
        lowWines.map(ferment => {
            ferment.transferred = true;
        })

        const ferment = {
            mashDate: req.body.transferDate,
            mashBill: 'redistilled from distillate in production',
            userId: req.user.id,
            distillData: {},
            lowWinesData: distillData,
        }
        await lowWines.forEach(x => x.save());
        const savedFerment = await Ferment.create(ferment);

        res.json({
            success: true,
            id: ferment._id,
            message: `${savedFerment.mashDate} has been added.`,
        })
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "New ferment not added."
        })
    }
}

const addIngredient = async (req, res) => {
    try {
        if (req.body.data.ingredientId) {
            const ingredient = await RawMaterial.findOne({ _id: req.body.data.ingredientId });
            const ferment = await Ferment.findOne({ _id: req.body.id });

            const useEntry = {};
            useEntry.quantity = req.body.data.quantity;
            useEntry.useDate = ferment.mashDate;
            useEntry.cost = useEntry.quantity * ingredient.purchaseLog[0].costPerUom;
            useEntry.fermentId = ferment._id;
            
            ingredient.useLog.push(useEntry);
            ingredient.useLog.sort((a,b) => new Date(b.useDate) - new Date(a.useDate));
            ingredient.quantityOnHandUom -= req.body.data.quantity;

            const ingredientEntry = req.body.data;
            ingredientEntry.category = ingredient.materialType;
            ingredientEntry.type = ingredient.name;
            ingredientEntry.uom = ingredient.uom;
            ingredientEntry.timeAdded = new Date(ferment.mashDate.toISOString().slice(0,11) + req.body.data.timeAdded + ':00');
            ingredientEntry.materialsId = ingredient._id;
            
            ferment.ingredients.push(ingredientEntry);
            ferment.ingredients.sort((a,b) => new Date(a.timeAdded) - new Date(b.timeAdded));
            
            await ingredient.save();
            await ferment.save();
            res.json({
                success: true,
                id: ferment._id,
                message: `${ingredientEntry.type} has been added.`,
            })
        } else {
            const ferment = await Ferment.findOne({ _id: req.body.id });
            const ingredientEntry = req.body.data;
            ingredientEntry.category = 'action';
            ingredientEntry.type = req.body.data.action;
            ingredientEntry.timeAdded = new Date(ferment.mashDate.toISOString().slice(0,11) + req.body.data.timeAdded + ':00');
            
            ferment.ingredients.push(ingredientEntry);
            ferment.ingredients.sort((a,b) => new Date(a.timeAdded) - new Date(b.timeAdded));
            
            await ferment.save();

            res.json({
                success: true,
                id: ferment._id,
                message: `${ingredientEntry.type} has been added.`,
            })
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "New details not added."
        })
    }
}

// is there a way to tie the ingredient use log entry to the added ingredient entry for easier editing?
const editIngredient = async (req, res) => {
    try {
        
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "New details not added."
        })
    }
}

const setFermentTank = async (req, res) => {
    try {
        console.log(req.body)
        const ferment = await Ferment.findOneAndUpdate({ _id: req.body.id }, 
            { $set: {fermentTankNo: req.body.data.fermentTankNo}});
        res.json({
            success: true,
            id: ferment._id,
            message: `Ferment Tank has been set.`,
        })
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "New details not added."
        })
    }
}

const addFermentData = async (req, res) => {
    try {
        console.log(req.body.data)
        const ferment = await Ferment.findOne({ _id: req.body.id });
        ferment.fermentData.push(req.body.data);
        ferment.fermentData.sort((a,b) => new Date(a.dateTime) - new Date(b.dateTime))
        await ferment.save();
        res.json({
            success: true,
            id: ferment._id,
            message: `Data has been added.`,
        })
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "New details not added."
        })
    }
}

const addStillDataPoint = async (req, res) => {
    try {
        console.log(req.body)
        const ferment = await Ferment.findOne({ _id: req.body.id })
         
        if (req.body.stillKey === 'distillDate') {
            ferment.distillData.distillDate = req.body.data.data;
        } else if (!ferment.distillData.distillDate) {
            res.json({
            success: true,
            message: `Please enter a distillation date prior to adding additional data points.`,
        })} else if (req.body.stillKey === 'boilerOn') {
            ferment.distillData.boilerOn = new Date(ferment.distillData.distillDate.toISOString().slice(0,11) + req.body.data.data + ':00');
        } else if (req.body.stillKey === 'pumpStart') {
            ferment.distillData.pumpStart = new Date(ferment.distillData.distillDate.toISOString().slice(0,11) + req.body.data.data + ':00');
        } else if (req.body.stillKey === 'pumpEnd') {
            ferment.distillData.pumpEnd = new Date(ferment.distillData.distillDate.toISOString().slice(0,11) + req.body.data.data + ':00');
            if (ferment.distillData.pumpStart) {
                ferment.distillData.pumpDuration = (new Date(ferment.distillData.pumpEnd) - new Date(ferment.distillData.pumpStart))/(1000 * 60);
            }
        } else if (req.body.stillKey === 'pumpDuration') {
            ferment.distillData.pumpDuration = req.body.data.data;
        } else if (req.body.stillKey === 'cipColumnTime') {
            ferment.distillData.cipColumnTime = new Date(ferment.distillData.distillDate.toISOString().slice(0,11) + req.body.data.data + ':00');
        } else if (req.body.stillKey === 'tailsTime') {
            ferment.distillData.tailsTime = new Date(ferment.distillData.distillDate.toISOString().slice(0,11) + req.body.data.data + ':00');
        } else if (req.body.stillKey === 'tailsQuantityPumped') {
            ferment.distillData.tailsQuantityPumped = req.body.data.data;
        } else if (req.body.stillKey === 'steamOn') {
            ferment.distillData.steamOn = new Date(ferment.distillData.distillDate.toISOString().slice(0,11) + req.body.data.data + ':00');
        } else if (req.body.stillKey === 'dephlegOnTime') {
            ferment.distillData.dephlegOnTime = new Date(ferment.distillData.distillDate.toISOString().slice(0,11) + req.body.data.data + ':00');
        } else if (req.body.stillKey === 'dephlegOnPotTemp') {
            ferment.distillData.dephlegOnPotTemp = req.body.data.data;
        } else if (req.body.stillKey === 'dephlegOnSetting') {
            ferment.distillData.dephlegOnSetting = req.body.data.data;
        } else if (req.body.stillKey === 'foreshotsGallons') {
            ferment.distillData.foreshotsGallons = req.body.data.data;
        } else if (req.body.stillKey === 'headsGallons') {
            ferment.distillData.headsGallons = req.body.data.data;
        } else if (req.body.stillKey === 'heartsGallons') {
            ferment.distillData.heartsGallons = req.body.data.data;
        } else if (req.body.stillKey === 'tailsGallons') {
            ferment.distillData.tailsGallons = req.body.data.data;
        } else if (req.body.stillKey === 'tailsEndProof') {
            ferment.distillData.tailsEndProof = req.body.data.data;
        } else if (req.body.stillKey === 'heartsProof') {
            ferment.distillData.heartsProof = req.body.data.data;
        } else if (req.body.stillKey === 'steamOff') {
            ferment.distillData.steamOff = new Date(ferment.distillData.distillDate.toISOString().slice(0,11) + req.body.data.data + ':00');
            if (ferment.distillData.steamOn) {
                ferment.distillData.totalTimeHours = +((ferment.distillData.steamOff - new Date(ferment.distillData.steamOn))/(1000 * 60 * 60)).toFixed(2);
            } 
        } else if (req.body.stillKey === 'totalTimeHours') {
            ferment.distillData.totalTimeHours = req.body.data.data;
        } else if (req.body.stillKey === 'headsUse') {
            ferment.distillData.headsUse = req.body.data.data;
        } else if (req.body.stillKey === 'tailsUse') {
            ferment.distillData.tailsUse = req.body.data.data;
        } else if (req.body.stillKey === 'notes') {
            ferment.distillData.notes = req.body.data.data;
        } else if (req.body.type === 'checkbox') {
            ferment[req.body.stillKey] = req.body.data.data;
        } 
        await ferment.save();
        res.json({
            success: true,
            message: `${req.body.label} has been added.`,
        })
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "New details not added."
        })
    }
}

const stillMashData = async (req, res) => {
    try {
        const ferment = await Ferment.findOne({ _id: req.body.id })
        ferment.distillData.startingMashData = req.body.data; /* {
            temp: req.body.data.temp,
            gravity: req.body.data.gravity,
            pH: req.body.data.pH,
            notes: req.body.data.notes,
        }; */
        //check if the ferment data points have already been added before pushing to ferment data array
        req.body.data.dateTime = ferment.distillData.distillDate;
        ferment.fermentData.push(req.body.data);
        await ferment.save();
        res.json({
            success: true,
            message: `Initial mash data has been added.`,
        })
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "New details not added."
        })
    }
}

const stillCutStarts = async (req, res) => {
    try {
        const ferment = await Ferment.findOne({ _id: req.body.id });
        if (req.body.stillKey === 'foreshotsData') {
            ferment.distillData.foreshotsData = req.body.data;
            ferment.distillData.foreshotsData.startTime = new Date(ferment.distillData.distillDate.toISOString().slice(0,11) + req.body.data.startTime + ':00');
        } else if (req.body.stillKey === 'headsData') {
            ferment.distillData.headsData = req.body.data;
            ferment.distillData.headsData.startTime = new Date(ferment.distillData.distillDate.toISOString().slice(0,11) + req.body.data.startTime + ':00');
        } else if (req.body.stillKey === 'heartsData') {
            ferment.distillData.heartsData = req.body.data;
            ferment.distillData.heartsData.startTime = new Date(ferment.distillData.distillDate.toISOString().slice(0,11) + req.body.data.startTime + ':00');
        } else if (req.body.stillKey === 'tailsData') {
            ferment.distillData.tailsData = req.body.data;
            ferment.distillData.tailsData.startTime = new Date(ferment.distillData.distillDate.toISOString().slice(0,11) + req.body.data.startTime + ':00');
        }
        await ferment.save();
        res.json({
            success: true,
            message: `${req.body.label} data has been added.`,
        })
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "New details not added."
        })
    }
}


module.exports = {
    getFerments,
    createMash, 
    redistillFromStorage,
    redistillFromProduction,
    addIngredient,
    setFermentTank,
    addFermentData,
    addStillDataPoint,
    stillMashData,
    stillCutStarts,
    productionTransferLog
}