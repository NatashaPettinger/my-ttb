import React from "react";
import { PostForm } from '../common'

{/* <Row>
                <p>If spirit is whiskey and it is being transferred to storage, choose the grain/whiskey type and tank type that it will be housed in this month:</p>
            </Row>
            <Row>
            <Col>
                <label htmlFor="tankType">Deposit tank type:</label>
            </Col>
            <Col>
                <select {...register("tankType")}>
                    <option value="newCoop" key="neutralRedistilled">Used to fill New Coop (this month)</option>
                    <option value="usedCoop" key="neutralLow">Used to fill Used Coop (this month)</option>
                    <option value="tank" key="other">Held in a tank until cooperage received</option>
                </select>
            </Col>
            </Row>
            <Row>
            <Col>
                <label htmlFor="grainType">Grain/whiskey type:</label>
            </Col>
            <Col>
                <select {...register("grainType")}>
                    <option value="wheat" key="wheat">Wheat</option>
                    <option value="rye" key="rye">Rye</option>
                    <option value="bourbon" key="bourbon">Bourbon</option>
                    <option value="corn" key="corn">Corn</option>
                    <option value="oat" key="oat">Oat</option>
                    <option value="american" key="american">American</option>
                    <option value="malt" key="malt">Malt</option>
                    <option value="barley" key="barley">Barley</option>
                </select>
            </Col>
            </Row> */}

const TransferFromProcessingForm = ({ reloadData }) => {

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
            {dbEntry:"brandyStrongGrapes",  label: "Grape brandy distilled to 170˚ and under"},
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
            {dbEntry: "productionToProcessing", label: "Entered in Processing Account"},
            {dbEntry: "productionForTIB", label: "Entered for Transfer in Bond"},
            {dbEntry: "productionToStorage", label: "Entered in Storage Account"},
            {dbEntry: "productionToResearch", label: "Withdrawn for Research, Development, or Testing"},
            {/* <option value="productionReceived" label: "Entered in Processing Account"}, */}]},
        {label: "Notes:", 
        dbKey: "notes", 
        type: "text",},
    ];
  return (
    <PostForm 
        reloadData={reloadData} 
        formAction="productionTransferLog" 
        buttonLabel="Transfer Spirit" 
        formEntries={formEntries} 
        instructions="Use this form for transfering spirit out of bond. For receiving distillate for redistillation, use that option in the Start New Ferment tab. For transferring spirit into the Storage or Processing accounts, see the respective forms on those pages."/>
  );
}

export default TransferFromProcessingForm