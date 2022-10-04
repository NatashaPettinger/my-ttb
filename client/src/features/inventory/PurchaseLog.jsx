import React, { useState } from 'react';
import { ModalFormLogEdit, Table } from '../common';

const PurchaseLog = ({ row, reloadData, modal, handleShow }) => {
  
  const data = row.purchaseLog;
  const uom = row.uom
  const [entries, setEntries] = useState(data[0]);
  const [showModal, setShowModal] = useState(false);
  const formInputs = [
    {
      entryKey:"purchaseDate",
      label:"Purchase Date:",
      type:"date",
    },
    {
      entryKey:"dateReceived",
      label:"Date Received:",
      type:"date",
    },
    {
      entryKey:"quantity",
      label:"Number of Packages:",
      type:"number",
      step:"1",
    },
    {
      entryKey:"packageSize",
      label:`Package Size (${uom}):`,
      type:"number",
      step:"0.01",
    },
    {
      entryKey:"costPerPackage",
      label:"Cost per Package (USD):",
      type:"number",
      step:"0.01",
    },
    {
      entryKey:"extraCharges",
      label:"Other Charges (USD):",
      type:"number",
      step:"0.01",
    },
    {
      entryKey:"vendor",
      label:"Vendor:",
      type:"text",
    },
    {
      entryKey:"lotNo",
      label:"Lot #:",
      type:"text",
    },
    ]

    const columns = React.useMemo(
      () => [{
              Header: '✐',
              id: 'expander',
              Cell: ({ row }) => (
                <label 
                  htmlFor="editPurchaseLogEntry" 
                  className="modal-button mr-3 btn btn-xs" 
                  onClick={() => {
                    setEntries(row);
                    setShowModal(true);
                  }}>✐</label>
              ),
            },
            {
              Header: 'Purchase Date',
              accessor: row => (new Date(row.purchaseDate)).toDateString()
            },
            {
              Header: 'Received',
              accessor: row => row.dateReceived? (new Date(row.dateReceived)).toDateString() : 'Not Received',
            },
            {
              Header: `Package Size (${uom})`,
              accessor: 'packageSize'
            },
            {
              Header: 'Quantity (ea)',
              accessor: 'quantity'
            },
            {
              Header: 'Cost per Package',
              accessor: row => '$' + row.costPerPackage.toFixed(2)
            },
            {
              Header: `Quantity (${uom})`,
              accessor: 'quantityUom'
            },
            {
              Header: `Cost per ${uom}`,
              accessor: row => '$' + row.costPerUom.toFixed(2)
            },
            {
              Header: `Total Cost`,
              accessor: row => '$' + row.totalCost.toFixed(2)
            },
            {
              Header: `Vendor`,
              accessor: 'vendor'
            },
            {
              Header: `Lot #`,
              accessor: 'lotNo'
            },
          ],
      [uom]
    )
    const description = `Edit purchase log entry for ${row.name}`

    const renderRowSubComponent = React.useCallback(
      ({ row }) => (
          {/* <div className="h-40 overflow-y-scroll">
            <LogFormElement purchaseEntry={row.original} reloadData={reloadData} id={id} 
            entryKey={'purchaseDate'} label={'Purchase Date: '} type={'date'} log={'purchaseLog'} />
            <LogFormElement purchaseEntry={row.original} reloadData={reloadData} id={id} 
            entryKey={'dateReceived'} label={'Date Received: '} type={'date'} log={'purchaseLog'} />
            <LogFormElement purchaseEntry={row.original} reloadData={reloadData} id={id} 
            entryKey={'quantity'} label={'Number of Packages:'} type={'number'} step={'1'} log={'purchaseLog'} />
            <LogFormElement purchaseEntry={row.original} reloadData={reloadData} id={id} 
            entryKey={'packageSize'} label={`Package Size (${uom}):`} type={'number'} step={'.01'} log={'purchaseLog'} />
            <LogFormElement purchaseEntry={row.original} reloadData={reloadData} id={id} 
            entryKey={'costPerPackage'} label={'Cost per Package (USD):'} type={'number'} step={'.01'} log={'purchaseLog'} />
            <LogFormElement purchaseEntry={row.original} reloadData={reloadData} id={id} 
            entryKey={'extraCharges'} label={'Other Charges (USD):'} type={'number'} step={'.01'} log={'purchaseLog'} />
            <LogFormElement purchaseEntry={row.original} reloadData={reloadData} id={id} 
            entryKey={'vendor'} label={'Vendor:'} type={'text'} log={'purchaseLog'} />
            <LogFormElement purchaseEntry={row.original} reloadData={reloadData} id={id} 
            entryKey={'lotNo'} label={'Lot #:'} type={'text'} log={'purchaseLog'} />
          </div> */}
      ),
      []
    )

    return (
      <div>
        <Table columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} modal={modal} handleShow={handleShow}/>
        <ModalFormLogEdit
          formAction="editMaterialsLog" 
          parentId={row._id}
          logId="purchaseLog"
          logEntry={entries.original}
          reloadData={reloadData}
          formInputs={formInputs}
          showModal={showModal}
          modalId="editPurchaseLogEntry"
          description={description}/>
      </div>
  )
  
}



export default PurchaseLog


//return <Update onClick={this.viewDetails}>View Detailed History</Update>

//form for each addition: drop down of all materials (& actions, steam on, steam off, pump on, pump off, mill grain), uom, text input w/ suggested quantity, temperature of mash, & time
