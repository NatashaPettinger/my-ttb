import React from 'react'
import { ModalForm } from '../common'

const FormElement = ({ modalId, reloadData }) => {
    const formEntries = [
        {
          dbKey: "date",
          label: "Report Month: ",
          type: 'date',
        }
    ]
    
    return (
        <>
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    
                <ModalForm
                    id="noId"
                    log="allLogs"
                    reloadData={reloadData}
                    formAction="processTTBReports"
                    buttonLabel="Process Reports"
                    formEntries={formEntries}
                />
                </div>
            </div>
        </>
        );

  

  
}

export default FormElement

