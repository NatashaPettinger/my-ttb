import React from 'react'
import { Table, Tabs }  from '../common'
import { PurchaseLog, UseLog, EditLog, EditMaterialDetailsForm, PurchaseForm, AdjustQuantityForm } from "./";

const RawMaterialsTable = ({ data, reloadData }) => {


    // ------------ define columns for main table ------------
    const columns = React.useMemo(
        () => [{
                Header: 'ℹ️',
                id: 'expander',
                Cell: ({ row }) => (
                  <span {...row.getToggleRowExpandedProps()}>
                    {row.isExpanded ? <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>: <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg> }
                  </span>
                ),
              },
              {
                Header: 'Type',
                accessor: 'materialType',
                filterable: true,
              },
              {
                Header: 'Details',
                accessor: 'name',
                filterable: true,
              },
              {
                Header: 'Quantity on Hand',
                accessor: row => `${row.purchaseLog.reduce((a,b)=> a + b.quantityUom, 0) 
                  - row.useLog.reduce((a,b)=> a + b.quantity, 0)
                  + row.editLog.reduce((a,b)=> a + b.quantityAdjustment, 0)} ${row.uom}`,
                filterable: true,
              },
              {
                Header: 'Most Recent Purchase Price',
                accessor: row => `$${row.purchaseLog[0].costPerUom.toFixed(3)} / ${row.uom}`,
                filterable: true,
              },
              {
                Header: 'Last Purchased',
                accessor: row => new Date(row.purchaseLog[0].purchaseDate).toDateString(),
                filterable: true,
              },
              {
                Header: 'Reorder Quantity',
                accessor: row => `${row.reorderQuantity} ${row.uom}`,
                filterable: true,
              },
            ],
        []
    )
    // ------------ expander function ------------
    const renderRowSubComponent = React.useCallback(
        ({ row }) => (
            <>
                <Tabs tabSize="tab">
                    <div label="Purchase Log">
                      <div className="bg-base-100 p-2">
                        <PurchaseLog row={row.original} reloadData={reloadData} modal={[{modal: "purchaseLogForm", modalText: "Record New Purchase"}]} />
                        <PurchaseForm row={row.original} reloadData={reloadData}/>
                      </div>
                    </div>
                    <div label="Use Log">
                      <div className="bg-base-100 p-2">
                        <UseLog row={row.original} reloadData={reloadData}/>
                      </div>
                    </div>
                    <div label="Quantity Adjustment Log">
                      <div className="bg-base-100 p-2">
                        <EditLog row={row.original} reloadData={reloadData} modal="adjustQuantityForm" modalText="RecordNewPurchase"/>
                        <AdjustQuantityForm row={row.original} reloadData={reloadData}/>
                      </div>
                    </div>
                    <div label="Edit Material Details">
                      <div className="bg-base-100 p-2">
                        <EditMaterialDetailsForm row={row.original} reloadData={reloadData}/>
                      </div>
                    </div>
                </Tabs>
                
            </>
        ),
        [reloadData]
    )
    
    // ------------ render ------------
    return (
      <>
        <Table 
          columns={columns} 
          data={data} 
          hiddenColumns={['materialType','Reorder Quantity','Most Recent Purchase Price']}
          renderRowSubComponent={renderRowSubComponent} 
          tableLabel="Raw Materials Inventory" />
          
        
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
        <RawMaterialsTable
            data={data}
            reloadData={reloadData}/>
      </>
      
          
    );
}
 
export default TableLoading