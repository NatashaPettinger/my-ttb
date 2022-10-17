import React from 'react';
import {PostForm} from '../common';


const CreateMash = ({ reloadData, data }) => {
    
    const availableRuns = data.filter(ferment => ferment.distilled && !ferment.transferred);

    const formEntries = [
        {label: "Date:", 
        dbKey: "transferDate", 
        type: "date",},
        {label: "Available to Redistill:", 
        dbKey: "availableRuns", 
        type: "select multiple", 
        select: availableRuns.map(x => {
            return {dbEntry: x._id, label: `Spirit distilled on ${new Date(x.distillData.distillDate).toDateString()}`}
        })
        },
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
        {label: "Notes:", 
        dbKey: "notes", 
        type: "text",},
    ]
    
    return (
        <>
        {availableRuns.length === 0? 
        <div className="p-5">
            <p>All still runs have been transferred out of the production account. No distillate is available for transfer.</p>
        </div>
        : 
        <PostForm 
            reloadData={reloadData} 
            formAction="redistillFromProduction" 
            buttonLabel="Start New Distillation" 
            formEntries={formEntries} 
            instructions="Use this form to redistill spirit from spirit that is still in the production account. ADD: checklist of available distillation runs to redistill."/>}
        </>
    )
}

function DataLoading({ data, loading, reloadData }) {
    if (loading) {
        return (
            <p>Loading...</p>
        );
    }

    return (
    <>
        <CreateMash
            data={data}
            reloadData={reloadData}/>
    </>
    );
}


export default DataLoading



