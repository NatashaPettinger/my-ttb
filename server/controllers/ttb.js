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
        const ttb = await TTB.find({ userId: req.user.id }).sort({ yearMonth: 'desc' });
        res.status(200).json({ success: true, data: ttb });
    } catch (error) {
        console.error(error);
    }
}

const deleteReports = async(req,res) => {
    try {
        const ttb = await TTB.findOneAndDelete({ _id: req.body.id });
        res.status(200).json({ success: true, data: ttb });
    } catch (error) {
        console.error(error);
    }
}

const processReports = async(req,res) => {
    try {
        console.log(req.body)
        const ttb = {
            yearMonth: req.body.data.date.slice(0,7),
        }
        //-------------------PRODUCTION-OPERATIONS-------------------------------
        // don't include 'productionReceived' in these totals
        const productionLogs = await ProductionLog.find({ yearMonth: ttb.yearMonth });
        for (let log of productionLogs){
            // sum spirit type columns 
            if (!ttb.productionTotals && log.description !== 'productionReceived') {
                ttb.productionTotals = {};
                ttb.productionTotals[log.spiritType] = log.quantity;
            } else if (log.description !== 'productionReceived') {
                ttb.productionTotals[log.spiritType]? 
                    ttb.productionTotals[log.spiritType] += log.quantity: 
                    ttb.productionTotals[log.spiritType] = log.quantity;
            };
            
            // add quantities by spirit type
                //this line isn't working for 'productionReceived' description:
            if (!ttb[log.description]) {
                ttb[log.description] = {
                    total: log.quantity
                };
                ttb[log.description][log.spiritType] = log.quantity;
            } else {
                ttb[log.description][log.spiritType]? 
                    ttb[log.description][log.spiritType] += log.quantity: 
                    ttb[log.description][log.spiritType] = log.quantity;
                ttb[log.description].total += log.quantity;
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
        // don't include 'productionReceived' in these totals
        ttb.productionPartIII = [];
        if (ttb.productionToStorage && ttb.productionToStorage.whiskeyStrong > 0 ){
            ttb.productionPartIII.push({
                grainType: 'Light',
                newCoop: productionLogs.filter(x => x.description !== 'productionReceived' && x.spiritType === 'whiskeyStrong' && x.tankType === 'newCoop').reduce((a,b)=>a + b.quantity, 0),
                usedCoop: productionLogs.filter(x => x.description !== 'productionReceived' && x.spiritType === 'whiskeyStrong' && x.tankType === 'usedCoop').reduce((a,b)=>a + b.quantity, 0),
                tanks: productionLogs.filter(x => x.description !== 'productionReceived' && x.spiritType === 'whiskeyStrong' && x.tankType === 'tank').reduce((a,b)=>a + b.quantity, 0),
            })
        }
        if (ttb.productionToStorage && ttb.productionToStorage.whiskeyWeak > 0 ){
            let grainArray = [];
            const grainWhiskey = productionLogs.filter(x => x.description !== 'productionReceived' && x.spiritType === 'whiskeyWeak');
            for (let obj of grainWhiskey){
                if (grainArray.indexOf(obj.grainType.toString()) === -1){
                    grainArray.push(obj.grainType.toString());
                } 
            }
            for (let grain of grainArray){
                ttb.productionPartIII.push({
                    grainType: grain[0].toUpperCase() + grain.slice(1),
                    newCoop: grainWhiskey.filter(x => x.tankType === 'newCoop' && x.grainType == grain.toString()).reduce((a,b)=>a + b.quantity, 0),
                    usedCoop: grainWhiskey.filter(x => x.tankType === 'usedCoop' && x.grainType == grain.toString()).reduce((a,b)=>a + b.quantity, 0),
                    tanks: grainWhiskey.filter(x => x.tankType === 'tank' && x.grainType == grain.toString()).reduce((a,b)=>a + b.quantity, 0),
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

        const prevMonth = ttb.yearMonth.endsWith('12')? 
            (+ttb.yearMonth.split('-')[0] + 1) + '-01': 
            ttb.yearMonth.slice(0,5) + (+ttb.yearMonth.slice(5) + 1).padStart(2, '0');
        const previousMonth = TTB.findOne({ yearMonth: prevMonth });
        if (previousMonth) {
            ttb.storageFirstOfMonth = previousMonth.storageEndOfMonth;
            ttb.storageEndOfMonth = {...previousMonth.storageEndOfMonth};
        }

        const storageLogs = await StorageLog.find({ yearMonth: ttb.yearMonth });
        for (let log of storageLogs){
            if (!ttb.storageTotal6){
                ttb.storageTotal6 = {
                    total: 0,
                };
            }
            if (!ttb.storageTotal24){
                ttb.storageTotal24 = {
                    total: 0,
                };
            }

            if (!ttb[log.description]) {
                ttb[log.description] = {
                    total: log.quantity
                };
                ttb[log.description][log.spiritType] = log.quantity;
            } else {
                ttb[log.description][log.spiritType]? 
                    ttb[log.description][log.spiritType] += log.quantity: 
                    ttb[log.description][log.spiritType] = log.quantity;
                ttb[log.description].total += log.quantity;
            }

            if (['depositedInStorage',
                'storageRecFromCustoms',
                'storageReturned'].includes(log.description)){
                storage.endOfMonth[log.spiritType]? 
                    storage.endOfMonth[log.spiritType] += log.quantity:
                    storage.endOfMonth[log.spiritType] = log.quantity;
                if (ttb.storageTotal6[log.spiritType]){
                    ttb.storageTotal6[log.spiritType] += log.quantity;
                    ttb.storageTotal6.total += log.quantity;
                } else {
                    ttb.storageTotal6[log.spiritType] = log.quantity;
                    ttb.storageTotal6.total = log.quantity;
                }
            } else {
                storage.endOfMonth[log.spiritType]? 
                    storage.endOfMonth[log.spiritType] -= log.quantity:
                    storage.endOfMonth[log.spiritType] = -log.quantity;
                if (ttb.storageTotal24[log.spiritType]){
                    ttb.storageTotal24[log.spiritType] += log.quantity;
                    ttb.storageTotal24.total += log.quantity;
                } else {
                    ttb.storageTotal24[log.spiritType] = log.quantity;
                    ttb.storageTotal24.total = log.quantity;
                }
            } 
        }


        //-------------------PROCESSING-OPERATIONS-------------------------------
        const processingLogs = await ProcessingLog.find({ yearMonth: ttb.yearMonth });
        for (let log of processingLogs){
            if (['processingWineGalBottled',
            'processingWineGalBottledInBond',
            'processingBottledForExport',].includes(log.description)){
                if (!ttb[log.description]) {
                    ttb[log.description] = {
                        total: log.quantityWG,
                    };
                    ttb[log.description][log.spiritType] = log.quantityWG;
                } else {
                    ttb[log.description][log.spiritType]? 
                        ttb[log.description][log.spiritType] += log.quantityWG: 
                        ttb[log.description][log.spiritType] = log.quantityWG;
                    ttb[log.description].total += log.quantityWG;
                }

                if (!ttb.processingBottled) {
                    ttb.processingBottled = {
                        total: log.quantity,
                    }
                    ttb.processingBottled[log.spiritType] = log.quantity;
                } else {
                    ttb.processingBottled[log.spiritType]? 
                        ttb.processingBottled[log.spiritType] += log.quantity:
                        ttb.processingBottled[log.spiritType] = log.quantity;
                    ttb.processingBottled[log.spiritType] += log.quantity;
                }
                //add it all to the dumped for processing. For totals there, fill in the dumped into processing sum as well

            } 
            // optimization: make it so processing account can have quantity on hand at start and end of month, and so that alcohol can be transferred out.
            /* else {
                ttb[log.description]? ttb[log.description] += log.quantity: ttb[log.description] = log.quantity;
            } */
        }
        //add in first of month & last of month and totals

        //add in first of month & last of month and totals

        //-------------------PROCESSING-OPERATIONS-------------------------------
        const ttbYear = ttb.yearMonth.slice(0,5);
        if (ttb.yearMonth.endsWith('03') ||
            ttb.yearMonth.endsWith('06') ||
            ttb.yearMonth.endsWith('09') ||
            ttb.yearMonth.endsWith('12')) {
                const quarter = (
                    ttb.yearMonth.endsWith('03')? [ ttbYear + '01', ttbYear + '02', ttbYear + '03']:
                    ttb.yearMonth.endsWith('06')? [ ttbYear + '04', ttbYear + '05', ttbYear + '06']:
                    ttb.yearMonth.endsWith('09')? [ ttbYear + '07', ttbYear + '08', ttbYear + '09']:
                    [ ttbYear + '10', ttbYear + '11', ttbYear + '12'])
        }

        const exciseTax = await TTB.find({ ttbYear: {$in: quarter} });

        const processingDue = exciseTax.reduce((sum, current) => sum + current.processingBottled.total, 0);
        const productionDue = exciseTax.reduce((sum, current) => sum + current.productionTaxPayment.total, 0);
        const storageDue = exciseTax.reduce((sum, current) => sum + current.storageTaxpaid.total, 0);

        ttb.exciseTax = (processingDue + productionDue + storageDue) * 2.7;

        ttb.userId = req.user.id;
        console.log(ttb)
        await TTB.create(ttb);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getReports,
    deleteReports,
    processReports,
}