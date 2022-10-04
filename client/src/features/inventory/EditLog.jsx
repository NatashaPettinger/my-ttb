import React from 'react';
import { Table } from '../common';
import { EditLogForm } from '.';


const EditLog = ({ row, reloadData }) => {
  
  const data = row.editLog;
  const id = row._id;

    const columns = React.useMemo(
      () => [{
              Header: '✐',
              id: 'expander',
              Cell: ({ row }) => (
                <span className="mr-3 btn btn-xs" {...row.getToggleRowExpandedProps()}>
                  {row.isExpanded ? '✏️' : '✐'}
                </span>
              ),
            },
            {
              Header: 'Adjustment Date',
              accessor: row => (new Date(row.editDate)).toDateString()
            },
            {
              Header: `Quantity Adjustment (${row.uom})`,
              accessor: `quantityAdjustment`
            },
          ],
      []
    )

  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
        <>
          <EditLogForm row={row.original} reloadData={reloadData} id={id}/>
        </>
    ),
    []
  )


  return (
    <div>
      <Table columns={columns} data={data} renderRowSubComponent={renderRowSubComponent}/>
    </div>
  )
  
}



export default EditLog
