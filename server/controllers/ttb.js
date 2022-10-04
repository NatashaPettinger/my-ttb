const e = require('express');
const Ferment = require('../db/Ferment');
const Tank = require('../db/Tank')
const Processing = require('../db/Processing')
const Material = require('../db/RawMaterial')
const ProductionLog = require('../db/ProductionLog')
const ProcessingLog = require('../db/ProcessingLog')
const StorageLog = require('../db/StorageLog');
const TTB = require('../db/TTB');

const getReports = async(req,res) => {
    try {
        const ttb = await TTB.find().sort({ yearMonth: 'desc' });
        res.status(200).json({ success: true, data: ttb });
    } catch (error) {
        console.error(error);
    }
}

const processReports = async(req,res) => {
    try {
        const ttb = {
            yearMonth: req.body.date.slice(0,7),
        }
        //-------------------PRODUCTION-OPERATIONS-------------------------------
        const productionLogs = await ProductionLog.find({ yearMonth: ttb.yearMonth });
        for (let log of productionLogs){
            if (!ttb.productionTotals) {
                ttb.productionTotals = {};
            };
            if (!ttb[log.description]) {
                ttb[log.description] = {};
                ttb[log.description][log.spiritType] = log.quantity;
                ttb[log.description].total = log.quantity;
                ttb.productionTotals[log.spiritType] = log.quantity;
            } else {
                ttb[log.description][log.spiritType]? ttb[log.description][log.spiritType] += log.quantity: ttb[log.description][log.spiritType] = log.quantity;
                ttb[log.description].total += log.quantity;
                ttb.productionTotals[log.spiritType]? ttb.productionTotals[log.spiritType] += log.quantity: ttb.productionTotals[log.spiritType] = log.quantity;
            }
        }
        ttb.productionTotals.total = Object.values(ttb.productionTotals).reduce((a,b)=>a+b,0);
        //-------------------PRODUCTION-PART-II-NEUTRAL-SPIRITS----------------------
        if (ttb.productionTotals.neutralGrain || ttb.productionTotals.neutralFruit || ttb.productionTotals.neutralMolasses || ttb.productionTotals.neutralRedistilled){
            ttb.productionPartII = {
                grain: ttb.productionTotals.neutralGrain, 
                fruit: ttb.productionTotals.neutralFruit, 
                molasses: ttb.productionTotals.neutralMolasses,
                redistillation: ttb.productionTotals.neutralRedistilled,
            }
        }
        //-------------------PRODUCTION-PART-III-WHISKEY-----------------------
        if (ttb.productionToStorage && ttb.productionToStorage.whiskeyStrong > 0 ){
            ttb.productionPartIII.push({
                grain: 'light',
                newCoop: productionLogs.filter(x => x.spiritType === 'whiskeyStrong' && x.tankType === 'newCoop').reduce((a,b)=>a + b.quantity, 0),
                usedCoop: productionLogs.filter(x => x.spiritType === 'whiskeyStrong' && x.tankType === 'usedCoop').reduce((a,b)=>a + b.quantity, 0),
                tanks: productionLogs.filter(x => x.spiritType === 'whiskeyStrong' && x.tankType === 'tank').reduce((a,b)=>a + b.quantity, 0),
            })
        }
        if (ttb.productionToStorage && ttb.productionToStorage.whiskeyWeak > 0 ){
            const grainArray = [];
            const grainWhiskey = productionLogs.filter(x => x.spiritType === 'whiskeyWeak');
            for (let obj of grainWhiskey){
                if (!grainArray.includes(obj.grainType)) grainArray.push(obj.grainType);
            }
            for (let grain of grainArray){
                ttb.productionPartIII.push({
                    grain: grain,
                    newCoop: grainWhiskey.filter(x => x.tankType === 'newCoop' && x.grainType === grain).reduce((a,b)=>a + b.quantity, 0),
                    usedCoop: grainWhiskey.filter(x => x.tankType === 'usedCoop' && x.grainType === grain).reduce((a,b)=>a + b.quantity, 0),
                    tanks: grainWhiskey.filter(x => x.tankType === 'tank' && x.grainType === grain).reduce((a,b)=>a + b.quantity, 0),
                })
            }
        }
        //-------------------PRODUCTION-PART-IV-BRANDY-----------------------
        if (ttb.productionTotals.brandyWeakGrapes || ttb.productionTotals.brandyWeakNoGrapes || ttb.productionTotals.brandyStrongGrapes || ttb.productionTotals.brandyStrongNoGrapes ){
            ttb.productionPartIV = {
                grapeWeak: ttb.productionTotals.brandyWeakGrapes, 
                grapeStrong: ttb.productionTotals.brandyStrongGrapes, 
                noGrapeWeak: ttb.productionTotals.brandyWeakNoGrapes, 
                noGrapeStrong: ttb.productionTotals.brandyStrongNoGrapes,
            }
        }
        //-------------------PRODUCTION-PART-V-REDISTILLATION-----------------------
        if (ttb.productionReceived){
            ttb.productionPartV = ttb.productionReceived;
            delete ttb.productionPartV.total
        }
        //-------------------PRODUCTION-PART-VI-RAW-MATERIALS----------------------
        const materials = await Material.find({ $or: 
            [{materialType: 'grain'}, 
            {materialType: 'fruit'}, 
            {materialType: 'cane-product'}]})
        const materialsUsed = [];
        materials.forEach(x => {
            const quantity = x.useLog.filter(y => y.useDate.toString().slice(0,7) === ttb.yearMonth).reduce((a,b)=>a + b.quantity,0);
            if (quantity > 0){
                materialsUsed.push({
                    type: x.materialType,
                    kind: x.name,
                    quantity: quantity,
                    uom: x.uom,
                })
            }
        });
        ttb.productionPartVI = materialsUsed;


        //add in first of month & last of month and totals -> save a log of the start of the month each time it processes.
        //-------------------STORAGE-OPERATIONS-------------------------------
        const storageLogs = await StorageLog.find({ yearMonth: ttb.yearMonth });
        for (let log of storageLogs){
            if (!ttb.storageTotal6){
                ttb.storagetTotal6 = {};
            }
            if (!ttb.storageTotal24){
                ttb.storagetTotal24 = {};
            }
            if (!ttb[log.description]) {
                ttb[log.description] = {};
                ttb[log.description][log.spiritType] = log.quantity;
                ttb[log.description].total = log.quantity;
                if (['depositedInStorage',
                'storageRecFromCustoms',
                'storageReturned'].includes(log.description)){
                    ttb.storageTotal6[log.spiritType]? ttb.storageTotal6[log.spiritType] += log.quantity: ttb.storageTotal6[log.spiritType] = log.quantity;
                } else ttb.storageTotal24[log.spiritType]? ttb.storageTotal24[log.spiritType] += log.quantity: ttb.storageTotal24[log.spiritType] = log.quantity;
            } else {
                ttb[log.description][log.spiritType]? ttb[log.description][log.spiritType] += log.quantity: ttb[log.description][log.spiritType] = log.quantity;
                if (['depositedInStorage',
                'storageRecFromCustoms',
                'storageReturned'].includes(log.description)){
                    ttb.storageTotal6[log.spiritType]? ttb.storageTotal6[log.spiritType] += log.quantity: ttb.storageTotal6[log.spiritType] = log.quantity;
                } else ttb.storageTotal24[log.spiritType]? ttb.storageTotal24[log.spiritType] += log.quantity: ttb.storageTotal24[log.spiritType] = log.quantity;
            }
        }


        //-------------------PROCESSING-OPERATIONS-------------------------------
        const processingLogs = await ProcessingLog.find({ yearMonth: ttb.yearMonth });
        for (let log of processingLogs){
            if (['processingBulkSpiritsDumped',
            'processingBottled',
            'processingWineGalBottled',
            'processingWineGalBottledInBond',
            'processingBottledForExport',].includes(log.description)){
                if (!ttb[log.description]) {
                    ttb[log.description] = {};
                    ttb[log.description][log.spiritType] = log.quantity;
                    ttb[log.description].total = log.quantity;
                } else {
                    ttb[log.description][log.spiritType]? ttb[log.description][log.spiritType] += log.quantity: ttb[log.description][log.spiritType] = log.quantity;
                    ttb[log.description].total += log.quantity;
                }
            } else {
                ttb[log.description]? ttb[log.description] += log.quantity: ttb[log.description] = log.quantity;
            }
        }
        //add in first of month & last of month and totals

        //add in first of month & last of month and totals

        console.log(ttb)
        await TTB.create(ttb);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getReports,
    processReports,
}