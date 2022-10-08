import React from 'react'
import { useForm } from "react-hook-form";
import api from '../api'
import useAuth from '../api/useAuth';


//generic label & input component that takes an entry type, default value, label, dbModelKey
//generic form component that generates a map of the generic label & input components out of an array of variables.

//buttonLabel 
//formEntries = [{label, dbKey, type, step(opt), default, select(arr[{dbEntry: , label: }])}]
//id is of id we're editing?
//log is the db we're editing?

const FormElement = ({ id, log, reloadData, formAction, buttonLabel, formEntries, closeModal }) => {
    
    const { register, handleSubmit, reset } = useForm();
    const { token } = useAuth();



    const onSubmit = async (data, e) => {
        const payload = {id, data, log};
        console.log(payload)
        await api[formAction](payload, token);
        reloadData();
        e.target.reset();
        closeModal();
    };

    return (
      <>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="px-1 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      {formEntries.map(entry => (
                        <div className="col-span-6">
                          <label 
                              htmlFor={entry.dbKey} 
                              className="block text-sm font-medium text-white">
                              {entry.label}
                          </label>
                          {
                              entry.type === 'number' ? 
                              (<input 
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm input w-full bg-white" 
                                  type={entry.type} 
                                  step={entry.step}
                                  min={entry.min}
                                  max={entry.max}
                                  defaultValue={entry.default ?? null}
                                  {...register(entry.dbKey)}
                              />): entry.type === 'select' ? 
                              (
                                <select 
                                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm input w-full bg-white" 
                                  {...register(entry.dbKey)}
                                  defaultValue={entry.default? entry.default: null}>
                                  {entry.select.map(val => (
                                    <option value={val.dbEntry}>{val.label}</option>
                                  ))}
                                </select>
                              ):
                              (<input 
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm input w-full bg-white"
                                  type={entry.type}
                                  defaultValue={entry.default? entry.default: null}
                                  {...register(entry.dbKey)}
                              />)
                          }
                        </div>
                      ))}
                      <div className="col-span-6">
                        <input className="btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm" type="submit" value={buttonLabel} />
                        <input
                            className="btn btn-ghost mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm"
                            type="button"
                            onClick={() => reset()}
                            value="Reset"
                        />
                      </div>
                  </div>
                  </div>
                </div>
              </form>
            </div>
      </>
    )
}

export default FormElement
