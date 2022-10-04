import React from "react";
import { PostForm } from "../common";


//Add items for WAREHOUSING LOG

const TIBForm = ({ reloadData }) => {
  const formEntries = [{
    label: "Receiving Date:", 
    dbKey: "currentFill.fillDate", 
    type: "date",
  },{
    label: "Spirit Type:", 
    dbKey: "spiritType", 
    type: "select", 
    select: [
        {dbEntry:"whiskeyWeak", label: " Whiskey distilled to 160˚ and under"},
        {dbEntry:"whiskeyStrong",  label: "Whiskey distilled to over 160˚"},
        {dbEntry:"brandyWeak",  label: "Brandy distilled to 170˚ and under"},
        {dbEntry:"brandyStrong",  label: "Brandy distilled to over 170˚"},
        {dbEntry:"rum",  label: "Rum"},
        {dbEntry:"gin",  label: "Gin"},
        {dbEntry:"vodka",  label: "Vodka"},
        {dbEntry:"neutral",  label: "Neutral Spirits"},
        {dbEntry:"neutralLow", label: "Spirits distilled to under 190˚"},
        {dbEntry:"other", label: "Other"},]
  },{
    label: "Tank Type:", 
    dbKey: "tankInfo.tankType", 
    type: "select",
    select: [
      {dbEntry:"ibc tote", label: "Tote"},
      {dbEntry:"barrel", label: "Barrel"}]
  },{
    label: "Tank Number:", 
    dbKey: "tankInfo.tankNumber", 
    type: "number",
    step: "1",
    min: "1"
  },{
    label: "Capacity (gallons):", 
    dbKey: "tankInfo.capacity", 
    type: "number",
    step: "0.1",
    min: "0"
  },{
    label: "Barrel Char:", 
    dbKey: "tankInfo.char", 
    type: "number",
    step: "1",
    min: "0"
  },{
    label: "Manufacturer:", 
    dbKey: "tankInfo.manufacturer", 
    type: "text"
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
return (
    <PostForm 
    reloadData={reloadData} 
    formAction="createTank" 
    buttonLabel="Transfer Spirit" 
    formEntries={formEntries} 
    instructions='Do not use this form for distillate that is already in the system. To transfer distillate to a new tank, use the "Transfer to New Tank" tab of the tank you want to transfer from. To transfer distillate from production or processing, use the form above.'/>
    
  );
}

export default TIBForm