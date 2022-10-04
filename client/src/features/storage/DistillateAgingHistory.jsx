import React from 'react'
import { Table } from '../common'



const AgingData = ({ row }) => {
    const subRow = row.currentFill.agingData;

    const columns = React.useMemo(
        () => [{
                Header: 'Tank Type',
                accessor: 'tankType',
              },
              {
                Header: 'Tank Number',
                accessor: 'tankNumber',
              },
              {
                Header: 'Storage Duration (months)',
                accessor: 'duration',
              },
              {
                Header: 'Fill Date',
                accessor: row => new Date(row.fillDate).toDateString(),
              },
              {
                Header: 'Empty Date',
                accessor: row => new Date(row.emptyDate).toDateString(),
              },
              {
                Header: 'Tank ID',
                accessor: 'tankId',
              },
        ],
        []
    )

    return (
        <>
            <Table columns={columns} data={subRow}/>
        </>
    )
}

export default AgingData