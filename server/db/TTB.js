const mongoose = require('mongoose');

const Alcs = new mongoose.Schema({
    blendedStraight: Number,
    blendedNeutral: Number,
    blendedWLight: Number,
    blendedLight: Number,
    otherBlended: Number,
    importedScotch: Number,
    importedCanadian: Number,
    importedIrishAndothers: Number,
    whiskeyWeak: Number,
    whiskeyStrong: Number, 
    brandyWeakGrapes: Number,  
    brandyWeakNoGrapes: Number, 
    brandyStrongGrapes: Number,
    brandyStrongNoGrapes: Number,
    brandyWeak: {
        type: Number,
        default: function() { 
            if (this.brandyWeakGrapes && this.brandyWeakNoGrape) {
                return this.brandyWeakGrapes + this.brandyWeakNoGrapes;
            } else if (this.brandyWeakGrapes) return this.brandyWeakGrapes;
            else if (this.brandyWeakNoGrapes) return this.brandyWeakNoGrapes;
            else return null }
    },
    brandyStrong: {
        type: Number,
        default: function() { 
            if (this.brandyStrongGrapes && this.brandyStrongNoGrape) {
                return this.brandyStrongGrapes + this.brandyStrongNoGrapes;
            } else if (this.brandyStrongGrapes) return this.brandyStrongGrapes;
            else if (this.brandyStrongNoGrapes) return this.brandyStrongNoGrapes;
            else return null }
    },
    rum: Number, 
    gin: Number,
    vodka: Number,
    neutralGrain: Number,
    neutralFruit: Number,
    neutralMolasses: Number,
    neutralRedistilled: Number,
    neutral: {
        type: Number,
        default: function() {
            if (this.neutralGrain || this.neutralFruit || this.neutralMolasses || this.neutralRedistilled){
                return (this.neutralGrain? this.neutralGrain: 0) + 
                (this.neutralFruit? this.neutralFruit: 0) + 
                (this.neutralMolasses? this.neutralMolasses: 0) + 
                (this.neutralRedistilled? this.neutralRedistilled: 0)
            } else return null;
        }
    },
    neutralLow: Number,
    other: Number,
    liqueur: Number,
    cocktail: Number,
    tequila: Number,
    total: Number,
})

const ProductionPartII = new mongoose.Schema({
    grain: Number, 
    fruit: Number, 
    molasses: Number,
})
const ProductionPartIII = new mongoose.Schema({
    grain: String,
    newCoop: Number,
    usedCoop: Number,
    tanks: Number,
})
const ProductionPartIV = new mongoose.Schema({
    grapeWeak: Number, 
    grapeStrong: Number, 
    noGrapeWeak: Number, 
    noGrapeStrong: Number,
})
const ProductionPartVI = new mongoose.Schema({
    type: String,
    kind: String,
    quantity: Number,
    uom: String,
})

const TTBSchema = new mongoose.Schema({
    yearMonth: String,
    productionTaxPayment: Alcs,
    productionUseOfUS: Alcs,
    productionHospSciEdu: Alcs,
    productionExport: Alcs,
    productionTransferToFTZ: Alcs,
    productionTransferToCMBW: Alcs,
    productionUseOnVessels: Alcs,
    productionUseInWineProduction: Alcs,
    productionToProcessing: Alcs,
    productionForTIB: Alcs,
    productionToStorage: Alcs,
    productionToResearch: Alcs,
    productionTotals: Alcs,
    productionReceived: Alcs,
    productionPartII: ProductionPartII,
    productionPartIII: [ProductionPartIII],
    productionPartIV: ProductionPartIV,
    productionPartV: Alcs,
    productionPartVI: [ProductionPartVI],

    storageFirstOfMonth: Alcs,
    depositedInStorage: Alcs,
    storageRecFromCustoms: Alcs,
    storageReturned:Alcs,
    storageTotal6: Alcs,
    storageTaxpaid: Alcs,
    storageToUseOfUS: Alcs,
    storageToHospSciEdu: Alcs,
    storageToExport: Alcs,
    storageTransferToFTZ: Alcs,
    storageTransferToCMBW: Alcs,
    storageUseOnVessels: Alcs,
    storageTransferToBondedWinery: Alcs,
    storageTransferToCBW: Alcs,
    storageToResearch: Alcs,
    storageToProcessing: Alcs,
    storageToProduction: Alcs,
    storageToTIB: Alcs,
    storageDestroyed: Alcs,
    storageLosses: Alcs,
    storageEndofMonth: Alcs,
    storageTotal24:Alcs,
    
    processingFirstOfMonthBulk: Number,
    processingReceivedBulk: Number,
    processingFuelUse: Number,
    processingAlcFlavMat: Number,
    processingWineAndSpirits: Number, // line 5 && 10 should be equal
    processingDumpedForFurtherProc: Number,
    processingGainsBulk: Number,
    processingTotal7: Number,

    processingBottledOrPackaged: Number,
    processingUsedForDenaturation: Number,
    processingTIB: Number,
    processingWithdrawnTaxDetermined: Number,
    processingFreeOfTax: Number,
    processingForAddToWine: Number,
    processingTransferToCBW: Number,
    processingTransferToProduction: Number,
    processingToResearchBulk: Number,
    processingDestroyed: Number,
    processingRedistilled: Number,
    processingLossesBulk: Number,
    processingEndofMonthBulk: Number,
    processingTotal26: Number,

    processingFirstOfMonthBottled: Number,
    processingFirstOfMonthPackaged: Number,
    processingBottledTotal: Number,
    processingPackagedTotal: Number,
    processingReceivedBottled: Number,
    processingReceivedPackaged: Number,
    processingInventoryOveragesBottled: Number,
    processingInventoryOveragesPackaged: Number,
    processingTotalBottled31: Number,
    processingTotalPackaged31: Number,
    processingPackagedTIB: Number,
    processingWithdrawnTaxDeterminedBottled: Number,
    processingWithdrawnTaxDeterminedPackaged: Number,
    processingToResearchBottled: Number,
    processingToResearchPackaged: Number,
    processingForAddToWineBottled: Number,
    processingForAddToWinePackaged: Number,
    processingTransferToCBWBottled: Number,
    processingTransferToCBWPackaged: Number,
    processingTransferToProductionBottled: Number,
    processingTransferToProductionPackaged: Number,
    processingToResearchBottled: Number,
    processingToResearchPackaged: Number,
    processingDestroyedBottled: Number,
    processingDestroyedPackaged: Number,
    processingDumpedForMoreProcBottled: Number,
    processingDumpedForMoreProcPackaged: Number,
    processingLossesBottled: Number,
    processingLossesPackaged: Number,
    processingShortagesBottled: Number,
    processingShortagesPackaged: Number,
    processingEndOfMonthBottled: Number,
    processingEndOfMonthPackaged: Number,
    processingTotal47Bottled: Number,
    processingTotal47Packaged: Number,

    processingBulkSpiritsDumped: Alcs,
    processingBottled: Alcs,
    processingWineGalBottled: Alcs,
    processingWineGalBottledInBond: Alcs,
    processingBottledForExport: Alcs,
    userId: {
        type: String,
        required: false,
        unique: false,
    }
},
    { timestamps: true},
);

module.exports =  mongoose.model.TTBSchema || mongoose.model("TTB", TTBSchema);