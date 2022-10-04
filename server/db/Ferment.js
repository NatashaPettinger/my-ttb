const mongoose = require('mongoose');

const Ingredient = new mongoose.Schema({
    category: String,
    type: String,
    quantity: Number, 
    uom: String,
    timeAdded: Date,
    temp: Number,
    materialsId: String,
    note: {
        type: String,
        required: false,
    } 
})

const MashData = new mongoose.Schema({
    millTime: Number,
    heating1: Number, //heat duration
    holdTemp1: Number,
    hold1: Number, //duration
    heating2: Number, //heat duration 2
    holdTemp2: Number, 
    hold2: Number, //duration
    cooling1: Number, //duration
    holdTemp3: Number,
    hold3: Number, //duration
    cooling2: Number, //duration
    pumpTime: Number, //duration
})

const FermentData = new mongoose.Schema({
    dateTime: Date,
    temp: Number,
    gravity: Number, 
    pH: Number,
    notes: String
})

const CutData = new mongoose.Schema({
    startTime: Date,
    numberOfRefluxingPlates: Number,
    dephlegSetting: Number,
    headTemp: Number,
    potTemp: Number,
})

const DistillData = new mongoose.Schema({
    distillDate: Date,
    boilerOn: Date,
    
    pumpStart: Date,
    pumpEnd: Date,
    pumpDuration: {
        type: Number
    },

    cipColumnTime: Date,
    tailsQuantityPumped: Number,
    tailsTime: Date,

    startingMashData: FermentData,

    steamOn: Date,

    dephlegOnTime: Date,
    dephlegOnPotTemp: Number, 
    dephlegOnSetting: Number,

    foreshotsData: CutData,
    foreshotsGallons: Number,
    headsData: CutData,
    headsGallons: Number,
    heartsData: CutData,
    heartsGallons: Number,
    tailsData: CutData,
    tailsGallons: Number,

    tailsEndProof: Number,

    steamOff: Date,

    heartsProof: Number,
    totalTimeHours: {
        type: Number
    },
    headsUse: {
        type: String,
        default: 'Discard'
    },
    tailsUse: {
        type: String,
        default: 'Redistill'
    },
    notes: String,
})


const FermentSchema = new mongoose.Schema({
    //................... Mash info .........................
    mashDate: {
        type: Date,
        default: Date.now,
        unique: false,
    }, 
    ingredients: [Ingredient],
    mashData: MashData,
    fermentTankNo: {
        type: Number,
        unique: false,
    }, 
    fermentData: [FermentData],
    lowWinesData: [],
    distillData: DistillData,
    distilled: {
        type: Boolean,
        default: false,
    },
    transferred: {
        type: Boolean,
        default: false,
    },
    notes: {
        type: Array,
        unique: false,
    },
    userId: {
        type: String,
        required: false,
        unique: false,
    }
},
    { timestamps: true},
);

module.exports =  mongoose.model.FermentSchema || mongoose.model("Ferment", FermentSchema);