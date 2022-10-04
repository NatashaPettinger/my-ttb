import React from 'react'
import { useForm } from "react-hook-form";
import api from '../api'

const FormElement = ({ purchaseEntry, entryKey, entryId, label, type, step, log, reloadData }) => {
    
    console.log(purchaseEntry[entryKey])
    const { register, handleSubmit } = useForm();

    const editId = purchaseEntry._id;


    const onSubmit = async (data, e) => {
        const payload = {entryId, editId, entryKey, data, log};
        console.log(payload)
        await api.editMaterialsLog(payload);
        reloadData();
        e.target.reset();
    };

    const storedValue = !purchaseEntry[entryKey]? 'No Data': type === 'date' ? 
        new Date(purchaseEntry[entryKey]).toLocaleDateString(): purchaseEntry[entryKey];

    return (
        <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-base-300 px-1 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label 
                            htmlFor="data" 
                            className="block text-sm font-medium text-white">
                            Stored {label} {storedValue} <br/> New {label}
                        </label>
                        <label 
                            htmlFor="data" 
                            className="block text-sm font-medium text-white">
                            
                        </label>
                        {
                            type === 'number' ? 
                            <input 
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm" 
                                type={type} 
                                step={step}
                                {...register("data")}
                            />: 
                            <input 
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm"
                                type={type}
                                {...register("data")}
                            />
                        }
                        <input className="btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm" type="submit" value="Add Change" />
                      </div>
                  </div>
                  </div>
                </div>
              </form>
            </div>
        
    )
}

export default FormElement
