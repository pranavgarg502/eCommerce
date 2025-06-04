import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews : [],
};

export const addReview = createAsyncThunk(
  "/review/addReview",
  async (data) => {
    const response = await axios.post(
      `http://localhost:5002/api/shop/review/add`,data
    );

    return response.data;
  }
);
export const getAllReviews = createAsyncThunk(
  "/review/getAllReviews",
  async (productId) => {
    const response = await axios.get(
      `http://localhost:5002/api/shop/review/get/${productId}`
    );

    return response.data;
  }
);

const ProductReviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getAllReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      })
  },
});


export default ProductReviewSlice.reducer;