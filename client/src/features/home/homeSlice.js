import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
    },
    reducers: {
        register: state => {

        }, 
        login: state => {

        },
        logout: state => {
            
        }
    }
})

export const { register, login, logout } = homeSlice.actions

export default homeSlice.reducer