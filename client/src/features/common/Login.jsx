import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import api from '../api'

const Login = () => {

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data, e) => {
        const res = await api.login(data);
        e.target.reset();
        navigate('/raw-materials')
    };


    return (
        <>
            <input type="checkbox" id="loginModal" className="modal-toggle" />
            <label htmlFor="loginModal" className="modal cursor-pointer">
            <label className="modal-box relative" >
                <div className="px-1 py-5 sm:p-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            type="password"
                            {...register("password")}/>
                        </div>
                        <div className="mt-8 mb-3">
                        <input className="btn block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm" type="submit" value="Log in" />
                        </div>
                    </form>
                </div>
            </label>
            </label>
        </>
    )
}

export default Login