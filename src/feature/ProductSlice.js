

import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authservice } from "./ProductService";
import { toast } from "react-toastify";

export const Getproducts = createAsyncThunk(
    "auth/Get-products",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Get_products();
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );


  export const Getproduct = createAsyncThunk(
    "auth/Get-product",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Get_product();
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );

  export const Createproduct = createAsyncThunk(
    "auth/Create-product",
    async (data, thunkApi) => {
      try {
        const response = await authservice.Create_product(data);
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );
  export const Deleteproduct = createAsyncThunk(
    "auth/Delete-product",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Delete_product();
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );


  export const Updateproduct = createAsyncThunk(
    "auth/ Update-product",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Update_product();
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
      builder.addCase(Getproducts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Getproducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      });
      builder.addCase(Getproducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });

      builder.addCase(Getproduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Getproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      });
      builder.addCase(Getproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
      builder.addCase(Createproduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Createproduct.fulfilled, (state, action) => {//kol cas n5tarou chysir lena lfra9 bin redux w fetch
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Workout = action.payload;
        toast.success("product ajouté")
      });//hetha ki nmlou create yt3ba  chou 7aja o5ra howa 3ndna 3 cas pending w fulfilled w rejected w7da mzlt state f thniya w lo5ra erreur w lo5ra succes
      builder.addCase(Createproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });

      builder.addCase(Deleteproduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Deleteproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        toast.success("product suprimé")
      });
      builder.addCase(Deleteproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });

      builder.addCase(Updateproduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Updateproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        toast.success("product updated")
      });
      builder.addCase(Updateproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
    },
});



export default authSlice.reducer;
  