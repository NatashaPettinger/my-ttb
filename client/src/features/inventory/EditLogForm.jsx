import React from 'react'
import { useForm } from "react-hook-form";
import api from '../api'


const EditLogForm = ({ row, reloadData, id }) => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data, e) => {
        const payload = {
            editId: row._id,
            data: data,
            id: id,
        }
        await api.editQuantityAdjust(payload);
        reloadData();
        e.target.reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 gap-6 w-full">
                    <div className="col-span-2">
                        <label 
                            htmlFor="editDate" 
                            className="block text-sm font-medium text-white">
                            Record Date: 
                        </label>
                        <input 
                            type="date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            {...register("editDate")} />
                    </div>

                    <div className="col-span-2">
                        <label 
                            htmlFor="adjustment" 
                            className="block text-sm font-medium text-white">
                            Actual Adjustment: 
                        </label>
                        <input 
                            type="number"
                            step="0.1"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            {...register("adjustment")} />
                    </div>

                    <div className="col-span-2">
                        <input
                            className="btn btn-ghost mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm" 
                            type="button"
                            onClick={() => reset()}
                            value="Reset"
                        />
                    </div>

                    <div className="col-span-2">
                        <input 
                            className="btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm" 
                            type="submit" 
                            value="Edit Entry" />
                    </div>
            </form>
        </div>
    )

}
    
export default EditLogForm

