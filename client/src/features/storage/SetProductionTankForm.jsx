import React from 'react'
import { ModalForm } from '../common'


const SetProductionTank = ({ reloadData, modalId }) => {

    const formEntries = [
        {
            dbKey: 'tankInfo.tankType',
            label: "TankType: ",
            type: 'select',
            select: [
                {dbEntry: 'spirit safe', label: "Spirit Safe"},
                {dbEntry: 'barrel', label: "Barrel"},
                {dbEntry: 'ibc tote', label: "IBC Tote"},
                {dbEntry: 'stainless tank', label: "Stainless Tank"},
            ]
        },{
            dbKey: 'tankInfo.capacity',
            label: "Capacity (gal): ",
            type: 'number',
            step: '0.1',
            min: '0',
        },{
            dbKey: 'tankInfo.manufacturer',
            label: "Manufacturer:",
            type: 'time',
        }
    ]

    return (
        <>
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <ModalForm 
                        id={"none"}
                        reloadData={reloadData}
                        formAction="setProductionTank"
                        buttonLabel="Set Production Tank"
                        formEntries={formEntries}/>
                </div>
            </div>
        </>
    )
}

    
export default SetProductionTank




