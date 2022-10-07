import React from 'react'
import { PostForm } from '../common'


const AddMaterialForm = ({ reloadData, token }) => {

    const formEntries = [
      {label: "Purchase Date:", 
      dbKey: "purchaseDate", 
      type: "date",},
      {label: "Material Type:", 
      dbKey: "materialType", 
      type: "select", 
      select: [
        {dbEntry: "yeast", label: "Yeast"},
        {dbEntry: "grain", label: "Grain"},
        {dbEntry: "fruit", label: "Fruit"},
        {dbEntry: "cane product", label: "Cane Product"},
        {dbEntry: "nutrient", label: "Nutrient"},
        {dbEntry: "enzyme", label: "Enzyme"},
        {dbEntry: "cleaning product", label: "Cleaning Product"},
        {dbEntry: "pH adjustment", label: "pH Correction"},
        {dbEntry: "packaging", label: "Packaging Supply"},
        {dbEntry: "misc", label: "Misc."},]},
      {label: "Material Name:", 
      dbKey: "name", 
      type: "text", },
      {label: "Reorder Quantity (UOM):", 
      dbKey: "reorderQuantity", 
      type: "number", 
      step: ".1", 
      min: "0"},{label: "Unit of Measure:", 
      dbKey: "uom", 
      type: "select", 
      select: [
        {dbEntry: "mg", label: "mg"},
        {dbEntry: "g", label: "g"},
        {dbEntry: "kg", label: "kg"},
        {dbEntry: "mL", label: "mL"},
        {dbEntry: "L", label: "L"},
        {dbEntry: "oz", label: "oz"},
        {dbEntry: "lb", label: "lb"},
        {dbEntry: "qt", label: "qt"},
        {dbEntry: "gal", label: "gal"},
        {dbEntry: "tons", label: "tons"},
        {dbEntry: "ea", label: "ea"},]},
      {label: "Number of Packages:", 
      dbKey: "quantity", 
      type: "number", 
      step: "1", 
      min: "0"},
      {label: "Package Size:", 
      dbKey: "packageSize", 
      type: "number", 
      step: "0.1", 
      min: "0"},
      {label: "Cost per Package (USD): ", 
      dbKey: "costPerPackage", 
      type: "number", 
      step: "0.01", 
      min: "0"},
      {label: "Other Charges (USD): Freight, delivery, tax, etc. ", 
      dbKey: "extraCharges", 
      type: "number", 
      step: "0.01", 
      min: "0"},
      {label: "Lot #: ", 
      dbKey: "lotNo", 
      type: "text"},
      {label: "Date Received:", 
      dbKey: "dateReceived", 
      type: "date",},
      {label: "Vendor:", 
      dbKey: "vendor", 
      type: "text",},
  ];
  return (
    <PostForm 
        reloadData={reloadData} 
        formAction="receiveRawMaterials" 
        buttonLabel="Add Material" 
        formEntries={formEntries} 
        instructions='Do not use this form for materials already in database. To report a restock, expand the material div and fill in the "Record New Purchase" form in the "Purchase Log" tab.'/>
  );

}
    
export default AddMaterialForm

