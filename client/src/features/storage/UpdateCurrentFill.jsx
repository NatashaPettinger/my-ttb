import React from "react";
import { ModalFormFieldEdit } from "../common";


const UpdateTank = ({ row, reloadData, showModal, modalId }) => {

  const formInputs = [
    {entryKey: "contents",
    label: "Contents",
    type: "text",
    currentValue: row.currentFill.contents,
    buttonLabel: "Update Current Fill Contents"
    },{
      entryKey: "fillDate",
      label: "Fill Date",
      type: "date",
      currentValue: row.currentFill.fillDate,
      buttonLabel: "Update Fill Date"
    },{
      entryKey: "fillProof",
      label: "Fill Proof",
      type: "number",
      currentValue: row.currentFill.fillProof,
      step: "0.1",
      min: "1",
      buttonLabel: "Update Proof"
    },{
      entryKey: "wineGal",
      label: "Wine Gallons",
      type: "number",
      currentValue: row.currentFill.wineGal,
      step: "0.1",
      min: "0",
      buttonLabel: "Update Wine Gallons"
    },{
      entryKey: "notes",
      label: "Notes",
      type: "text",
      currentValue: row.currentFill.notes,
      buttonLabel: "Save Notes"
    }
  ]

  const instructions = `Update current fill info for ${row.tankInfo.tankType[0].toUpperCase()}${row.tankInfo.tankType.slice(1)} ${row.tankInfo.tankNumber}. If this distillate has previously been reported on storage reports, use the "Transfer Out of Storage" Form in the "Transfer Contents" Tab to report a loss. Otherwise, use this form to correct an error that occured during spirit transfer within the storage operations account.`;

  return (
    <>
      <ModalFormFieldEdit
        formAction="updateFill"
        parentId={row._id}
        reloadData={reloadData}
        instructions={instructions}
        formInputs={formInputs}
        showModal={showModal}
        modalId={modalId}/>
    </>
  );
}

export default UpdateTank