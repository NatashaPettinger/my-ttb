import React from 'react'
import { useForm } from "react-hook-form";
import api from '../api'

const AdjustQuantityForm = ({ row, reloadData }) => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data, e) => {
        const payload = {
            id: row._id,
            data: data,
        }
        await api.adjustQuantityOnHand(payload);
        reloadData();
        e.target.reset();
        document.getElementById('adjustQuantityForm').checked = false;
    };

    return (
        <>
        <input type="checkbox" id="adjustQuantityForm" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box relative">
                <label htmlFor="adjustQuantityForm" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                            <label 
                                htmlFor="editDate"
                                className="block text-sm font-medium text-white">
                                Record Date:</label>
                            <input 
                                type="date"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm"
                                {...register("editDate")}
                            />
                        </div>
                        <div className="col-span-6">
                            <label 
                                htmlFor="quantityOnHand"
                                className="block text-sm font-medium text-white">
                                Quantity On Hand: </label>
                            <input 
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm"
                                type="number"
                                step="0.1"
                                {...register("quantityOnHand")}
                            />
                        </div>
                        <div className="col-span-6">
                            <input className="btn" type="submit" value="Record New Purchase" />
                            <input
                                className="btn btn-ghost ml-2" 
                                type="button"
                                onClick={() => reset()}
                                value="Reset"
                            />
                        </div> 
                    </div>
                </form>
            </div>
        </div>
        </>
    )

}
    
export default AdjustQuantityForm

