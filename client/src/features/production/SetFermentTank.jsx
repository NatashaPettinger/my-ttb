import React from 'react';
import { ModalForm } from '../common';


const SetFermentTank = ({ row, reloadData, modalId }) => {
    const formEntries = [{
        dbKey: 'fermentTankNo',
        label: "Ferment Tank Number:",
        default: row.fermentTankNo,
        type: 'select',
        select: [
            {dbEntry: '1', label: "One (Closest to Mill)"},
            {dbEntry: '2', label: "Two"},
            {dbEntry: '3', label: "Three"},
            {dbEntry: '4', label: "Four (Closest to Boiler)"},
        ]
    }]
    
    const closeModal = () => document.getElementById(modalId).checked = false;

    return (
        <>
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <ModalForm 
                        id={row._id}
                        reloadData={reloadData}
                        formAction="setFermentTank"
                        buttonLabel="Set Ferment Tank"
                        formEntries={formEntries}
                        closeModal={closeModal}/>
                </div>
            </div>
        </>
    )
}

    
export default SetFermentTank




