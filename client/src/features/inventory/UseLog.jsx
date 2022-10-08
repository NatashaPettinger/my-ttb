import React, { useState } from 'react'
import { Table, ModalFormLogEdit } from '../common';
import { UseLogModal } from '.'

const UseLog = ({ row, reloadData }) => {
  
  const data = row.useLog;
  const uom = row.uom;
  const [entries, setEntries] = useState({});
  const [showModal, setShowModal] = useState(false);
  const formInputs = [
    {
      entryKey:"useDate",
      label:"Use Date:",
      type:"date",
    },
    {
      entryKey:"cost",
      label:"Cost (USD):",
      type:"number",
      step:"0.01",
    },
    {
      entryKey:"quantity",
      label:`Quantity (${uom}):`,
      type:"number",
      step:"0.01",
    },
    {
      entryKey:"fermentId",
      label:"Ferment ID:",
      type:"text",
    },
    ]
  

    const columns = React.useMemo(
      () => [{
              Header: '✐', 
              id: 'expander',
              Cell: ({ row }) => (
                <label 
                  htmlFor="editUseLogEntry" 
                  className="modal-button mr-3 btn btn-xs" 
                  onClick={() => {
                    setEntries(row);
                    setShowModal(true);
                  }}>✐</label>
              ),
            },
            {
              Header: 'Use Date',
              accessor: row => (new Date(row.useDate)).toDateString()
            },
            {
              Header: `Quantity (${uom})`,
              accessor: 'quantity'
            },
            {
              Header: `Cost`,
              accessor: row => '$' + row.cost.toFixed(2)
            },
            {
              Header: `Ferment ID`,
              accessor: 'fermentId'
            },
      ],
      [uom]
    )
    const description = `Edit use log entry for ${row.name}`

    return (
      <div>
        <Table columns={columns} data={data} /* renderRowSubComponent={renderRowSubComponent} */ />
        {/* <UseLogModal entries={entries.original} reloadData={reloadData} entryId={id} uom={uom} showModal={showModal}/> */}
        <ModalFormLogEdit
          formAction="editMaterialsLog" 
          description={description}
          parentId={row._id}
          logId="useLog"
          logEntry={entries.original}
          reloadData={reloadData}
          formInputs={formInputs}
          showModal={showModal}
          modalId="editUseLogEntry"/>
      </div>
  )
  
}



export default UseLog
