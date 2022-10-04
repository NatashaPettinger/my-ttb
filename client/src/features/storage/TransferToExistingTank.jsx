import React, { useEffect } from 'react'
import api from '../api'
import { ModalForm } from '../common'


function TransferForm({ row, endTankData, reloadData, closeModal }) {

    const formEntries = [
        {
            dbKey: 'endTank',
            label: "Transfer to: ",
            type: 'select',
            select: endTankData.map(x => (
                {'dbEntry': x._id, 
                'label': `${x.tankInfo.tankType[0].toUpperCase() + x.tankInfo.tankType.slice(1)} ${x.tankInfo.tankNumber} | Volume available: ${x.tankInfo.capacity - x.currentFill.wineGal} gal`}
            )),
        },{
            dbKey: "currentFill.wineGal",
            label: "Wine Gallons: ",
            type: 'number',
            step: '0.1',
            min: '0',
            max: row.currentFill.wineGal
        },{
            dbKey: "currentFill.waterAdded",
            label: "Water Added (gal): ",
            type: 'number',
            step: '0.1',
            min: '0',
        },{
            dbKey: "currentFill.fillProof",
            label: "Fill Proof: ",
            default: row.currentFill.fillProof,
            type: 'number',
            step: '0.1',
            min: '0',
            max: '195',
        },{
            dbKey: "emptyDate",
            label: "Transfer Date: ",
            type: 'date',
        },{
            dbKey: "notes",
            label: "Notes: ",
            default: row.notes,
            type: 'text',
        },{
            dbKey: "empty",
            label: "Check Box if Starting Tank is Empty: ",
            type: 'checkbox',
        },
    ]
    return (
        <>
            <h3 className="font-bold text-lg mb-2">Transfer from: <em>{row.tankInfo.tankType[0].toUpperCase() + row.tankInfo.tankType.slice(1)} {row.tankInfo.tankNumber}</em></h3>
            <ModalForm 
                id={row._id}
                reloadData={reloadData}
                formAction="transferToExistingTank"
                buttonLabel="Transfer"
                formEntries={formEntries}
                closeModal={closeModal}/>
        </>
        
    )
}


function SubRows({ row, data, loading, reloadData, closeModal }) {
    if (loading) {
      return (
            <p>Loading...</p>
      );
    }
    // error handling here :)
  
    return (
    <>
        <TransferForm
            row={row}
            endTankData={data}
            reloadData={reloadData}
            closeModal={closeModal}/>
    </>
    );
}
  
function TransferToExistingTank({ row, reloadData, modalId }) {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
  
    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      try {
        const res = await api.getTanks()
        setData(res.data.data);
        setLoading(false);
      } catch (e) {
        console.error(new Error(`seems your fetch didn't work`))
      }
    };

    const closeModal = () => document.getElementById(modalId).checked = false;

    return (
    <>
        <input type="checkbox" id={modalId} className="modal-toggle" />
        <div className="modal">
            <div className="modal-box relative">
                <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                <SubRows
                row={row}
                data={data}
                loading={loading}
                reloadData={reloadData}
                closeModal={closeModal}
                />
            </div>
        </div>
    </>
    )
    
}

export default TransferToExistingTank