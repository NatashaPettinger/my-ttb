import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import api from '../api'

const Register = () => {

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data, e) => {
        await api.register(data);
        e.target.reset();
        navigate('/raw-materials')
    };


    return (
        <>
            <input type="checkbox" id="registerModal" className="modal-toggle" />
            <label htmlFor="registerModal" className="modal cursor-pointer">
            <label className="modal-box relative" >
                <div className="px-1 py-5 sm:p-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-3 mb-3">
                        <label 
                            htmlFor="userName"
                            className="block text-sm font-medium text-white">
                            Name
                        </label>
                        <input 
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm input w-full bg-white mt-2"
                            type="text"
                            {...register("userName")}/>
                        </div>
                        <div className="mt-3 mb-3">
                        <label 
                            htmlFor="email"
                            className="block text-sm font-medium text-white">
                            Email
                        </label>
                        <input 
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm input w-full bg-white mt-2"
                            type="text"
                            {...register("email")}/>
                        </div>
                        <div className="mt-3 mb-3">
                        <label 
                            htmlFor="password"
                            className="block text-sm font-medium text-white">
                            Password
                        </label>
                        <input 
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm input w-full bg-white mt-2"
                            type="text"
                            {...register("password")}/>
                        </div>
                        <div className="mt-8 mb-3">
                        <input className="btn block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm" type="submit" value="Register" />
                        </div>
                    </form>
                </div>
            </label>
            </label>
        </>
    )
}

export default Register