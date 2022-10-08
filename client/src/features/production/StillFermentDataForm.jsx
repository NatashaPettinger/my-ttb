import React from 'react'
import { useForm } from "react-hook-form";
import api from '../api'
import useAuth from '../api/useAuth'


const FermentDataForm = ({ row, reloadData }) => {
    const { register, handleSubmit, reset } = useForm();
    const { token } = useAuth();

    const id = row._id;

    const distillData = row.distillData;

    const onSubmit = async (data, e, ) => {
        const payload = {id, data};
        await api.stillMashData(payload, token);
        reloadData();
        e.target.reset();
    };

    return (
        <>
        <div className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box mb-1"> 
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium">
                <label className="block text-sm font-medium text-white">
                    Ferment Data
                </label>
            </div>
            <div className="collapse-content"> 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-8 gap-6">
                        
                        <div className="col-span-2 sm:col-span-8">   
                            <label 
                                htmlFor="temp"
                                className="block text-sm font-medium text-white">
                                    Stored Temperature (˚F): {distillData.temp?? 'No Data'}
                                    <br/> 
                                    New Temperature (˚F):
                            </label>
                            <input 
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm input input-bordered w-full max-w-xs" 
                                type="number"
                                step="0.1"
                                min="32"
                                {...register('temp')}
                                defaultValue={distillData.temp?? null}
                            />
                        </div>
                        
                        <div className="col-span-2 sm:col-span-8">
                            <label 
                                htmlFor="gravity"
                                className="block text-sm font-medium text-white">
                                    Specific Gravity: {distillData.gravity?? 'No Data'}
                                    <br/> 
                                    New Specific Gravity:
                            </label>
                            <input 
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm input input-bordered w-full max-w-xs" 
                                type="number"
                                step="0.001"
                                min="0"
                                {...register('gravity')}
                                defaultValue={distillData.gravity?? null}
                            />
                            </div>
                            
                            <div className="col-span-2 sm:col-span-8">
                            <label 
                                htmlFor="pH"
                                className="block text-sm font-medium text-white">
                                    pH: {distillData.pH?? 'No Data'}
                                    <br/> 
                                    New pH:
                            </label>
                            <input 
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm input input-bordered w-full max-w-xs" 
                                type="number"
                                step="0.1"
                                min="0"
                                {...register('pH')}
                                defaultValue={distillData.pH?? null}
                            />
                            </div>
                            
                            <div className="col-span-2 md:col-span-8">
                            <label 
                                htmlFor="notes"
                                className="block text-sm font-medium text-white">
                                    Notes: {distillData.notes?? 'No Data'}
                                    <br/> 
                                    New notes:
                            </label>
                            <input 
                                className="mt-1 block w-full rounded-md border-gray-300 input input-bordered w-full max-w-xs" 
                                type="text"
                                {...register('notes')}
                                defaultValue={distillData.notes?? null}
                            />
                            </div>
                            
                            <div className="col-span-2 sm:col-span-8">
                            <input
                                className="btn btn-ghost mt-1 w-full max-w-xs"
                                type="button"
                                onClick={() => reset()}
                                value="Reset"
                            />
                            <input className="btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm max-w-xs" type="submit" value="Record" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
        </>
    )
}

    
export default FermentDataForm