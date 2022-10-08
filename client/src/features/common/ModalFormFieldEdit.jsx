import React from 'react';
import { useForm } from "react-hook-form";
import api from '../api';
import useAuth from '../api/useAuth';

const Form = ({ 
    formAction,
    reloadData,
    parentId,
    entryKey,
    label,
    currentValue,
    type,
    step,
    min,
    select,
    buttonLabel, 
    closeModal}) => {
    
    const { register, handleSubmit } = useForm();
    const { token } = useAuth();


    const onSubmit = async (data, e) => {
        const payload = {parentId, entryKey, data};
        await api[formAction](payload, token);
        reloadData();
        e.target.reset();
        closeModal();
    };

    const storedValue = !currentValue? 'No Data': type === 'date' ? 
        new Date(currentValue).toLocaleDateString(): currentValue;

    return (
        <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="px-1 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label 
                            htmlFor="data" 
                            className="block text-sm font-medium text-white">
                            Stored {label}: {storedValue} <br/> New {label}
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
                                min={min}
                                {...register('data')}
                                defaultValue={currentValue?? null}
                            />: type === 'select' ? (
                                <select 
                                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
                                  {...register('data')}
                                  defaultValue={currentValue?? null}>
                                  {select.map(val => (
                                    <option value={val.dbEntry}>{val.label}</option>
                                  ))}
                                </select>
                            ):<input 
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm"
                                type={type}
                                {...register('data')}
                                defaultValue={currentValue?? null}
                            />
                        }
                        <input className="btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm" type="submit" value={buttonLabel} />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
        
    )
}


const LogModal = ({ 
    formAction, 
    parentId,
    reloadData,
    formInputs, 
    modalId,
    instructions}) => {

    const closeModal = () => document.getElementById(modalId).checked = false;

    return (
        <>
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="max-h-screen overflow-y-scroll whitespace-normal">
                        <p>{instructions}</p>
                        {formInputs.map(el => <Form 
                            formAction={formAction}
                            parentId={parentId}
                            reloadData={reloadData} 
                            entryKey={el.entryKey}
                            label={el.label}
                            currentValue={el.currentValue}
                            type={el.type}
                            step={el.step}
                            min={el.min}
                            select={el.select}
                            buttonLabel={el.buttonLabel}
                            closeModal={closeModal}
                        />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogModal


