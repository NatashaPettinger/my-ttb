import React from 'react'
import { Table } from '../common'


const FermentData = ({ row }) => {

  const subRow = row.currentFill.distillData;

  const columns = React.useMemo(
      () => [{
        Header: 'Date Mashed',
        accessor: row => new Date(row.mashDate).toLocaleDateString(),
      },
      {
        Header: 'Date Distilled',
        accessor: row => new Date(row.distillDate).toLocaleDateString(),
      },
      {
        Header: 'Ferment ID',
        accessor: 'fermentId',
      },
      ],
      []
  )

  return (
      <>
          {<Table columns={columns} data={subRow}/>}
      </>
  )
}

export default FermentData