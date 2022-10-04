import React from "react";
import { ModalForm } from "../common";

const TransferToNewTank = ({ row, reloadData, modalId }) => {

  const formEntries = [
    {
      dbKey: "emptyDate",
      label: "Transfer Date: ",
      type: 'date',
    },{
      label: "Tank Type:", 
      dbKey: "tankInfo.tankType", 
      type: "select",
      select: [
        {dbEntry:"ibc tote", label: "Tote"},
        {dbEntry:"barrel", label: "Barrel"},
        {dbEntry:"stainless tank", label: "Stainless Tank"}]
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
        dbKey: "currentFill.wineGal",
        label: "Volume Transferred (wine gal) ",
        type: 'number',
        step: '0.1',
        min: '0',
        max: row.currentFill.wineGal
    },{
        dbKey: "currentFill.waterAdded",
        label: "Water Added (gal): ",
        type: 'number',
        step: '0.1',
        min: '0',
    },{
        dbKey: "currentFill.fillProof",
        label: "Fill Proof: ",
        default: row.currentFill.fillProof,
        type: 'number',
        step: '0.1',
        min: '0',
        max: '195',
    },{
        dbKey: "notes",
        label: "Notes: ",
        default: row.notes,
        type: 'text',
    },{
        dbKey: "empty",
        label: "Check Box if Starting Tank is Empty: ",
        type: 'checkbox',
    },
]

  const closeModal = () => document.getElementById(modalId).checked = false;

  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
          <div className="modal-box relative">
            <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 className="font-bold text-lg mb-2">Transfer to <em>New Tank</em> from: {row.tankInfo.tankType[0].toUpperCase() + row.tankInfo.tankType.slice(1)} {row.tankInfo.tankNumber}</h3>
            <ModalForm
              id={row._id}
              log="storageLog"
              reloadData={reloadData}
              formAction="transferToNewTank"
              buttonLabel="Transfer"
              formEntries={formEntries}
              closeModal={closeModal}
            />
          </div>
      </div>
    </>
  );
}

export default TransferToNewTank