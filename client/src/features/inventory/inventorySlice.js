import { createSlice } from '@reduxjs/toolkit';

export const inventorySlice = createSlice({
    name: 'home',
    initialState: {
    },
    reducers: {
        getInventory: state => {

        }, 
    }
})

export const { getInventory } = inventorySlice.actions

export default inventorySlice.reducer

//export const getRawMaterials = () => api.get('/rawMaterials');