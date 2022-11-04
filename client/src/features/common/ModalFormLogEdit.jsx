import React from 'react';
import { useForm } from "react-hook-form";
import api from '../api';
import useAuth from '../api/useAuth';

const Form = ({ 
    formAction,
    reloadData,
    logId,
    parentId,
    logEntry,
    entryKey,
    label,
    type,
    step,
    min,
    closeModal, 
    description}) => {
    

    const { register, handleSubmit } = useForm();
    const { token } = useAuth();

    const editId = logEntry._id;

    const onSubmit = async (data, e) => {
        const payload = {parentId, editId, entryKey, logId, data};
        console.log(payload)
        await api[formAction](payload, token);
        reloadData();
        e.target.reset();
        closeModal();
    };

    const storedValue = !logEntry[entryKey]? 'No Data': type === 'date' ? 
        new Date(logEntry[entryKey]).toLocaleDateString(): logEntry[entryKey];

    return (
        <div className="mt-5 md:col-span-2 md:mt-0" key={`${entryKey}${logId}`}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="px-1 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label 
                            htmlFor="data" 
                            className="block text-sm font-medium">
                            Stored {label} {storedValue} <br/> New {label}
                        </label>
                        <label 
                            htmlFor="data" 
                            className="block text-sm font-medium">
                            
                        </label>
                        {
                            type === 'number' ? 
                            <input 
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm input bg-white" 
                                type={type} 
                                step={step}
                                min={min}
                                {...register("data")}
                            />: 
                            <input 
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm input bg-white"
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


const LogModal = ({ 
    formAction, 
    parentId,
    logId,
    logEntry, 
    logEntryId,
    reloadData, 
    formInputs, 
    showModal, 
    modalId,
    description}) => {

    const closeModal = () => document.getElementById(modalId).checked = false;

    return (
        <>
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative whitespace-normal">
                    <label htmlFor={modalId} className="btn btn-sm btn-circle btn-outline absolute right-2 top-2">✕</label>
                    <p>{description}</p>
                    {showModal &&  <div className="max-h-screen overflow-y-scroll">
                        {formInputs.map(el => <Form 
                            formAction={formAction}
                            parentId={parentId}
                            logId={logId}
                            logEntry={logEntry} 
                            logEntryId={logEntryId} 
                            reloadData={reloadData} 
                            entryKey={el.entryKey}
                            key={el.entryKey}
                            label={el.label}
                            type={el.type}
                            step={el.step}
                            min={el.min}
                            closeModal={closeModal}
                            description={description}
                        />)}
                    </div>}
                </div>
            </div>
        </>
    )
}

export default LogModal


