import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//routes likhne ke baad we go to creating the slice and extraReducers and so we make AsyncThunk(s) backend ko call karne ke liye

const initialState = {
    productList :[],
    isLoading : false,
    productDetails : null
}
//this asyncThunk is like an action

export const fetchAllFilteredProduct = createAsyncThunk('/products/fetchAllFilteredProduct' , 
    async({filterParams , sortParams})=>{
        const query = new URLSearchParams({
            ...filterParams , sortBy : sortParams
        })
        const response = await axios.get(`http://localhost:5002/api/shop/products/get?${query}`
        ) 
        return response?.data;

    }

)
export const fetchProductDetails = createAsyncThunk('/products/fetchProductDetails' , 
    async(id)=>{
        const response = await axios.get(`http://localhost:5002/api/shop/products/get/${id}`) 
        return response?.data;
    }

)

const ShoppingProductSlice = createSlice({
    name : 'shoppingProducts',
    initialState,
    reducers : {
    },
    extraReducers : (builder) =>{
        builder
        .addCase(fetchAllFilteredProduct.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(fetchAllFilteredProduct.fulfilled , (state,action) => {
            state.isLoading = false;
            state.productList = action.payload.data;

        })
        .addCase(fetchAllFilteredProduct.rejected , (state,action) => {
            state.isLoading = false;
            state.productList = []
        })
        .addCase(fetchProductDetails.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(fetchProductDetails.fulfilled , (state,action) => {
            state.isLoading = false;
            state.productDetails = action.payload.data;

        })
        .addCase(fetchProductDetails.rejected , (state,action) => {
            state.isLoading = false;
            state.productDetails = null;
        })

    }
})
export default ShoppingProductSlice.reducer ;