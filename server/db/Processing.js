const mongoose = require('mongoose');

const DistillData = new mongoose.Schema({
    fermentId: String,
    mashDate: Date,
    distillDate: Date,
});

const PreviousTanks = new mongoose.Schema({
    tankType: String,
    tankNumber: Number,
    tankId: String,
    storageDuration: Number
});

// This info does not change unless barrel is broken or sold
const TankInfo = new mongoose.Schema({
    tankType: {
        type: String,
        //required: [true, "Please provide a tank type"],
        unique: false,
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
})

// when a barrel is emptied into another one, the duration & emptyDate fields will be updated and the info will be moved into the tank history.
// everything will then be reset to the default values.
const Fill = new mongoose.Schema({
    contents: {
        type: String,
        //required: [true, "Please provide contents"],
        unique: false,
        default: null,
    },
    fillDate: {
        type: Date,
        //required: [true, "Please provide a fill date"],
        unique: false,
        default: Date.now,
    }, 
    fillProof: {
        type: Number,
        //required: [true, "Please provide a fill proof"],
        unique: false,
        default: null,
    }, 
    wineGal: {
        type: Number,
        //required: [true, "Please provide a fill volume"],
        unique: false,
        default: null,
    }, 
    proofGal: {
        type: Number,
        //required: [true, "Please provide a fill volume"],
        default: function() { return this.wineGal * this.fillProof/100},
    },
    distillData: [DistillData],
    agingData: [PreviousTanks],
    notes: {
        type: String,
        required: false,
        default: null,
    }
})

const Processing = new mongoose.Schema({
    bottleDate: Date,
    batchType: String,
    batchNumber: Number,
    type: {
        type: String,
        enum: ['whiskeyWeak', 'whiskeyStrong', 'brandyWeak', 'brandyStrong', 'rum', 'gin', 'vodka', 'neutral', 'neutralLow', 'liqueur', 'tequila', 'cocktail', 'blendedStraight', 'blendedNeutral', 'blendedWLight', 'blendedLight', 'otherBlended', 'importedScotch', 'importedCanadian', 'importedIrish&others']
    },
    tankInfo: TankInfo,
    currentFill: Fill,
    finalProof: {
        type: Number,
        required: true,
    },
    count750mLBottles: {
        type: Number, 
        required: true,
    },
    count375mLBottles: {
        type: Number, 
        required: true,
    },
    totalWineGal: {
        type: Number,
        default: function() { return +Math.floor(this.count750mLBottles/5 + this.count375mLBottles/10)}
    },
    totalProofGal: {
        type: Number,
        default: function() { return +Math.floor(((this.count750mLBottles/5 + this.count375mLBottles/10) * this.finalProof/100) * 10)/10}
    },
    losses: {
        type: Number,
        default: function() {return this.currentFill.ProofGal - this.totalProofGal}
    },
    userId: {
        type: String,
        required: false,
        unique: false,
    }
},
    { timestamps: true},
);

module.exports =  mongoose.model.Processing || mongoose.model("Processing", Processing);