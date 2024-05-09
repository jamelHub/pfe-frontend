

import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authservice } from "./Service";

export const CreeCart = createAsyncThunk(
    "auth/cree-cart",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Creecart(userData);
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );
  
  export const authSlice = createSlice({
    name: "auth",
    initialState: {
      
      user: [],
      isLoading: false,
      isSuccess: false,
      isError: false,
      message: "",
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(CreeCart.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(CreeCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      });
      builder.addCase(CreeCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "";
      });
    },
});

export default authSlice.reducer;
  