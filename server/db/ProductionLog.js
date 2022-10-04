const mongoose = require('mongoose');

const DistillData = new mongoose.Schema({
    fermentId: String,
    mashDate: Date,
    distillDate: Date,
});

const ProductionLog = new mongoose.Schema({
    transferDate: Date,
    yearMonth: String,
    spiritType: {
        type: String,
        //required: true,
        enum: ['whiskeyWeak',
            'whiskeyStrong', 
            'brandyWeakGrapes', 
            'brandyWeakNoGrapes', 
            'brandyStrongGrapes',
            'brandyStrongNoGrapes',
            'rum', 
            'gin',
            'vodka',
            'neutralGrain',
            'neutralFruit',
            'neutralMolasses',
            'neutralRedistilled',
            'neutralLow',
            'other',]
    },
    quantity: Number, //proofGallons
    proof: Number,
    processType: {
        type: String,
        enum: ['withdrawal', 'deposit']
    },
    tankType: {
        type: String,
        enum: ['tank', 'newCoop', 'usedCoop'] // only necessary if transferring to storage & whiskey
    },
    grainType: {
        Type: String,
        enum: ['wheat', 'rye', 'bourbon', 'corn', 'oat', 'malt', 'barley', 'american']
    },  //only necessary if transferring to storage & whiskey
    description: {
        type: String,
        enum: ['productionTaxPayment',
            'productionUseOfUS',
            'productionHospSciEdu',
            'productionExport',
            'productionTransferToFTZ',
            'productionTransferToCMBW',
            'productionUseOnVessels',
            'productionUseInWineProduction',
            'productionToProcessing',
            'productionForTIB',
            'productionToStorage',
            'productionToResearch',
            'productionReceived',],
    },
    distillData: [DistillData],
    notes: String,
})

module.exports =  mongoose.model.ProductionLog || mongoose.model("ProductionLog", ProductionLog);