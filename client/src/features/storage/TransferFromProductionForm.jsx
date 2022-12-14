import React, { useEffect } from 'react'
import api from '../api';
import { PostForm } from '../common';
import useAuth from '../api/useAuth';
import { SetProductionTankForm } from '.';


const TransferFromProductionForm = ({ prodData, tanks, reloadData }) => {

    const formEntries = [
        {
            label: "Transfer Date:", 
            dbKey: "currentFill.fillDate", 
            type: "date",
        },
        {label: "Available to Transfer:", 
        dbKey: "availableRuns", 
        type: "select multiple", 
        select: prodData.map(x => {
            return {dbEntry: x._id, label: `Spirit distilled on ${new Date(x.distillData.distillDate).toDateString()}`}
        })
        },
        {
            label: "Spirit Type:", 
            dbKey: "productionLog.spiritType", 
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
                {dbEntry:"other", label: "Other"},]
        },{
            label: "Whiskey Type (if applicable):", 
            dbKey: "productionLog.grainType", 
            type: "select", 
            select: [
                {dbEntry:"wheat", label: "Wheat"},
                {dbEntry:"rye", label: "Rye"},
                {dbEntry:"bourbon", label: "Bourbon"},
                {dbEntry:"corn", label: "Corn"},
                {dbEntry:"oat", label: "Oat"},
                {dbEntry:"american", label: "American"},
                {dbEntry:"malt", label: "Malt"},
                {dbEntry:"barley", label: "Barley"},]
        },{
            label: "Next Tank Type (if whiskey):", 
            dbKey: "productionLog.tankType", 
            type: "select", 
            select: [
                {dbEntry:"tank", label: "Tank"},
                {dbEntry:"newCoop", label: "New Cooperage"},
                {dbEntry:"usedCoop", label: "Used Cooperage"}]
        },{
            label: "Transaction", 
            dbKey: "description", 
            type: "select",
            select: [
                //{dbEntry: "processingToStorage", label: "Received from Processing Account"},
                {dbEntry: "productionToStorage", label: "Received from Production Account"},
            ]
        },{
            label: "Contents:", 
            dbKey: "currentFill.contents", 
            type: "text"
        },{
            label: "Volume (wine gallons):", 
            dbKey: "currentFill.wineGal", 
            type: "number",
            step: "0.1",
            min: "0"
        },{
            label: "Proof:", 
            dbKey: "currentFill.fillProof", 
            type: "number",
            step: "0.1",
            min: "0"
        },{
            label: "Notes:", 
            dbKey: "currentFill.notes", 
            type: "text"
        },
    ]


    const productionTank = (tanks.find(x => x.productionTank === true)? null: 'No production tank has been defined. Please use form to create production tank prior to transferring spirit from production.')
    
    return (
        <>
            {productionTank? 
            <>
                <div className="bg-base-100 p-5">
                    <label htmlFor="setProductionTankModal" className="btn modal-button mr-3">Set Production Tank</label>
                </div>
                <SetProductionTankForm reloadData={reloadData} modalId="setProductionTankModal" />
            </>:null}

            {prodData.length === 0? 
                <div className="p-5">
                    <p>All still runs have been transferred out of the production account. No distillate is available for transfer.</p>
                </div>
                : 
                <PostForm 
                reloadData={reloadData} 
                formAction="transferFromProduction" 
                buttonLabel="Transfer Spirit" 
                formEntries={formEntries} 
                instructions='To transfer distillate from production or processing, use this form. If the "Set Production Tank" button is visible, a production tank must be set prior to transfering spirits.'/>}
        </>
      );

  
}

function DataLoading({ data, loading, reloadData, prodLoading, prodData }) {
    if (loading || prodLoading) {
        return (
            <p>Loading...</p>
        );
    }

    return (
    <>
        <TransferFromProductionForm
            tanks={data}
            prodData={prodData}
            reloadData={reloadData}/>
    </>
    );
}



function TransferForm({ reloadData, data, loading }){
    const [prodLoading, setProdLoading] = React.useState(true);
    const [prodData, setProdData] = React.useState([]);
    const { token } = useAuth();
  
    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      try {
        const res = await api.getFerments(token)
        setProdData(res.data.data.filter(ferment => ferment.distilled && !ferment.transferred));
        setProdLoading(false);
      } catch (e) {
        console.error(new Error(`seems your fetch didn't work`))
      }
    };
  
    return (
      <DataLoading
        data={data}
        loading={loading}
        reloadData={reloadData}
        prodLoading={prodLoading}
        prodData={prodData}
      />
    );
}

export default TransferForm