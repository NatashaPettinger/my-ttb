import React from 'react';
import { ModalForm } from '../common';

const FermentDataForm = ({ row, reloadData, modalId }) => {
    const formEntries = [{
        dbKey: "dateTime",
        label: "Date:",
        type: "date"
    },{
        dbKey: "temp",
        label: "Temperature (˚F):",
        type: "number",
        step: "0.1"
    },{
        dbKey: "gravity",
        label: "Specific Gravity:",
        type: "number",
        step: "0.001"
    },{
        dbKey: "pH",
        label: "pH:",
        type: "number",
        step: "0.01"
    },{
        dbKey: "notes",
        label: "Notes:",
        type: "text"
    }
    ]

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
                        formAction="addFermentData"
                        buttonLabel="Add Ferment Data"
                        formEntries={formEntries}
                        closeModal={closeModal}/>
                </div>
            </div>
        </>
    )
}

    
export default FermentDataForm




