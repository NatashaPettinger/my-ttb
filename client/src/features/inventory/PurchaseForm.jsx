import React from 'react'
import { useForm } from "react-hook-form";
import api from '../api'

const PurchaseForm = ({ row, reloadData }) => {
    const { register, handleSubmit, reset } = useForm();
    // or you can set up the defaultValues at useForm
    // const { register, handleSubmit } = useForm({
    //   defaultValues,
    // });
    const onSubmit = async (data, e) => {
        const payload = {
            id: row._id,
            data: data,
        }
        console.log(payload)
        await api.receiveRawMaterials(payload)
        reloadData()
        e.target.reset();
        document.getElementById('purchaseLogForm').checked = false;
    };

    return (
        <>

        <input type="checkbox" id="purchaseLogForm" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative whitespace-normal">
            <label htmlFor="purchaseLogForm" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <p>Add Purchase of {row.name}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                        <label 
                            htmlFor="quantity"
                            className="block text-sm font-medium text-white">
                            Number of Packages:</label>
                        <input 
                            type="number"
                            step="0.1"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm"
                            {...register("quantity")}
                        />
                    </div>
                    <div className="col-span-6">
                        <label 
                            htmlFor="packageSize"
                            className="block text-sm font-medium text-white">
                            Package Size ({row.uom}): </label>
                        <input 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm"
                            type="number"
                            step="0.1"
                            defaultValue={row.purchaseLog[0].packageSize}
                            {...register("packageSize")}
                        />
                    </div>
                    <div className="col-span-6">
                        <label 
                            htmlFor="costPerPackage"
                            className="block text-sm font-medium text-white">
                            Cost per Package (USD): </label>
                        <input 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm"
                            type="number"
                            step="0.01"
                            defaultValue={row.purchaseLog[0].costPerPackage}
                            {...register("costPerPackage")}
                        />
                    </div>
                    <div className="col-span-6">
                        <label 
                            htmlFor="extraCharges"
                            className="block text-sm font-medium text-white">
                            Other Charges (USD): Freight, delivery, tax, etc. </label>
                        <input 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm"
                            type="number"
                            step="0.01"
                            {...register("extraCharges")}
                        />
                    </div>
                    <div className="col-span-6">
                        <label 
                            htmlFor="purchaseDate"
                            className="block text-sm font-medium text-white">
                            Purchase Date: </label>
                        <input 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm"
                            type="date"
                            {...register("purchaseDate")}
                        />
                    </div>
                    <div className="col-span-6">
                        <label 
                            htmlFor="dateReceived"
                            className="block text-sm font-medium text-white">
                            Date Received: </label>
                        <input 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm"
                            type="date"
                            {...register("dateReceived")}
                        />
                    </div>
                    <div className="col-span-6">
                        <label 
                            htmlFor="vendor"
                            className="block text-sm font-medium text-white">
                            Vendor: </label>
                    </div>
                    <div className="col-span-6">
                        <input 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-base-500 focus:ring-base-500 sm:text-sm"
                            type="text"
                            defaultValue={row.purchaseLog[0].vendor}
                            {...register("vendor")}
                        />
                    </div>
                    <div className="col-span-6">
                        <input className="btn" type="submit" value="Record New Purchase" />
                        <input
                            className="btn btn-ghost ml-2" 
                            type="button"
                            onClick={() => reset()}
                            value="Reset"
                        />
                    </div> 
                </div>
            </form>
            </div>
        </div>
        </>
    )

}
    
export default PurchaseForm

