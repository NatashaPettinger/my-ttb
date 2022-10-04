import React, { useState } from 'react';
import { Table, ModalFormLogEdit } from '../common';


//tankHistory: [distillate type, storage duration, distill dates & ids]

//distillateWarehouseHistory: [startTank[0].tankType, startTank[0].tankNumber, startTank[0]._id, newDaysInBarrel]
// distillateProductionHistory: [ferment ID, distillation date, proof gallons]
// [previous tank type, previous tank number, previous tank ID, previous tank storage duration (days)]


const FermentData = ({ row, modal, reloadData }) => {

    const data = row.fermentData
    const [entries, setEntries] = useState({});
    const [showModal, setShowModal] = useState(false);
    const formInputs = [
      {
        entryKey:"dateTime",
        label:"Date:",
        type:"date",
      },
      {
        entryKey:"temp",
        label:"Temperature:",
        type:"number",
        step:"0.1",
        min:"33"
      },
      {
        entryKey:"gravity",
        label:"Gravity:",
        type:"number",
        step:"0.001",
        min:"0.9"
      },
      {
        entryKey:"pH",
        label:"pH:",
        type:"number",
        step:"1",
      },
      {
        entryKey:"notes",
        label:"Notes:",
        type:"text",
      },
      ]
  
    const columns = React.useMemo(
      () => [{
        Header: 'Edit',
        id: 'expander',
        Cell: ({ row }) => (
            <label 
              htmlFor="editFermentLogEntry" 
              className="modal-button mr-3 btn btn-xs" 
              onClick={() => {
                setEntries(row);
                setShowModal(true);
              }}>✐</label>
        ),
      },{
        Header: 'Date',
        accessor: data => new Date(data.dateTime).toLocaleDateString()
      },
      {
        Header: 'Temperature',
        accessor: 'temp'
      },
      {
        Header: 'Gravity',
        accessor: 'gravity'
      },
      {
        Header: 'pH',
        accessor: 'pH'
      },
      {
        Header: 'Notes',
        accessor: 'notes'
      },
      ],
      []
    )

    return (
      <>
        {row.fermentTankNo? (
          <div className="tooltip m-2" data-tip="">
            <button className="btn">This ferment is in tank {row.fermentTankNo}</button>
          </div>
        ): (
          <div className="tooltip m-2" data-tip='Click "Set Ferment Tank" to set the ferment tank.'>
            <button className="btn">The ferment tank has not been set.</button>
          </div>)}
        {row.fermentData? <Table columns={columns} data={data} modal={modal}/>: "No ferment data"}
        <ModalFormLogEdit
          formAction="editFermentLog" 
          parentId={row._id}
          logEntry={entries.original}
          reloadData={reloadData}
          formInputs={formInputs}
          showModal={showModal}
          modalId="editFermentLogEntry"/>
      </>
  )
  
}



export default FermentData


//return <Update onClick={this.viewDetails}>View Detailed History</Update>