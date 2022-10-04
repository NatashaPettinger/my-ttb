import React from 'react';
import { Table, Tabs } from '../common';
import { DistillateAgingHistory, DistillateFermentData, TankHistory, StorageTransferForm, TransferToExistingTank, TransferToNewTank, UpdateCurrentFill, UpdateTank } from '.';

const WarehousingTable = ({ data, reloadData }) => {

    const columns = React.useMemo(
        () => [
        {
            Header: 'ℹ️',
            id: 'expander',
            Cell: ({ row }) => (
                <span {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>: <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg> }
                </span>
            ),
        },
        {
            Header: 'Tank Info',
            columns: [
            {
                Header: 'Tank Type',
                accessor: 'tankInfo.tankType',
                filterable: true,
            },
            {
                Header: 'Tank Number',
                accessor: 'tankInfo.tankNumber',
                filterable: true,
            },
            {
                Header: 'Capacity',
                accessor: 'tankInfo.capacity',
                filterable: true,
            },
            {
                Header: 'Barrel Char',
                accessor: 'tankInfo.char',
                filterable: true,
            },
            {
                Header: 'Manufacturer',
                accessor: 'tankInfo.manufacturer',
                filterable: true,
            },
            {
                Header: 'Fill Number',
                accessor: row => row.tankHistory.length + 1,
                filterable: true,
            },
            {
                Header: 'Useable',
                accessor: row => (row.tankInfo.status.useable? 'Yes': 
                row.tankInfo.status.saleDate? new Date(row.tankInfo.status.saleDate).toLocaleDateString():
                new Date(row.tankInfo.status.brokenDate).toLocaleDateString()),
                filterable: true,
            },
            ]
        },
        {
            Header: 'Distillate Info',
            columns: [
            {
                Header: 'Contents',
                accessor: 'currentFill.contents',
                filterable: true,
            },
            {
                Header: 'Fill Date',
                accessor: row => row.currentFill.fillDate? (new Date(row.currentFill.fillDate)).toLocaleDateString() : 'Empty',
                filterable: true,
            },
            {
                Header: 'Months in Current Tank',
                accessor: row => row.currentFill.fillDate? Math.floor((new Date() - new Date(row.currentFill.fillDate))/(1000 * 60 * 60 * 24 * 365/12)): '',
                filterable: true,
            },
            {
                Header: 'Fill Proof',
                accessor: 'currentFill.fillProof',
                filterable: true,
            },
            {
                Header: 'Wine Gallons',
                accessor: 'currentFill.wineGal',
                filterable: true,
            },
            {
                Header: 'Proof Gallons',
                accessor: 'currentFill.proofGal',
                filterable: true,
            },
            {
                Header: 'Remaining Capacity',
                accessor: row => row.tankInfo.capacity - row.currentFill.wineGal,
                filterable: true,
            }, 
            {
                Header: 'Empty Date',
                accessor: row => row.currentFill.emptyDate? new Date(row.currentFill.emptyDate).toLocaleDateString(): null,
                id: 'emptyDate',
                filterable: true,
            },
            {
                Header: 'Notes',
                accessor: 'currentFill.notes',
                filterable: true,
            },
            ]
        },
        ],
        []
    )

  // Create a function that will render our row sub components
    const renderRowSubComponent = React.useCallback(
        ({ row }) => (
            <Tabs>
                <div label="View Histories">
                    <div className="bg-base-100 p-5">
                        <label htmlFor="updateTankModal" className="btn modal-button mr-3">Edit Tank Info</label>
                        <label htmlFor="updateFillModal" className="btn modal-button mr-3">Update Fill Info</label>
                        <UpdateTank 
                            row={row.original}
                            reloadData={reloadData}
                            modalId="updateTankModal"
                        />
                        <UpdateCurrentFill
                        row={row.original}
                        reloadData={reloadData}
                        modalId="updateFillModal"
                    />
                    </div>
                    <div className="divider mb-0 mt-0"/>
                    <div className="bg-base-100 p-5">
                        <h3 className="font-bold text-lg mb-2">Current Fill Production History</h3>
                        {row.original.currentFill.distillData.length? 
                            <DistillateFermentData row={row.original}/>: 
                            <p>No distillation data available. This spirit may have been received via transfer in bond.</p>}
                    </div>
                    <div className="divider mb-0 mt-0"/>
                    <div className="bg-base-100 p-5">
                        <h3 className="font-bold text-lg mb-2">Current Fill Aging History</h3>
                        {row.original.currentFill.agingData.length? 
                            <DistillateAgingHistory row={row.original}/>:
                            <p>No aging history available. This may be the first container this distillate has been stored in.</p>}
                    </div>
                    <div className="divider mb-0 mt-0"/>
                    <div className="bg-base-100 p-5">
                        <h3 className="font-bold text-lg mb-2">Tank Aging History</h3>
                        {row.original.tankHistory.length? 
                            <TankHistory row={row.original}/>: 
                            <p>No tank history available. This may be the first fill of this container.</p>}
                    </div>
                </div>
                <div label="Transfer Contents">
                    <div className="bg-base-100 p-5 whitespace-normal">
                        {row.original.currentFill.contents === ''? 
                            <p>No volume available to transfer</p>:
                            <div>
                                <p className="mb-5">To report losses or report destruction of distillate, use the "Transfer out of Storage" form and select the appropriate transaction.</p>
                                <label htmlFor="transferToExistingTankModal" className="btn modal-button mr-3">Transfer to Existing Tank</label>
                                <label htmlFor="transferToNewTankModal" className="btn modal-button mr-3">Transfer to New Tank</label>
                                <label htmlFor="transferOutOfStorage" className="btn modal-button mr-3">Transfer out of Storage</label>
                            </div>}
                            
                        <TransferToExistingTank 
                            row={row.original} 
                            reloadData={reloadData} 
                            modalId="transferToExistingTankModal"
                        />
                        <TransferToNewTank 
                            row={row.original} 
                            reloadData={reloadData} 
                            modalId="transferToNewTankModal"
                        />
                        <StorageTransferForm 
                            row={row.original} 
                            reloadData={reloadData} 
                            modalId="transferOutOfStorage"
                        />
                    </div>
                </div>
            </Tabs>
        ),
        [reloadData]
    )

    return (
        <div>
            <Table 
                columns={columns} 
                data={data} 
                hiddenColumns={['currentFill.notes', 'Useable', 'emptyDate', 'Remaining Capacity', 'tankInfo.capacity','tankInfo.char','tankInfo.manufacturer',]}
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

    return (
    <div>
        <WarehousingTable
            data={data}
            reloadData={reloadData}/>
    </div>
    );
}
 
export default TableLoading