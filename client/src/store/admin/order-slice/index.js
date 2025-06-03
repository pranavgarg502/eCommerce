import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//routes likhne ke baad we go to creating the slice and extraReducers and so we make AsyncThunk(s) backend ko call karne ke liye

const initialState = {
    isLoading : false,
    orderList:[],
    orderDetails : null
}
//this asyncThunk is like an action
export const getAllOrdersByAllUsers = createAsyncThunk('/order/getAllOrdersByAllUsers' , 
    async()=>{
        const response = await axios.get(`http://localhost:5002/api/admin/orders/get`) 
        return response?.data;
    }

)
export const getOrderDetails= createAsyncThunk('/order/getOrderDetailsForAdmin' , 
    async(id)=>{
        const response = await axios.get(`http://localhost:5002/api/admin/orders/details/${id}`) 
        return response?.data;
    }

)
export const updateOrderDetails= createAsyncThunk('/order/updateOrderDetailsForAdmin' , 
    async({id , orderStatus})=>{
        const response = await axios.put(`http://localhost:5002/api/admin/orders/update/${id}` , {orderStatus}) 
        return response?.data;
    }

)
const AdminOrderSlice = createSlice({
    name : 'adminOrder',
    initialState,
    reducers : {
        resetOrderDetails : (state)=>{
            state.orderDetails = null
        }
    },
    extraReducers : (builder) =>{
        builder
        .addCase(getAllOrdersByAllUsers.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllOrdersByAllUsers.fulfilled , (state,action) => {
            state.isLoading = false;
            state.orderList = action.payload.data;

        })
        .addCase(getAllOrdersByAllUsers.rejected , (state,action) => {
            state.isLoading = false;
            state.orderList = []
        })
        .addCase(getOrderDetails.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(getOrderDetails.fulfilled , (state,action) => {
            state.isLoading = false;
            state.orderDetails= action.payload.data;

        })
        .addCase(getOrderDetails.rejected , (state,action) => {
            state.isLoading = false;
            state.orderDetails = null
        })


       

    }
})
export const {resetOrderDetails} = AdminOrderSlice.actions;
export default AdminOrderSlice.reducer ;