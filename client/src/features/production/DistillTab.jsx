import React from 'react'
import { StillCutsForm, StillFormElement, StillFermentDataForm } from '.';
//import StillCutsForm from './StillCutsForm';


const DistillTab = ({ row, reloadData }) => {
  
  const setupEntries = [
    {
      stillKey: "boilerOn",
      key: "boilerOn",
      label: "Boiler On",
      type: "time",
    },{
      stillKey: "pumpStart",
      key: "pumpStart",
      label: "Pump Start",
      type: "time",
    },{
      stillKey: "pumpEnd",
      key: "pumpEnd",
      label: "Pump End",
      type: "time",
    },{
      stillKey: "pumpDuration",
      key: "pumpDuration",
      label: "Pump Duration",
      type: "number",
    },{
      stillKey: "cipColumnTime",
      key: "cipColumnTime",
      label: "CIP Column",
      type: "time",
    },{
      stillKey: "tailsTime",
      key: "tailsTime",
      label: "Tails Pump Start",
      type: "time",
    },{
      stillKey: "tailsQuantityPumped",
      key: "tailsQuantityPumped",
      label: "Tails Volume for Redistill (gal)",
      type: "number",
    },
  ]
  const startEntries = [
    {
      stillKey: "steamOn",
      key: "steamOn",
      label: "Steam On",
      type: "time",
    },
    {
      stillKey: "dephlegOnTime",
      key: "dephlegOnTime",
      label: "Dephleg Start Time",
      type: "time",
    },
    {
      stillKey: "dephlegOnPotTemp",
      key: "dephlegOnPotTemp",
      label: "Pot Temp at Dephleg Start (˚F)",
      type: "number",
      step: "0.1"
    },
    {
      stillKey: "dephlegOnSetting",
      key: "dephlegOnSetting",
      label: "Setting at Dephleg Start",
      type: "number",
    },
  ]
  const endEntries = [
    {
      stillKey: "tailsGallons",
      key: "tailsGallons",
      label: "Tails Gallons",
      type: "number",
    },
    {
      stillKey: "tailsEndProof",
      key: "tailsEndProof",
      label: "Tails End Proof",
      type: "number",
    },
    {
      stillKey: "steamOff",
      key: "steamOff",
      label: "Steam Off",
      type: "time",
    },
    {
      stillKey: "heartsProof",
      key: "heartsProof",
      label: "Hearts Average Proof",
      type: "number",
    },
    {
      stillKey: "totalTimeHours",
      key: "totalTimeHours",
      label: "Run Time (hr)",
      type: "number",
    },
    {
      stillKey: "headsUse",
      key: "headsUse",
      label: "Heads Use",
      type: "text",
    },
    {
      stillKey: "tailsUse",
      key: "tailsUse",
      label: "Tails Use",
      type: "text",
    },
    {
      stillKey: "notes",
      key: "notes",
      label: "Notes",
      type: "text",
    },
    {
      stillKey: "distilled",
      key: "distilled",
      label: "Distillation Complete",
      type: "checkbox",
    },
    {
      stillKey: "transferred",
      key: "transferred",
      label: "Transferred out of Production Account",
      type: "checkbox",
    },
  ]

  return (
    <>
    <div className="mt-10 sm:mt-0 w-1/2">
            {row.distillData.distillDate? 
              <div className="px-4 py-5">
                {setupEntries.map(entry => (
                  <StillFormElement 
                    row={row} 
                    reloadData={reloadData} 
                    stillKey={entry.stillKey} 
                    label={entry.label}
                    type={entry.type}
                    key={entry.stillKey}/>
                ))}
                <StillFermentDataForm row={row} reloadData={reloadData}/>
                {startEntries.map(entry => (
                  <StillFormElement 
                    row={row} 
                    reloadData={reloadData} 
                    stillKey={entry.stillKey} 
                    label={entry.label}
                    type={entry.type}
                    key={entry.stillKey}/>
                ))}
                <StillCutsForm row={row} reloadData={reloadData} stillKey="foreshotsData" label="Foreshots"/>
                <StillFormElement 
                  row={row} 
                  reloadData={reloadData} 
                  stillKey="foreshotsGallons" 
                  label="Foreshots Gallons" 
                  type="number"/>
                <StillCutsForm row={row} reloadData={reloadData} stillKey="headsData" label="Heads"/>
                <StillFormElement row={row} reloadData={reloadData} stillKey="headsGallons" label="Heads Gallons" type="number"/>
                <StillCutsForm row={row} reloadData={reloadData} stillKey="heartsData" label="Hearts"/>
                <StillFormElement row={row} reloadData={reloadData} stillKey="heartsGallons" label="Hearts Gallons" type="number"/>
                {endEntries.map(entry => (
                  <StillFormElement 
                    row={row} 
                    reloadData={reloadData} 
                    stillKey={entry.stillKey} 
                    label={entry.label}
                    type={entry.type}
                    key={entry.stillKey}/>
                ))}
              </div>:
              <div className="px-4 py-5">
                <StillFormElement row={row} reloadData={reloadData} stillKey="distillDate" label="Distillation Date" type="date"/>
              </div>}
        </div>
    </>
  )
  
}

export default DistillTab
