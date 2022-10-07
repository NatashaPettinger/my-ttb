import React from 'react'
import { useForm } from "react-hook-form";
import api from '../api'
import useAuth from '../api/useAuth'


const StillCutsFormEnd = ({ row, stillKey, label, reloadData }) => {
    

    const { register, handleSubmit, reset } = useForm();
    const { token } = useAuth();

    const id = row._id;
    const distillData = (!row.distillData? {}: row.distillData[stillKey]?? {} ); 

    const onSubmit = async (data, e) => {
        const payload = {id, stillKey, data, label};
        console.log(payload)
        await api.stillCutStarts(payload, token);
        reloadData();
        e.target.reset();
    };

    return (
        <>
        <div className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box mb-1"> 
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium">
                <label className="block text-sm font-medium text-white">
                    {label} Cuts
                </label>
            </div>
            <div className="collapse-content"> 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-8 gap-6">
                        
                        <div className="col-span-2 sm:col-span-8">   
                            <label 
                                htmlFor="startTime"
                                className="block text-sm font-medium text-white">
                                    Stored {label} Start Time: {!distillData.startTime? 'No Data': new Date(distillData.startTime).toLocaleTimeString()}
                                    <br/> 
                                    New {label}:
                            </label>
                            <input 
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm input input-bordered w-full max-w-xs" 
                                type="time"
                                {...register('startTime')}
                                defaultValue={!distillData? distillData.startTime: null}
                            />
                        </div>
                        
                        <div className="col-span-2 sm:col-span-8">
                            <label 
                                htmlFor="numberOfRefluxingPlates"
                                className="block text-sm font-medium text-white">
                                    {label} # of Refluxing Plates: {distillData.numberOfRefluxingPlates ?? 'No Data'}
                                    <br/> 
                                    New {label} # of Refluxing Plates:
                            </label>
                            <input 
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm input input-bordered w-full max-w-xs" 
                                type="number"
                                step="0.1"
                                min="0"
                                {...register('numberOfRefluxingPlates')}
                                defaultValue={distillData.numberOfRefluxingPlates ?? null}
                            />
                            </div>
                            
                            <div className="col-span-2 sm:col-span-8">
                            <label 
                                htmlFor="dephlegSetting"
                                className="block text-sm font-medium text-white">
                                    {label} Dephleg Setting: {distillData.dephlegSetting?? 'No Data'}
                                    <br/> 
                                    New {label} Dephleg Setting:
                            </label>
                            <input 
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm input input-bordered w-full max-w-xs" 
                                type="number"
                                step="0.1"
                                min="0"
                                {...register('dephlegSetting')}
                                defaultValue={distillData.dephlegSetting?? null}
                            />
                            </div>
                            
                            <div className="col-span-2 md:col-span-8">
                            <label 
                                htmlFor="headTemp"
                                className="block text-sm font-medium text-white">
                                    {label} Head Temp (˚F): {distillData.headTemp?? 'No Data'}
                                    <br/> 
                                    New {label} Head Temp (˚F):
                            </label>
                            <input 
                                className="mt-1 block w-full rounded-md border-gray-300 input input-bordered w-full max-w-xs" 
                                type="text"
                                {...register('headTemp')}
                                defaultValue={distillData.headTemp?? null}
                            />
                            </div>
                            
                            <div className="col-span-2 md:col-span-8">
                            <label 
                                htmlFor="potTemp"
                                className="block text-sm font-medium text-white">
                                    {label} Pot Temp (˚F): {distillData.potTemp?? 'No Data'}
                                    <br/> 
                                    New {label} Pot Temp (˚F):
                            </label>
                            <input 
                                className="mt-1 block w-full rounded-md border-gray-300 input input-bordered w-full max-w-xs" 
                                type="text"
                                {...register('potTemp')}
                                defaultValue={distillData? distillData.potTemp: null}
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

export default StillCutsFormEnd

