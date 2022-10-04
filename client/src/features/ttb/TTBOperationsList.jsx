import React from 'react'
import { Tabs, Table } from '../common'
import { ProcessingOperationsTable, ProcessReports, ProductionOperationsTable, StorageOperationsTable } from '.'


const TTBTable = ({ data }) => {

    // ------------ define columns for main table ------------
    const columns = React.useMemo(
        () => [{
                // Make an expander cell
                Header: 'Expand', // No header
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
                Header: 'Year & Month',
                accessor: 'yearMonth',
                filterable: true,
              },
        ],
        []
    )

    // ------------ expander function ------------
    const renderRowSubComponent = React.useCallback(
        ({ row }) => (
            <Tabs>
              <div label="Monthly Report of Production Operations">
                <div className="bg-base-100 p-5">
                  <ProductionOperationsTable row={row.original}/>
                </div>
              </div>
              <div label="Monthly Report of Storage Operations">
                <div className="bg-base-100 p-5">
                  <StorageOperationsTable row={row.original}/>
                </div>
              </div>
              <div label="Monthly Report of Processing Operations">
                <div className="bg-base-100 p-5">
                  <ProcessingOperationsTable row={row.original}/>
                </div>
              </div>
              <div label="Excise Tax Return">
                <div className="bg-base-100 p-5">
                  {/* <ExciseTaxForm row={row.original}/> */}
                </div>
              </div>
            </Tabs>
        ),
        []
    )
    
    // ------------ render ------------
    return (
        <>
            <Table 
                columns={columns} 
                data={data} 
                hiddenColumns={[]}
                renderRowSubComponent={renderRowSubComponent} />
        </>
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
    <>
        <ProcessReports/>
        <TTBTable
            data={data}
            reloadData={reloadData}/>
    </>
    );
}
 
export default TableLoading