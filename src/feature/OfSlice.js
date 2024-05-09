

import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authservice } from ".OfService";
import { toast } from "react-toastify";

export const Getofs = createAsyncThunk(
    "auth/Get-ofs",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Get_ofs();
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );


  export const Getof = createAsyncThunk(
    "auth/Get-of",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Get_of();
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );

  export const Createof = createAsyncThunk(
    "auth/Create-of",
    async (data, thunkApi) => {
      try {
        const response = await authservice.Create_of(data);
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );
  export const Deleteof = createAsyncThunk(
    "auth/Delete-of",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Delete_of();
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );


  export const Updateof = createAsyncThunk(
    "auth/ Update-product",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Update_of();
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
      builder.addCase(Getofs.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Getofs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      });
      builder.addCase(Getofs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });

      builder.addCase(Getof.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Getof.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      });
      builder.addCase(Getof.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
      builder.addCase(Createof.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Createof.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Workout = action.payload;
        toast.success("of ajouté")
      });
      builder.addCase(Createof.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });

      builder.addCase(Deleteof.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Deleteof.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        toast.success("Of suprimé")
      });
      builder.addCase(Deleteof.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });

      builder.addCase(Updateof.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Updateof.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        toast.success("of updated")
      });
      builder.addCase(Updateof.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
    },
});



export default authSlice.reducer;
  