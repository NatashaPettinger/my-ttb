import React from "react";
import {PostForm} from '../common'


const TransferFromProductionForm = ({ data, reloadData }) => {

    const availableRuns = data.filter(ferment => ferment.distilled && !ferment.transferred);
    
    const formEntries = [
        {label: "Transfer Date:", 
        dbKey: "transferDate", 
        type: "date",},
        {label: "Spirit Type:", 
        dbKey: "spiritType", 
        type: "select", 
        select: [
            {dbEntry:"whiskeyWeak", label: " Whiskey distilled to 160˚ and under"},
            {dbEntry:"whiskeyStrong",  label: "Whiskey distilled to over 160˚"},
            {dbEntry:"brandyWeakGrapes",  label: "Grape brandy distilled to 170˚ and under"},
            {dbEntry:"brandyWeakNoGrapes",  label: "Grape free brandy distilled to 170˚ and under"},
            {dbEntry:"brandyStrongGrapes",  label: "Grape brandy distilled to over 170˚"},
            {dbEntry:"brandyStrongNoGrapes",  label: "Grape free brandy distilled to over 170˚"},
            {dbEntry:"rum",  label: "Rum"},
            {dbEntry:"gin",  label: "Gin"},
            {dbEntry:"vodka",  label: "Vodka"},
            {dbEntry:"neutralGrain",  label: "Neutral Grain Spirits"},
            {dbEntry:"neutralFruit",  label: "Neutral Fruit Spirits"},
            {dbEntry:"neutralMolasses", label: "Neutral Cane Spirits"},
            {dbEntry:"neutralRedistilled", label: "Neutral spirits made from redistilled spirits"},
            {dbEntry:"neutralLow", label: "Spirits distilled to under 190˚"},
            {dbEntry:"other", label: "Other"},]},
        {label: "Available to Transfer:", 
        dbKey: "availableRuns", 
        type: "select multiple", 
        select: availableRuns.map(x => {
            return {dbEntry: x._id, label: `Spirit distilled on ${new Date(x.distillData.distillDate).toDateString()}`}
        })
        },
        {label: "Tank Type:", 
        dbKey: "tankType", 
        type: "select", 
        select: [
            {dbEntry:"na", label: "If whiskey, report cooperage for whiskey type"},
            {dbEntry:"newCoop", label: "Used to fill New Coop (this month)"},
            {dbEntry:"usedCoop",  label: "Used to fill Used Coop (this month)"},
            {dbEntry:"tank",  label: "Held in a tank until cooperage received"},]},
        {label: "Grain/whiskey type:", 
        dbKey: "grainType", 
        type: "select", 
        select: [
            {dbEntry:"wheat", label:"Wheat"},
            {dbEntry:"rye", label:"Rye"},
            {dbEntry:"bourbon", label:"Bourbon"},
            {dbEntry:"corn", label:"Corn"},
            {dbEntry:"oat", label:"Oat"},
            {dbEntry:"american", label:"American"},
            {dbEntry:"malt", label:"Malt"},
            {dbEntry:"barley", label:"Barley"},
        ]},
        {label: "Volume (proof gallons):", 
        dbKey: "quantity", 
        type: "number", 
        step: ".1", 
        min: "0"},
        {label: "Proof:", 
        dbKey: "proof", 
        type: "number", 
        step: "0.1", 
        min: "0"},
        {label: "Transaction", 
        dbKey: "description", 
        type: "select", 
        select: [
            {dbEntry: "productionTaxPayment", label: "Withdrawn for Tax Payment"},
            {dbEntry: "productionUseOfUS", label: "Withdrawn for Use of U.S."},
            {dbEntry: "productionHospSciEdu", label: "Withdrawn for Hospital, Education, or Scientific Use"},
            {dbEntry: "productionExport", label: "Withdrawn for Export"},
            {dbEntry: "productionTransferToFTZ", label: "Withdrawn for Transfer to Foreign Trade Zone"},
            {dbEntry: "productionTransferToCMBW", label: "Withdrawn for Transfer to CMBW"},
            {dbEntry: "productionUseOnVessels", label: "Withdrawn for Use as Supplies on Vessels or Aircraft"},
            {dbEntry: "productionUseInWineProduction", label: "Withdrawn for Use in Wine Production"},
            /* {dbEntry: "productionToProcessing", label: "Entered in Processing Account"}, */
            {dbEntry: "productionForTIB", label: "Entered for Transfer in Bond"},
            /* {dbEntry: "productionToStorage", label: "Entered in Storage Account"}, */
            /* <option value="productionReceived" label: "Entered in Processing Account"}, */
            {dbEntry: "productionToResearch", label: "Withdrawn for Research, Development, or Testing"},]},
            
        {label: "Notes:", 
        dbKey: "notes", 
        type: "text",},
    ];




  return (
    <>
        {availableRuns.length === 0? 
        <div className="p-5">
            <p>All still runs have been transferred out of the production account. No distillate is available for transfer.</p>
        </div>
         :
        <PostForm 
            reloadData={reloadData} 
            formAction="productionTransferLog" 
            buttonLabel="Transfer Spirit" 
            formEntries={formEntries} 
            instructions="Use this form for transfering spirit out of the distillery (out of bond, TIBs, etc.). For receiving distillate for redistillation, use that option in the Start New Ferment tab. For transferring spirit into the Storage or Processing accounts, see the respective forms on those pages."
            checklist={availableRuns}/>}
    </>
    
  );
}

function DataLoading({ data, loading, reloadData }) {
    if (loading) {
        return (
            <p>Loading...</p>
        );
    }

    return (
    <>
        <TransferFromProductionForm
            data={data}
            reloadData={reloadData}/>
    </>
    );
}


export default DataLoading