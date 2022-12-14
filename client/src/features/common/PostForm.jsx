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

const PostForm = ({ reloadData, formAction, buttonLabel, formEntries, instructions }) => {
    
    const { register, handleSubmit, reset } = useForm();

    const { token } = useAuth();

    const onSubmit = async (data, e) => {
      try {
        //const payload = {data, checklist}
        console.log(data)
        await api[formAction](data, token);
        reloadData();
        e.target.reset();
      } catch (error) {
        console.log(error.response.data)
      }
    };

    return (
        <>
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6 bg-base-100">
            <div className="md:col-span-1">
              <div className="px-4 py-5">
                <p className="mt-1 text-sm">{instructions}</p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      {formEntries.map(entry => (
                        <div 
                        key={entry.dbKey} className="col-span-6 sm:col-span-3">
                          <label 
                              htmlFor={entry.dbKey} 
                              className="block text-sm font-medium text-gray-700">
                              {entry.label}
                          </label>
                          {
                              entry.type === 'number' ? 
                              (<input 
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm input w-full bg-white" 
                                  type={entry.type} 
                                  step={entry.step}
                                  defaultValue={entry.default? entry.default: null}
                                  {...register(entry.dbKey)}
                              />): entry.type === 'select' ? 
                              (
                                <select 
                                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm sm:text-sm select select-bordered w-full bg-white" 
                                  {...register(entry.dbKey)}
                                  defaultValue={entry.default? entry.default: null}>
                                  {entry.select.map(val => (
                                    <option key={val.dbEntry} value={val.dbEntry}>{val.label}</option>
                                  ))}
                                </select>
                              ): entry.type === 'select multiple' ? 
                              (
                                <select 
                                  multiple
                                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm sm:text-sm select select-bordered w-full bg-white" 
                                  {...register(entry.dbKey)}
                                  defaultValue={entry.default? entry.default: null}>
                                  {entry.select.map(val => (
                                    <option key={val.dbEntry} value={val.dbEntry}>{val.label}</option>
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

                      <div className="col-span-6 sm:col-span-6 text-right">
                        <input
                            className="btn btn-ghost mt-2"
                            type="button"
                            onClick={() => reset()}
                            value="Reset"
                        />
                        <input className="btn mt-2 ml-5" type="submit" value={buttonLabel} />
                      </div>
                  </div>
                  </div>
                </div>
              </form>
              </div>
              </div>
            </div>
            </>
        
    )
}

export default PostForm
