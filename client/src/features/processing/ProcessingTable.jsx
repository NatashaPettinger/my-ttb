import React from 'react';
import { Table, Tabs } from '../common';
import { DistillateFermentData, DistillateAgingHistory } from '../storage';

const ProcessingTable = ({ data, reloadData }) => {

    // ------------ define columns for main table ------------
    const columns = React.useMemo(
        () => [{
                    // Make an expander cell
                    Header: () => null, // No header
                    id: 'expander', // It needs an ID
                    Cell: ({ row }) => (
                    // Use Cell to render an expander for each row.
                    // We can use the getToggleRowExpandedProps prop-getter
                    // to build the expander.
                    <span {...row.getToggleRowExpandedProps()}>
                      {row.isExpanded ? <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>: <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg> }
                    </span>
                    ),
                },
                {
                    Header: 'Processing Date',
                    accessor: row => new Date(row.bottleDate).toLocaleDateString(),
                    filterable: true,
                },
                {
                    Header: 'Batch Type',
                    accessor: 'batchType',
                    filterable: true,
                },
                {
                    Header: 'Batch Number',
                    accessor: 'batchNumber',
                    filterable: true,
                },
                {
                    Header: 'Total Proof Gal',
                    accessor: 'totalProofGal',
                    filterable: true,
                },
                {
                    Header: 'Total Wine Gal',
                    accessor: 'totalWineGal',
                    filterable: true,
                },
                {
                    Header: '6pk x 750mL cases (ea)',
                    accessor: row => Math.floor(row.count750mLBottles/6),
                    filterable: true,
                },
                {
                    Header: '6pk x 375mL cases (ea)',
                    id: '6pk x 375mL cases (ea)',
                    accessor: row => Math.floor(row.count375mLBottles/6),
                    filterable: true,
                },
                {
                    Header: 'Losses',
                    accessor: 'losses',
                    filterable: true,
                },
        ],
        []
    )

    // ------------ expander function ------------
    
  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
        <Tabs>
            <div label="Production Info">
              <div className="bg-base-100 p-5">
                <DistillateFermentData reloadData={reloadData} row={row.original} />
              </div>
            </div>
            <div label="Aging History">
              <div className="bg-base-100 p-5">
                {row.original.currentFill.agingData.length? <DistillateAgingHistory row={row.original}/> : null}
              </div>
            </div>
        </Tabs>
    ),
    []
  )
    
    // ------------ render ------------
    return (
        <div>
            <Table 
                columns={columns} 
                data={data} 
                hiddenColumns={['6pk x 375mL cases (ea)',]}
                renderRowSubComponent={renderRowSubComponent} />
        </div>
    )
}

function TableLoading({ data, loading, reloadData }) {
    if (loading) {
      return (
            <p>Loading...</p>
      );
    }
    // error handling here :)
  
    return (
      <div>
        <ProcessingTable
            data={data}
            reloadData={reloadData}/>     
      </div>
        
    );
}
 
export default TableLoading