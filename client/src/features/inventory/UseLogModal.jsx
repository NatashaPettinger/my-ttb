import React from 'react'
import { LogFormElement } from '.'



const UseLogModal = ({ entries, reloadData, entryId, uom, showModal }) => {
    return (
        <>
            <input type="checkbox" id="logFormElement" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="logFormElement" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    {showModal && <div className="max-h-screen overflow-y-scroll">
                    <LogFormElement purchaseEntry={entries} reloadData={reloadData} entryId={entryId} 
                    entryKey={'useDate'} label={'Use Date: '} type={'date'} log={'useLog'} />
                    <LogFormElement purchaseEntry={entries} reloadData={reloadData} entryId={entryId} 
                    entryKey={'cost'} label={'Cost (USD): '} type={'number'} step={'.01'} log={'useLog'} />
                    <LogFormElement purchaseEntry={entries} reloadData={reloadData} entryId={entryId} 
                    entryKey={'quantity'} label={`Quantity (${uom}): `} type={'number'} step={'.01'} log={'useLog'} />
                    <LogFormElement purchaseEntry={entries} reloadData={reloadData} entryId={entryId} 
                    entryKey={'fermentId'} label={'Ferment ID: '} type={'text'} log={'useLog'} />
                    </div>}
                </div>
            </div>
        </>
    )
}

export default UseLogModal