import React from 'react';
import {PostForm} from '../common';


const CreateMash = ({ reloadData }) => {
    
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
        {label: "Volume (proof gallons):", 
        dbKey: "quantity", 
        type: "number", 
        step: ".1", 
        min: "0"},
        {label: "Transaction", 
        dbKey: "description", 
        type: "select", 
        select: [
            {dbEntry: "storageToProduction", label: "Transferred from Storage for Redistillation"},
            {dbEntry: "processingTransferToProduction", label: "Transferred from Processing for Redistillation"}]},
            
        {label: "Notes:", 
        dbKey: "notes", 
        type: "text",},
    ]
    
    return (
        <PostForm 
        reloadData={reloadData} 
        formAction="createMash" 
        buttonLabel="Start New Distillation" 
        formEntries={formEntries} 
        instructions="Use this form to redistill spirit from spirit in the Storage or Processing accounts. ADD: checklist with specific barrels to transfer over."/>
    )
}

    
export default CreateMash




