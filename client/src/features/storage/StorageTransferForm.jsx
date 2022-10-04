import React from "react";
import { ModalForm } from "../common";

const TransferFromStorage = ({ row, reloadData, modalId }) => {

  console.log(row)
  const formEntries = [
    {
      dbKey: "log.transferDate",
      label: "Transfer Date: ",
      type: 'date',
    },{
      label: "Spirit Type:", 
      dbKey: "log.spiritType", 
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
      label: "Transaction:", 
      dbKey: "log.description", 
      type: "select",
      select: [
        {dbEntry: "storageTaxpaid", label: "Withdrawn for Tax Payment"},
        {dbEntry: "storageToUseOfUS", label: "Withdrawn for Use of U.S."},
        {dbEntry: "storageToHospSciEdu", label: "Withdrawn for Hospital, Education, or Scientific Use"},
        {dbEntry: "storageToExport", label: "Withdrawn for Export"},
        {dbEntry: "storageTransferToFTZ", label: "Withdrawn for Transfer to Foreign Trade Zone"},
        {dbEntry: "storageTransferToCMBW", label: "Withdrawn for Transfer to CMBW"},
        {dbEntry: "storageUseOnVessels", label: "Withdrawn for Use as Supplies on Vessels or Aircraft"},
        {dbEntry: "storageTransferToBondedWinery", label: "Transferred to Bonded Windery"},
        {dbEntry: "storageTransferToCBW", label: "Withdrawn for Transfer to CBW"},
        {dbEntry: "storageToResearch", label: "Withdrawn for Research, Development, or Testing"},
        {dbEntry: "storageToTIB", label: "Entered for Transfer in Bond"},
        {dbEntry: "storageDestroyed", label: "Destroyed"},
        {dbEntry: "storageLosses", label: "Losses"},]
    },{
        dbKey: "wineGal",
        label: "Volume Transferred (wine gal) ",
        type: 'number',
        step: '0.1',
        min: '0',
        max: row.currentFill.wineGal
    },{
        dbKey: "log.proof",
        label: "Fill Proof: ",
        default: row.currentFill.fillProof,
        type: 'number',
        step: '0.1',
        min: '0',
        max: '195',
    },{
        dbKey: "log.notes",
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
            <div className="width-fit whitespace-normal">
            <h3 className="font-bold text-lg mb-2">Transfer <em>Out of Storage</em> from: <em>{row.tankInfo.tankType[0].toUpperCase() + row.tankInfo.tankType.slice(1)} {row.tankInfo.tankNumber}</em></h3>
            <p>For transferring to Production or Processing Accounts, use the forms on the respective pages.</p>
            </div>
            <ModalForm
              id={row._id}
              log="storageLog"
              reloadData={reloadData}
              formAction="transferOutOfStorage"
              buttonLabel="Transfer"
              formEntries={formEntries}
              closeModal={closeModal}
            />
          </div>
      </div>
    </>
  );
}

export default TransferFromStorage