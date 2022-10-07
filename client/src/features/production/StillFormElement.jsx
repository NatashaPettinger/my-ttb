import React from 'react'
import { useForm } from "react-hook-form";
import api from '../api'
import useAuth from '../api/useAuth'


const FormElement = ({ row, stillKey, label, type, step = 0.1, min = 0, select, reloadData }) => {
    

    const { register, handleSubmit, reset } = useForm();
    const { token } = useAuth();

    const id = row._id;


    const onSubmit = async (data, e) => {
        const payload = {id, stillKey, data, label, type};
        console.log(payload)
        await api.addStillDataPoint(payload, token);
        reloadData();
        e.target.reset();
    };

    let distillData = row.distillData || null;
    let storedValue = !distillData[stillKey]? 'No Data': type === 'date' ? 
        new Date(distillData[stillKey]).toLocaleDateString(): type === 'time' ?
        new Date(distillData[stillKey]).toLocaleTimeString(): type === 'checkbox'? 
        'Yes': distillData[stillKey];
    if (stillKey === 'distilled') storedValue = (row.distilled===true? 'Yes': 'No');
    if (stillKey === 'transferred') storedValue = (row.transferred===true? 'Yes': 'No');

        //collapse-arrow border border-base-300 bg-base-100 rounded-box
    return (
        <>
        <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
                <div className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box mb-1"> 
                    <input type="checkbox" /> 
                    <div className="collapse-title text-xl font-medium">
                        <label className="block text-sm font-medium text-white"
                            htmlFor="data" >
                            {label}: {storedValue}
                        </label>
                    </div>
                    <div className="collapse-content"> 
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label 
                                htmlFor="data" 
                                className="block text-sm font-medium text-white">
                                Enter new value:
                            </label>
                            {
                                type === 'number' ? 
                                <input 
                                    className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm input input-bordered w-full max-w-xs" 
                                    type={type} 
                                    step={step}
                                    min={min}
                                    {...register('data')}
                                    defaultValue={storedValue?? null}
                                />: type === 'select' ? (
                                    <select 
                                    className="mt-1 block rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm sm:text-sm select select-bordered w-full max-w-xs" 
                                    {...register('data')}
                                    defaultValue={storedValue?? null}>
                                    {select.map(val => (
                                        <option value={val.dbEntry}>{val.label}</option>
                                    ))}
                                    </select>
                                ): type === "checkbox" ?
                                <div className="form-control">
                                    <label className="cursor-pointer label">
                                        <span className="label-text">Check if {label}</span>
                                        <input type="checkbox" className="checkbox checkbox-accent" {...register('data')}/>
                                    </label>
                                </div>:
                                <input 
                                    className="mt-1 block rounded-md border-gray-300 shadow-sm sm:text-sm input input-bordered w-full max-w-xs"
                                    type={type}
                                    {...register('data')}
                                    defaultValue={storedValue?? null}
                                />
                            }
                            <input
                                    className="btn btn-ghost mt-1 w-full max-w-xs"
                                    type="button"
                                    onClick={() => reset()}
                                    value="Reset"
                                />
                            <input className="btn mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm max-w-xs" type="submit" value="Record" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
            
        
    )
}

export default FormElement

                    