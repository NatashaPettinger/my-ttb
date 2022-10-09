const mongoose = require('mongoose');

const DistillData = new mongoose.Schema({
    fermentId: String,
    mashDate: Date,
    distillDate: Date,
});

const StorageLog = new mongoose.Schema({
    transferDate: Date,
    yearMonth: String,
    spiritType: {
        type: String,
        //required: true,
        enum: ['whiskeyWeak',
        'whiskeyStrong', 
        'brandyWeak', 
        'brandyStrong',
        'rum', 
        'gin',
        'vodka',
        'neutral',
        'neutralLow',
        'other',]
    },
    quantity: Number, //proofGallons
    proof: Number,
    storageTankId: String,
    processType: {
        type: String,
        enum: ['withdrawal', 'deposit']
    },
    description: {
        type: String,
        enum: ['depositedInStorage',
            'storageRecFromCustoms',
            'storageReturned',
            'storageTaxpaid',
            'storageToUseOfUS',
            'storageToHospSciEdu',
            'storageToExport',
            'storageTransferToFTZ',
            'storageTransferToCMBW',
            'storageUseOnVessels',
            'storageTransferToBondedWinery',
            'storageTransferToCBW',
            'storageToResearch',
            'storageToProcessing',
            'storageToProduction',
            'storageToTIB',
            'storageDestroyed',
            'storageLosses'],
    },
    distillData: [DistillData],
    notes: String,
    userId: {
        type: String,
        required: false,
        unique: false,
    }
})

module.exports =  mongoose.model.StorageLog || mongoose.model("StorageLog", StorageLog);