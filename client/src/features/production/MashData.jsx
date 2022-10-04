import React from 'react'
import { Table } from '../common'


//tankHistory: [distillate type, storage duration, distill dates & ids]

//distillateWarehouseHistory: [startTank[0].tankType, startTank[0].tankNumber, startTank[0]._id, newDaysInBarrel]
// distillateProductionHistory: [ferment ID, distillation date, proof gallons]
// [previous tank type, previous tank number, previous tank ID, previous tank storage duration (days)]


const MashData = ({ row, reloadData, modal }) => {
  
  const data = row.ingredients;
  const id = row._id;

  const columns = React.useMemo(
    () => [{
            // Make an expander cell
            Header: 'Edit', // No header
            id: 'expander', // It needs an ID
            Cell: ({ row }) => (
              // Use Cell to render an expander for each row.
              // We can use the getToggleRowExpandedProps prop-getter
              // to build the expander.
              <span {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? <button className="btn btn-sm">✏️</button> : <button className="btn btn-sm">✐</button>}
              </span>
            ),
          },
          {
            Header: 'Time Stamp',
            accessor: data => new Date(data.timeAdded).toLocaleTimeString()
            //accessor: row => row.grainTypes.map((x,i) => x + ' | ' + row.grainQuants[i]).join('\n')
          },
          {
            Header: 'Category',
            accessor: 'category'
            //accessor: row => row.enzymeTypes.map((x,i) => x + ' | ' + row.enzymeQuants[i]).join('\n')
          },
          {
            Header: 'Details',
            accessor: 'type'
            //accessor: row => row.yeastTypes.map((x,i) => x + ' | ' + row.yeastQuants[i]).join('\n')
          },
          {
            Header: 'Quantity',
            accessor: row => row.quantity? `${row.quantity} ${row.uom}`: ''
            //accessor: row => row.nutrientTypes.map((x,i) => x + ' | ' + row.nutrientQuants[i]).join('\n')
          },
          {
            Header: 'Temperature',
            accessor: row => row.temp? `${row.temp}˚F`: ''
            //accessor: row => row.pHTypes.map((x,i) => x + ' | ' + row.pHQuants[i]).join('\n')
          },
    ],
    []
  )

  //form props are not correct. Need to figure out what can be editable.
  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
        <>
        test
          {/* <LogFormElement purchaseEntry={row.original} reloadData={reloadData} id={id} 
          entryKey={'type'} label={'Details'} type={'text'} log={'mashData'} />
          <LogFormElement purchaseEntry={row.original} reloadData={reloadData} id={id} 
          entryKey={'quantity'} label={'Quantity'} type={'number'} step={'.01'} log={'mashData'} />
          <LogFormElement purchaseEntry={row.original} reloadData={reloadData} id={id} 
          entryKey={'timeAdded'} label={'Time Stamp'} type={'time'} log={'mashData'} />
          <LogFormElement purchaseEntry={row.original} reloadData={reloadData} id={id} 
          entryKey={'temp'} label={'Temperature'} type={'number'} step={'.1'} log={'mashData'} />
          <LogFormElement purchaseEntry={row.original} reloadData={reloadData} id={id} 
          entryKey={'note'} label={'Notes'} type={'text'} log={'mashData'} />
          <LogFormElement purchaseEntry={row.original} reloadData={reloadData} id={id} 
          entryKey={'delete'} label={'Delete Entry'} type={'checkbox'} log={'mashData'} /> */}
        </>
    ),
    []
  )

  return (
    <>
      <Table 
        columns={columns} 
        data={data} 
        id={id} 
        renderRowSubComponent={renderRowSubComponent}
        modal={modal}/>
    </>
  )
  
}



export default MashData


//return <Update onClick={this.viewDetails}>View Detailed History</Update>

//form for each addition: drop down of all materials (& actions, steam on, steam off, pump on, pump off, mill grain), uom, text input w/ suggested quantity, temperature of mash, & time
