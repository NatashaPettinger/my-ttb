import React from 'react'
import { ModalForm } from '../common';


const ActionForm = ({ row, reloadData, modalId }) => {

    const formEntries = [
        {
            dbKey: 'action',
            label: "Action: ",
            type: 'select',
            select: [
                {dbEntry: 'boiler on', label: "Boiler On"},
                {dbEntry: 'water added', label: "Water Added"},
                {dbEntry: 'mill start', label: "Mill Start"},
                {dbEntry: 'mill end', label: "Mill End"},
                {dbEntry: 'steam on', label: "Steam On"},
                {dbEntry: 'steam off', label: "Steam Off"},
                {dbEntry: 'cooling water on', label: "Cooling Water On"},
                {dbEntry: 'cooling water off', label: "Cooling Water Off"},
                {dbEntry: 'pump start', label: "Pump Start"},
                {dbEntry: 'pump end', label: "Pump End"},
            ]
        },{
            dbKey: 'temp',
            label: "Temperature: ",
            type: 'number',
            step: '0.1',
            min: '0',
        },{
            dbKey: 'timeAdded',
            label: "Time Added: ",
            type: 'time',
        },{
            dbKey: 'note',
            label: "Notes: ",
            type: 'text',
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
                        formAction="addIngredient"
                        buttonLabel="Report Step"
                        formEntries={formEntries}
                        closeModal={closeModal}/>
                </div>
            </div>
        </>
    )
}

    
export default ActionForm




