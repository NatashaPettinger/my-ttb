const Tank = require('../db/Tank')

// Use for TIBs:
createTank = async (req, res) => {
    try {
        const tank = await Tank.create(req.body);
        res.json({
            success: true,
            id: tank._id,
            message: `${tank.tankType} #${tank.tankNumber} has been added.`,
        })
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "New tank not added."
        })
    }
}

//skip history in form. Don't need it for transfer system. Add in distillation date range for transfering from tank.
//skip form data for history, batch, fill number, empty date, useable, daysinbarrel, 
//add validation: make sure there's enough capacity in new barrel for volume. 
//make sure that there's enough volume in old tank to fill new tank.

//Data format:
/* 
{   
    "startContainerType": options: barrel, tote, spiritSafe, restTank,
    "endContainerType": options: newBarrel, usedBarrel, tote, spiritSafe, restTank,
    "startId": "63068fc509b8fdc23402b5b6", //for totes, add to history array [[distill dates], 0],
    "startTankEmpty": "true",
    "endTank": {
        "tankType": "barrel",
        "tankNumber": "113",
        "fillNumber": "1",
        "contents": "Wheat Whiskey, Lallemand DS",
        "fillDate": "2022-08-26T18:25:43.511Z",
        "fillProof": "0",
        "wineGal": "53",
        "proofGal": "55.86",
        "capacity": "53",
        "char": "4",
        "manufacturer": "Charlois",
        "useable": "true",
        "batch": "",
        "history": []
        "notes": [],
        "filterable": "true",
        "daysInBarrel": "0"
    }
}
*/
//tankToNewTankorExistingBarrel
//tankToExistingTank
//ADD CONDITIONALS FOR THE DIFFERENT TYPES OF TANK TRANSFERS

barrelToNewBarrel = async (req, res) => {
    try {
        const endTank = req.body.endTank;

        //Validate volume will fit. W/ new tank, there will be no residual distillate in there:
        if (endTank.wineGal > endTank.capacity) throw new Error(`Attempted to fit ${endTank.wineGal} gallons in a ${endTank.capacity} gallon tank`);

        //check to see if endTank barrel number exists in collection & update endTank.fillNumber to reflect actual fillNumber:
        const usedBarrel = await Tank.find({ tankType: endTank.tankType, tankNumber: endTank.tankNumber }).sort((a,b) => b.fillNumber - a.fillNumber);
        if (usedBarrel.length > 0) {
            //check to make sure endTank barrel has room for transfer:
            if (usedBarrel[0].capacity - usedBarrel[0].wineGal < endTank.wineGal) throw new Error('Not enough room in used barrel for transferring THAT MUCH booze');
            endTank.fillNumber += usedBarrel[0].fillNumber;
        };

        //Get info on what is available for transfer:
        const startTank = await Tank.find({ _id: req.body.id });

        //validate there is enough volume in start tank to transfer the complete amount:
        if (startTank[0].proofGal - +endTank.proofGal < 0) throw new Error(`Attempted to transfer ${endTank.proofGal} proof gallons, but only ${startTank[0].proofGal} are available for transfer.`);
        
        //values to update in startTank document:
        let newWineGal = startTank[0].wineGal - +endTank.wineGal;
        let newProofGal = startTank[0].proofGal - +endTank.proofGal;
        let newDaysInBarrel = Math.floor((new Date(endTank.fillDate) - new Date(startTank[0].fillDate)) / (1000 * 60 * 60 * 24));
        
        //if startTank is a barrel, document will exist empty forever. Next use of startTank barrel will generate a new document.
        let newHistory = startTank[0].history.concat([`Transferred to ${end.tankType} ${end.tankNumber}`, 0]);

        //add distillate history to endTank document.
        //can sum over days (index 3) where the tank is a barrel (index 0), or a tank (for resting info)
        endTank.history.push(startTank[0].history);
        endTank.history.push([startTank[0].tankType, startTank[0].tankNumber, startTank[0]._id, newDaysInBarrel]);  

        //if tank is empty:
        if (req.body.startTankEmpty){
            const newEmptyDate = new Date(endTank.fillDate);
            newWineGal = 0;
            newProofGal = 0;
            //if it's a tote or the spirit safe, want to clear history for next batch.
            if (startTank !== 'barrel') {
                newHistory = [];
                newDaysInBarrel = 0;
            } ;
        };
        
        await Tank.bulkWrite([
            {
                insertOne: {
                    document: endTank
                }
            },
            { 
                updateOne: { 
                    filter: { _id: start[0]._id }, 
                    update: {
                        $set: {wineGal: newWineGal, 
                            proofGal: newProofGal, 
                            emptyDate: newEmptyDate,
                            daysInBarrel: newDaysInBarrel,
                            history: newHistory
                        },
                    }, 
                    upsert: true 
                }
            }
        ])

        return res.status(201).json({
            success:true,
            message: "transfer successful",
        })
    } catch (error) {
        return res.status(404).json({
            error,
            message: `Something's not right...`,
        })
    }
}


 /* barrelToNewBarrel = async (req, res) => {
    try {
        let start = await Tank.find({ _id: req.body.id });
        const newWineGal = start[0].wineGal - +req.body.wineGal;
        const newProofGal = start[0].proofGal - +req.body.proofGal;
        const newDaysInBarrel = (start[0].daysInBarrel || 0) + (new Date(req.body.fillDate) - new Date(start[0].fillDate)) * 1000 * 60 * 60 * 24;
        const newHistory = start[0].history.concat([`Transferred to ${req.body.tankType} ${req.body.tankNumber}`]);
        
        let end = req.body;
        delete end.id;
        if (start.tankType === 'barrel') {
            end.daysInBarrel = newDaysInBarrel;
        }
        end.history.push(newHistory);

        await Tank.bulkWrite([
            {
                insertOne: {
                    document: end
                }
            },
            { 
                updateOne: { 
                    filter: { _id: start[0]._id }, 
                    update: {
                        $set: {wineGal: newWineGal, 
                            proofGal: newProofGal, 
                            emptyDate: new Date(req.body.fillDate),
                            daysInBarrel: newDaysInBarrel,
                            history: newHistory
                        },
                    }, 
                    upsert: true 
                }
            }
        ])

        return res.status(201).json({
            success:true,
            message: "transfer successful",
        })
    } catch (error) {
        return res.status(404).json({
            error,
            message: `Something's not right...`,
        })
    }
} */

tankToNewBarrel = async (req, res) => {
    try {
        let start = await Tank.find({ _id: req.body.id });

        let end = req.body;
        delete end.id;
        end.history = start[0].history;
        end.history.push(`Transferred from ${start[0].tankType} ${start[0].tankNumber}`);

        const newWineGal = start[0].wineGal - +req.body.wineGal;
        const newProofGal = start[0].proofGal - +req.body.proofGal;
        if (newWineGal < 20) {
            const newHistory = [];
        }

        await Tank.bulkWrite([
            {
                insertOne: {
                    document: end
                }
            },
            { 
                updateOne: { 
                    filter: { _id: start._id }, 
                    update: {
                        $set: {wineGal: newWineGal},
                        $set: {proofGal: newProofGal},
                        $set: {history: newHistory},
                    }, 
                    upsert: true 
                }
            }
        ])

        return res.status(201).json({
            success:true,
            message: "transfer successful",
        })
    } catch (error) {
        return res.status(404).json({
            error,
            message: `Something's not right...`,
        })
    }
}

//fix this one.
tankToOldBarrel = async (req, res) => {
    try {
        const start = await Tank.find({ _id: req.body.idStart });
        const end = await Tank.find({ _id: req.body.idEnd });

        delete end.id;
        end.history = start[0].history;
        end.history.push(`Transferred from ${start[0].tankType} ${start[0].tankNumber}`);

        const newWineGal = start[0].wineGal - +req.body.wineGal;
        const newProofGal = start[0].proofGal - +req.body.proofGal;
        if (newWineGal < 20) {
            const newHistory = [];
        }

        await Tank.bulkWrite([
            {
                insertOne: {
                    document: end
                }
            },
            { 
                updateOne: { 
                    filter: { _id: start._id }, 
                    update: {
                        $set: {wineGal: newWineGal},
                        $set: {proofGal: newProofGal},
                        $set: {history: newHistory},
                    }, 
                    upsert: true 
                }
            }
        ])

        return res.status(201).json({
            success:true,
            message: "transfer successful",
        })
    } catch (error) {
        return res.status(404).json({
            error,
            message: `Something's not right...`,
        })
    }
}

getFullTanks = async (req, res) => {
    try{
        const tanks = await Tank.find({ wineGal: { $gte: 1 } }).sort({ tankNumber: 'desc' });
        res.status(200).json({ success: true, data: tanks });
    } catch (err) {
        console.error(err);
    }
}

getEmptyTanks = async (req, res) => {
    try{
        const tanks = await Tank.find({ wineGal: { $lte: 53 } }).sort({ tankNumber: 'desc' });
        res.status(200).json({ success: true, data: tanks });
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    createTank,
    barrelToNewBarrel,
    tankToNewBarrel,
    getFullTanks,
    getEmptyTanks,
}