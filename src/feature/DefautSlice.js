

import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authservice } from "./DefautService";
import { toast } from "react-toastify";

export const Getdefauts = createAsyncThunk(
    "auth/Get-defauts",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Get_defauts();
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );


  export const Getdefaut = createAsyncThunk(
    "auth/Get-defaut",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Get_defaut();
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );

  export const Createdefaut = createAsyncThunk(
    "auth/Create-defaut",
    async (data, thunkApi) => {
      try {
        const response = await authservice.Create_defaut(data);
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );
  export const Deletedefaut = createAsyncThunk(
    "auth/Delete-defaut",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Delete_defaut();
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );


  export const Updatedefaut = createAsyncThunk(
    "auth/ Update-defaut",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Update_defaut();
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
      builder.addCase(Getdefauts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Getdefauts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      });
      builder.addCase(Getdefauts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });

      builder.addCase(Getdefaut.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Getdefaut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      });
      builder.addCase(Getdefaut.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
      builder.addCase(Createdefaut.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Createdefaut.fulfilled, (state, action) => {//kol cas n5tarou chysir lena lfra9 bin redux w fetch
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Workout = action.payload;
        toast.success("defaut ajouté")
      });//hetha ki nmlou create yt3ba  chou 7aja o5ra howa 3ndna 3 cas pending w fulfilled w rejected w7da mzlt state f thniya w lo5ra erreur w lo5ra succes
      builder.addCase(Createdefaut.rejected, (state, action) => {
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
        toast.success("defaut suprimé")
      });
      builder.addCase(Deletedefaut.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });

      builder.addCase(Updatedefaut.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Updatedefaut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        toast.success("defaut updated")
      });
      builder.addCase(Updatedefaut.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
    },
});



export default authSlice.reducer;
  