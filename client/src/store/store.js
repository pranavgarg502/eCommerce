import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth-slice'
import AdminProductSlice from './admin/products-slice'
import ShoppingProductSlice from "./shop/products-slice";
import ShoppingCartSlice from "./shop/cart-slice";

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts: AdminProductSlice,
        shopProducts : ShoppingProductSlice,
        shopCart : ShoppingCartSlice

    }
})
export default store;
