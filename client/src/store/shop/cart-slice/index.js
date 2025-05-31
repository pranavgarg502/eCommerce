import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//routes likhne ke baad we go to creating the slice and extraReducers and so we make AsyncThunk(s) backend ko call karne ke liye

const initialState = {
    cartItems :[],
    isLoading : false,
}
//this asyncThunk is like an action

export const addToCart = createAsyncThunk('/cart/addToCart' , 
    async({userId,productId,quantity})=>{
        const response = await axios.post("http://localhost:5002/api/shop/cart/add" , {
            userId ,productId,quantity
        }
        ) 
        return response?.data;

    }

)
export const fetchCartItems = createAsyncThunk('/cart/fethCartItem' , 
    async(userId)=>{
        const response = await axios.get(`http://localhost:5002/api/shop/cart/get/${userId}` , {
        }
        ) 
        return response?.data;

    }

)
export const updateCartItem = createAsyncThunk('/cart/updateCartItem' , 
    async({userId,productId,quantity})=>{
        const response = await axios.put("http://localhost:5002/api/shop/cart/update-cart" , {
            userId ,productId,quantity
        }
        ) 
        return response?.data;

    }

)
export const deleteCartItem = createAsyncThunk('/cart/deleteCartItem' , 
    async({userId , productId})=>{
        const response = await axios.delete(`http://localhost:5002/api/shop/cart/delete/${userId}/${productId}` , {
        }
        ) 
        return response?.data;

    }

)

const ShoppingCartSlice = createSlice({
    name : 'shoppingCart',
    initialState,
    reducers : {
    },
    extraReducers : (builder) =>{
        builder
        .addCase(addToCart.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(addToCart.fulfilled , (state,action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;

        })
        .addCase(addToCart.rejected , (state,action) => {
            state.isLoading = false;
            state.cartItems = []
        })
        .addCase(fetchCartItems.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(fetchCartItems.fulfilled , (state,action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;

        })
        .addCase(fetchCartItems.rejected , (state,action) => {
            state.isLoading = false;
            state.cartItems = []
        })
        .addCase(updateCartItem.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(updateCartItem.fulfilled , (state,action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;

        })
        .addCase(updateCartItem.rejected , (state,action) => {
            state.isLoading = false;
            state.cartItems = []
        })
        .addCase(deleteCartItem.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteCartItem.fulfilled , (state,action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;

        })
        .addCase(deleteCartItem.rejected , (state,action) => {
            state.isLoading = false;
            state.cartItems = []
        })

    }
})
export default ShoppingCartSlice.reducer ;