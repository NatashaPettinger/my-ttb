const RawMaterial = require('../db/RawMaterial')

const getRawMaterials = async(req, res) => {// working on 9/11/22
    try {
        const data = await RawMaterial.find(/* { userId: req.user.id } */);
        res.status(200).json({ success: true, data: data });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
}

const receiveRawMaterials = async(req, res) => {
    try {
        if (req.body.id) {
            const material = await RawMaterial.findOne({ _id: req.body.id });
            material.purchaseLog.push(req.body.data);
            material.purchaseLog.sort((a,b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
            await material.save();
            res.status(200).json({ success: true, data: material });
        }
        else {
            const newMaterial = req.body;
            newMaterial.purchaseLog = req.body;
            newMaterial.userId = req.user.id;
            const material =  await RawMaterial.create(newMaterial);
            res.status(200).json({ success: true, data: material });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
}

const editMaterialLog = async(req, res) => {
    try {
        const material = await RawMaterial.findOne({ _id: req.body.parentId });
        const index = material[req.body.logId].findIndex(x => x._id == req.body.editId);

        material[req.body.logId][index][req.body.entryKey] = req.body.data.data;

        if (req.body.logId === 'purchaseLog' && ['extraCharges', 'quantity', 'costPerPackage', 'packageSize'].includes(req.body.entryKey)){
            material.purchaseLog[index].quantityUom = material.purchaseLog[index].quantity * material.purchaseLog[index].packageSize;
            material.purchaseLog[index].costPerUom = material.purchaseLog[index].costPerPackage / material.purchaseLog[index].packageSize;
            material.purchaseLog[index].totalCost = material.purchaseLog[index].costPerPackage * material.purchaseLog[index].quantity + (material.purchaseLog[index].extraCharges || 0);
        };

        if (req.body.logId === 'useLog'){
            if (req.body.entryKey === 'quantity') {
                material.useLog[index].cost = material.useLog[index].quantity * material.purchaseLog[0].costPerUom;
            }
        }

        material[req.body.logId].sort((a,b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
        await material.save();
        res.status(200).json({ success: true, data: material });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
}

const quantityAdjust = async(req,res) => {
    try {
        const editEntry = {editDate: req.body.data.editDate}
        const material = await RawMaterial.findOne({ _id: req.body.id });
        
        let currentQuantity = material.purchaseLog.reduce((a,b)=> a + b.quantityUom, 0) - material.useLog.reduce((a,b)=> a + b.quantity, 0) + material.editLog.reduce((a,b)=> a + b.quantityAdjustment, 0);

        editEntry.quantityAdjustment = req.body.data.quantityOnHand - currentQuantity;
        material.editLog.push(editEntry);
        
        material.editLog.sort((a,b)=> new Date(b.purchaseDate) - new Date(a.purchaseDate));

        await material.save();
        res.status(200).json({ success: true, data: material });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
}

const editQuantityAdjust = async(req,res) => {
    try {
        const material = await RawMaterial.findOne({ _id: req.body.id });
        const index = material.editLog.findIndex(x => x._id == req.body.editId)
        
        if (req.body.data.editDate !== '') material.editLog[index].editDate = req.body.data.editDate;
        if (req.body.data.adjustment !== '') material.editLog[index].quantityAdjustment = req.body.data.adjustment;

        material.editLog.sort((a,b) => new Date(b.editDate) - new Date(a.editDate))
        
        await material.save(); 
        res.status(200).json({ success: true, data: material });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
}

const editRawMaterials = async(req,res) => {
    try {
        const material = await RawMaterial.findOne({ _id: req.body.id });

        material.materialType = req.body.data.materialType;
        if (req.body.data.name !== '') material.name = req.body.data.name;
        material.uom = req.body.data.uom;
        if (req.body.data.reorderQuantity !== '') material.reorderQuantity = req.body.data.reorderQuantity;
        
        await material.save();
        res.status(200).json({ success: true, data: material });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
}

module.exports = {
    getRawMaterials, 
    receiveRawMaterials, 
    editRawMaterials,
    quantityAdjust,
    editQuantityAdjust,
    editMaterialLog
}
