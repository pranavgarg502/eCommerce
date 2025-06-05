import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//routes likhne ke baad we go to creating the slice and extraReducers and so we make AsyncThunk(s) backend ko call karne ke liye

const initialState = {
    productList :[],
    isLoading : false,
}
//this asyncThunk is like an action
export const addNewProduct = createAsyncThunk('/products/addNewProduct', 
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response?.data;
  }
);

export const fetchAllProduct = createAsyncThunk('/products/fetchAllProduct' , 
    async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/get`  , {

        }) 
        return response?.data;
    }

)
export const editProduct = createAsyncThunk('/products/editProduct' , 
    async({formData,id})=>{
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}` , formData , {
             headers: {
          "Content-Type": "application/json",
        }
        }) 
        return response?.data;
    }

)
export const deleteProduct = createAsyncThunk('/products/deleteProduct' , 
    async({id})=>{
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`) 
        return response?.data;
    }

)
const AdminProductSlice = createSlice({
    name : 'adminProducts',
    initialState,
    reducers : {
    },
    extraReducers : (builder) =>{
        builder
        .addCase(fetchAllProduct.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(fetchAllProduct.fulfilled , (state,action) => {
            state.isLoading = false;
            state.productList = action.payload.data;

        })
        .addCase(fetchAllProduct.rejected , (state,action) => {
            state.isLoading = false;
            state.productList = []
        })

    }
})
export default AdminProductSlice.reducer ;