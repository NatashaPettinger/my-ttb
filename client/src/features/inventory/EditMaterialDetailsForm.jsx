import React from 'react'
import { useForm } from "react-hook-form";
import api from '../api'
import useAuth from '../api/useAuth';


const EditMaterialDetailsForm = ({ row, reloadData }) => {
    const { register, handleSubmit, reset } = useForm();
    const { token } = useAuth();
    // or you can set up the defaultValues at useForm
    // const { register, handleSubmit } = useForm({
    //   defaultValues,
    // });
    const onSubmit = async (data, e) => {
        const payload = {
            id: row._id,
            data: data,
        }
        await api.editRawMaterials(payload, token)
        reloadData();
        e.target.reset();
    };

    return (
        <div>
            <div className='width-1/2 sm:width-1/2'>
            <form className="grid grid-cols-4 gap-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-span-4 sm:col-span-1">
                        <label className="block text-sm font-medium text-white" htmlFor="materialType">Material Type:</label>
                        <select 
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
                            {...register("materialType")} 
                            defaultValue={row.materialType}>
                            <option value={'yeast'}>Yeast</option>
                            <option value={'grain'}>Grain</option>
                            <option value={'nutrient'}>Nutrient</option>
                            <option value={'enzyme'}>Enzyme</option>
                            <option value={'cleaning product'}>Cleaning Product</option>
                            <option value={'pH adjustment'}>pH Correction</option>
                            <option value={'packaging'}>Packaging Supply</option>
                            <option value={'misc'}>Misc.</option>
                        </select>
                </div>
                <div className="col-span-4 sm:col-span-1">
                        <label className="block text-sm font-medium text-white" htmlFor="name" >Material Name:</label>
                        <input 
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
                            {...register("name")}
                        />
                </div>
                <div className="col-span-4 sm:col-span-1">
                        <label className="block text-sm font-medium text-white" htmlFor="uom">UOM:</label>
                        <select 
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
                            {...register("uom")}
                            defaultValue={row.uom}>
                            <option value={'mg'}>mg</option>
                            <option value={'g'}>g</option>
                            <option value={'kg'}>kg</option>
                            <option value={'mL'}>mL</option>
                            <option value={'L'}>L</option>
                            <option value={'oz'}>oz</option>
                            <option value={'lb'}>lb</option>
                            <option value={'qt'}>qt</option>
                            <option value={'gal'}>gal</option>
                            <option value={'tons'}>tons</option>
                            <option value={'ea'}>ea</option>
                        </select>
                </div>
                <div className="col-span-4 sm:col-span-1">
                        <label className="block text-sm font-medium text-white" htmlFor="reorderQuantity">Reorder Quantity (UOM):</label>
                        <input 
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
                            {...register("reorderQuantity")}
                        />
                </div>
                <div className="col-span-4 sm:col-span-1">
                    <input
                        className="btn btn-ghost mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
                        type="button"
                        onClick={() => reset()}
                        value="Reset"
                    />
                </div>
                <div className="col-span-4 sm:col-span-1">
                    <input 
                        className="btn mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
                        type="submit" 
                        value="Edit Details" />
                </div>


                
            </form>
                
                </div>
        </div>
    )

}
    
export default EditMaterialDetailsForm

