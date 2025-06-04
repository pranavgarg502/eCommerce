import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth-slice'
import AdminProductSlice from './admin/products-slice'
import ShoppingProductSlice from "./shop/products-slice";
import ShoppingCartSlice from "./shop/cart-slice";
import ShoppingAddressSlice from "./shop/address-slice";
import ShoppingOrderSlice from "./shop/order-slice";
import AdminOrderSlice from "./admin/order-slice";
import ShoppingSearchSlice from "./shop/search-slice";
import ShoppingReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./common-slice/feature";

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts: AdminProductSlice,
        shopProducts : ShoppingProductSlice,
        shopCart : ShoppingCartSlice,
        shopAddress : ShoppingAddressSlice,
        shopOrder : ShoppingOrderSlice,
        adminOrder : AdminOrderSlice,
        shopSearch : ShoppingSearchSlice,
        shopReview : ShoppingReviewSlice,
        commonFeature: commonFeatureSlice,


    }
})
export default store;
