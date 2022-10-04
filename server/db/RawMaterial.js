const mongoose = require('mongoose');

const PurchaseLog = new mongoose.Schema({
    quantity: Number, //number of packages
    packageSize: Number, //size of package in quantity UOM, e.g. 500 if uom is g and bricks come in 500 g quantities
    quantityUom: {
        type: Number,
        default: function() { return this.quantity * this.packageSize }
    },
    costPerPackage: Number,
    costPerUom: {
        type: Number,
        default: function() { return this.costPerPackage / this.packageSize },
    },
    extraCharges: {
        type: Number,
    },
    totalCost: {
        type: Number,
        default: function() { return this.costPerPackage * this.quantity + (this.extraCharges || 0) },
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
    dateReceived: {
        type: Date,
    },
    vendor: {
        type: String,
    },
    lotNo: {
        type: String,
    },
})

const EditLog = new mongoose.Schema({
    editDate: {
        type: Date,
        default: Date.now
    },
    quantityAdjustment: {
        type: Number
    }
})

const UseLog = new mongoose.Schema({
    quantity: Number, //in uom
    cost: {
        type: Number,
    },
    useDate: {
        type: Date,
        default: Date.now,
    },
    fermentId: {
        type: String
    }
})

const RawMaterial = new mongoose.Schema({
    materialType: {
        type: String,
        unique: false,
        enum: ['yeast', 'grain', 'fruit', 'cane-product', 'cleaning product', 'nutrient', 'enzyme', 'packaging supply'],
    }, 
    name: {
        type: String,
        unique: false,
    }, 
    /* quantityOnHandUom: {
        type: Number,
        unique: false,
    },
    currentCost: {
        type: Number,
        unique: false,
    }, */
    uom: {
        type: String,
        unique: false,
    },/* 
    lastPurchaseDate: {
        type: Date,
        unique: false,
    },  */
    purchaseLog: [PurchaseLog],
    useLog: [UseLog],
    editLog: [EditLog],
    reorderQuantity: {
        type: Number,
        required: false,
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

module.exports =  mongoose.model.RawMaterial || mongoose.model("RawMaterial", RawMaterial);