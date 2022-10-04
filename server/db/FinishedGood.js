const mongoose = require('mongoose');

const FinishedGoodSchema = new mongoose.Schema({
    spiritType: {
        type: String,
        //required: [true, "Please provide a tank type"],
        unique: false,
    }, 
    quantityPerCase: {
        type: Number,
        //required: [true, "Please provide a fill volume"],
        unique: false,
    }, 
    bottleVol: {
        type: Number,
        //required: [true, "Please provide a tank number"],
        unique: false,
    },
    batchNumber: {
        type: Number,
        //required: [true, "Please provide the number of times this barrel has been filled"],
        unique: false,
    },
    bottleDate: {
        type: Date,
        //required: [true, "Please provide the number of times this barrel has been filled"],
        unique: false,
    },
    initialNumberOfCases: {
        type: Number,
        //required: [true, "Please provide contents"],
        unique: false,
    },
    currentNumberOfCases: {
        type: Number,
        //required: [true, "Please provide a fill date"],
        unique: false,
    },
},
    { timestamps: true},
);

module.exports =  mongoose.model.FinishedGoodSchema || mongoose.model("FinishedGood", FinishedGoodSchema);