import React, { useEffect } from 'react'
import api from '../api'
import { ModalForm } from '../common'


const MashForm = ({ row, ingredients, reloadData, modalId }) => {
    const id = row._id;

    const formEntries = [
        {
            dbKey: 'ingredientId',
            label: "Ingredient: ",
            type: 'select',
            select: ingredients.map(x => (
                {'dbEntry': x._id, 
                'label': `${x.name} | UOM: ${x.uom}`}
            )),
        },{
            dbKey: 'quantity',
            label: "Quantity (UOM): ",
            type: 'number',
            step: '0.1',
            min: '0',
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
        <ModalForm 
            id={id}
            reloadData={reloadData}
            formAction="addIngredient"
            buttonLabel="Add Ingredient"
            formEntries={formEntries}
            closeModal={closeModal}/>
    )
}

function SubRows({ row, data, loading, reloadData, modalId }) {
    if (loading) {
        return (
              <p>Loading...</p>
        );
    }
    // error handling here

    return (
        <>
            <MashForm
                row={row}
                ingredients={data}
                reloadData={reloadData}
                modalId={modalId}/>
        </>
    );
}

const MashIngredientForm = ({ row, reloadData, modalId }) => {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
  
    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      try {
        const res = await api.getRawMaterials()
        setData(res.data.data);
        setLoading(false);
      } catch (e) {
        console.error(new Error(`seems your fetch didn't work`))
      }
    };

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
                    modalId={modalId}
                    />
                </div>
            </div>
        </>
      );
}
    
export default MashIngredientForm




