import React from "react";
import { ModalFormFieldEdit } from "../common";


const UpdateTank = ({ row, reloadData, showModal, modalId }) => {

  const formInputs = [
    {entryKey: "tankType",
    label: "Tank Type",
    type: "select",
    currentValue: row.tankInfo.tankType,
    select: [
      {dbEntry: "barrel", label: "Barrel"},
      {dbEntry: "ibc tote", label: "Tote"},
      {dbEntry: "stainless tank", label: "Stainless Tank"},],
    buttonLabel: "Update Tank Type"
    },{
      entryKey: "tankNumber",
      label: "Tank Number",
      type: "number",
      currentValue: row.tankInfo.tankNumber,
      step: "1",
      min: "1",
      buttonLabel: "Update Tank Number"
    },{
      entryKey: "capacity",
      label: "Capacity (gal)",
      type: "number",
      currentValue: row.tankInfo.capacity,
      step: "0.1",
      min: "1",
      buttonLabel: "Update Tank Capacity"
    },{
      entryKey: "char",
      label: "Barrel Char",
      type: "number",
      currentValue: row.tankInfo.char,
      step: "1",
      min: "0",
      buttonLabel: "Update Barrel Char"
    },{
      entryKey: "manufacturer",
      label: "Manufacturer",
      type: "text",
      currentValue: row.tankInfo.manufacturer,
      buttonLabel: "Update Barrel Manufacturer"
    },{
      entryKey: "status.saleDate",
      label: "Sold?",
      type: "date",
      currentValue: row.tankInfo.status.saleDate,
      buttonLabel: "Enter Sale Date"
    },{
      entryKey: "status.brokenDate",
      label: "Broken?",
      type: "date",
      currentValue: row.tankInfo.status.brokenDate,
      buttonLabel: "Enter Out-Of-Commission Date"
    },{
      entryKey: "notes",
      label: "Notes",
      type: "text",
      currentValue: row.tankInfo.notes,
      buttonLabel: "Save Notes"
    }
  ]

  const instructions = `Update tank info for ${row.tankInfo.tankType[0].toUpperCase()}${row.tankInfo.tankType.slice(1)} ${row.tankInfo.tankNumber}`

  return (
    <>
      <ModalFormFieldEdit
        formAction="updateTank"
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