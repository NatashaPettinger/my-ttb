import React from 'react'
import { Table } from '../common'


const TankHistory = ({ row }) => {
    const subRow = row.tankHistory;

    const columns = React.useMemo(
        () => [{
                Header: 'Contents',
                accessor: 'contents',
              },
              {
                Header: 'Fill Proof',
                accessor: 'fillProof',
              },
              {
                Header: 'Wine Gallons',
                accessor: 'wineGal',
              },
              {
                Header: 'Fill Date',
                accessor: row => new Date(row.fillDate).toLocaleDateString(),
              },
              {
                Header: 'Empty Date',
                accessor: row => new Date(row.emptyDate).toLocaleDateString(),
              },
              {
                Header: 'Storage Duration (months)',
                accessor: row => row.duration.toFixed(2),
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

export default TankHistory