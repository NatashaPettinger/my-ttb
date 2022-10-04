const mongoose = require('mongoose');

//old variabl info:
//fillNumber is now equal to tankHistory.length
//days in barrel is now equal to (new Date.now() - new Date(tank.currentFill.fillDate))/(1000 * 60 * 60 * 24)


const DistillData = new mongoose.Schema({
    fermentId: String,
    mashDate: Date,
    distillDate: Date,
});

const PreviousTanks = new mongoose.Schema({
    tankType: String,
    tankNumber: Number,
    tankId: String,
    duration: Number,
    fillDate: Date,
    emptyDate: Date,
});

const Status = new mongoose.Schema({
    useable: {
        type: Boolean,
        default: true,
        required: true,
    },
    saleDate: {
        type: Date,
        required: false,
    },
    brokenDate: {
        type: Date,
        required: false,
    }
})

// This info does not change unless barrel is broken or sold
const TankInfo = new mongoose.Schema({
    tankType: {
        type: String,
    }, 
    tankNumber: {
        type: Number,
        //required: [true, "Please provide a tank number"],
        unique: false,
    },
    capacity: {
        type: Number,
        //required: [true, "Please provide a tank capacity"],
        unique: false,
    },
    char: {
        type: String,
        //required: [true, "Please provide a char level. Put 0 if not a barrel."],
        unique: false,
    },
    manufacturer: {
        type: String, 
        //required: [true, "Please provide a barrel manufacturer or 'N/A' if not a barrel."],
    },
    status: Status,
})

// when a barrel is emptied into another one, the duration & emptyDate fields will be updated and the info will be moved into the tank history.
// everything will then be reset to the default values.
const Fill = new mongoose.Schema({
    spiritType: {
        type: String,
        //required: true,
        enum: ['whiskey-under-160', 'whiskey-over-160', 'brandy-under-170-grapes', 'brandy-under-170-no-grapes', 'brandy-over-170-grapes', 'brandy-over-170-no-grapes', 'rum', 'gin', 'vodka', 'neutral-grain', 'neutral-fruit', 'neutral-molasses', 'neutral-redistilled','neutral-under-190','other']
    },
    firstMonthsCoop:{
        type: String,
        enum: ['newCoop', 'usedCoop', 'tank']
    },
    productionOperationsDate: String,
    contents: {
        type: String,
        unique: false,
        default: null,
    },
    fillDate: {
        type: Date,
        unique: false,
        default: null,
    }, 
    fillProof: {
        type: Number,
        unique: false,
        default: 0,
    }, 
    wineGal: {
        type: Number,
        unique: false,
        default: 0,
    }, 
    proofGal: {
        type: Number,
        default: function() { return this.wineGal * this.fillProof/100},
    },
    distillData: [DistillData],
    agingData: [PreviousTanks],
    duration: {
        type: Number,
        required: false,
        default: 0,
    },
    emptyDate: {
        type: Date,
        unique: false,
        default: null,
    }, 
    notes: {
        type: String,
        required: false,
        default: '',
    }
})


const TankSchema = new mongoose.Schema({
    tankInfo: TankInfo,
    tankHistory: [Fill],
    currentFill: Fill,
    userId: {
        type: String,
        required: false,
        unique: false,
    },
    productionTank: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true},
);

module.exports =  mongoose.model.TankSchema || mongoose.model("Tank", TankSchema);