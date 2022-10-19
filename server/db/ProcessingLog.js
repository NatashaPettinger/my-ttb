const mongoose = require('mongoose');

const DistillData = new mongoose.Schema({
    fermentId: String,
    mashDate: Date,
    distillDate: Date,
});

const ProcessingLog = new mongoose.Schema({
    date: Date,
    yearMonth: String,
    spiritType: {
        type: String,
        //required: true,
        enum: ['blendedStraight',
        'blendedNeutral',
        'blendedWLight',
        'blendedLight',
        'otherBlended',
        'importedScotch',
        'importedCanadian',
        'importedIrishAndothers',
        'whiskeyWeak',
        'whiskeyStrong', 
        'brandyWeak', 
        'brandyStrong',
        'rum', 
        'gin',
        'vodka',
        'neutral',
        'other',
        'liqueur',
        'cocktail',
        'tequila',]
    },
    state: {
        type: String,
        enum: ['bottled', 'packaged', 'bottled-in-bond', 'bulk']
    },
    quantity: Number, //proofGallons
    quantityWG: Number, //wineGallons
    tankId: String,
    processType: {
        type: String,
        enum: ['withdrawal', 'deposit']
    },
    description: {
        type: String,
        enum: [
            'processingReceivedBulk',
            'processingFuelUse',
            'processingAlcFlavMat',
            'processingWineAndSpirits', // line 5 && 10 should be equal
            'processingDumpedForFurtherProc',
            'processingGainsBulk',
            'processingBottledOrPackaged', // should equal 'processingBottledTotal' + 'processingPackagedTotal'
            'processingUsedForDenaturation',
            'processingTIB',
            'processingWithdrawnTaxDetermined',
            'processingFreeOfTax',
            'processingForAddToWine',
            'processingTransferToCBW',
            'processingTransferToProduction',
            'processingToResearchBulk',
            'processingDestroyed',
            'processingRedistilled',
            'processingLossesBulk',
            'processingBottledTotal',
            'processingPackagedTotal',
            'processingReceivedBottled',
            'processingReceivedPackaged',
            'processingInventoryOveragesBottled',
            'processingInventoryOveragesPackaged',
            'processingPackagedTIB',
            'processingWithdrawnTaxDeterminedBottled',
            'processingWithdrawnTaxDeterminedPackaged',
            'processingToResearchBottled',
            'processingToResearchPackaged',
            'processingForAddToWineBottled',
            'processingForAddToWinePackaged',
            'processingTransferToCBWBottled',
            'processingTransferToCBWPackaged',
            'processingTransferToProductionBottled',
            'processingTransferToProductionPackaged',
            'processingToResearchBottled',
            'processingToResearchPackaged',
            'processingDestroyedBottled',
            'processingDestroyedPackaged',
            'processingDumpedForMoreProcBottled',
            'processingDumpedForMoreProcPackaged',
            'processingLossesBottled',
            'processingLossesPackaged',
            'processingShortagesBottled',
            'processingShortagesPackaged',
            'processingEndOfMonthBottled',
            'processingEndOfMonthPackaged',
            'processingBulkSpiritsDumped',
            'processingBottled',
            'processingWineGalBottled',
            'processingWineGalBottledInBond',
            'processingBottledForExport',],
    },
    distillData: [DistillData],
    userId: {
        type: String,
        required: false,
        unique: false,
    }
})

module.exports =  mongoose.model.ProcessingLog || mongoose.model("ProcessingLog", ProcessingLog);