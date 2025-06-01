import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//routes likhne ke baad we go to creating the slice and extraReducers and so we make AsyncThunk(s) backend ko call karne ke liye

const initialState = {
    addressList :[],
    isLoading : false,
}
//this asyncThunk is like an action

export const addAddress = createAsyncThunk('/address/addAddress' , 
    async(formData)=>{
        const response = await axios.post(`http://localhost:5002/api/shop/address/add`,formData
        ) 
        return response?.data;

    }

)
export const fetchAllAddresses = createAsyncThunk('/address/fetchAllAddresses' , 
    async(userId)=>{
        const response = await axios.get(`http://localhost:5002/api/shop/address/get/${userId}`) 
        return response?.data;
    }

)
export const editaAddress = createAsyncThunk('/address/editaAddress' , 
    async({userId , addressId , formData})=>{
        const response = await axios.put(`http://localhost:5002/api/shop/address/update/${userId}/${addressId}` , formData) 
        return response?.data;
    }

)
export const deleteAddress = createAsyncThunk('/address/deleteAddress' , 
    async({userId , addressId})=>{
        const response = await axios.delete(`http://localhost:5002/api/shop/address/delete/${userId}/${addressId}`) 
        return response?.data;
    }

)
const addressSlice = createSlice({
    name : 'address',
    initialState,
    reducers : {
    },
    extraReducers : (builder) =>{
        builder
        .addCase(addAddress.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(addAddress.fulfilled , (state,action) => {
            state.isLoading = false;

        })
        .addCase(addAddress.rejected , (state,action) => {
            state.isLoading = false;
        })
        .addCase(fetchAllAddresses.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(fetchAllAddresses.fulfilled , (state,action) => {
            state.isLoading = false;
            state.addressList = action.payload.data;

        })
        .addCase(fetchAllAddresses.rejected , (state,action) => {
            state.isLoading = false;
            state.addressList = [];
        })


    }
})

export default addressSlice.reducer ;