

import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authservice } from "./DepartementService";
import { toast } from "react-toastify";

export const Getdepartements = createAsyncThunk(
    "auth/Get-departements",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Get_departements();
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );


  export const Getdepartement= createAsyncThunk(
    "auth/Get-departement",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Get_departement();
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );

  export const Createdepartement = createAsyncThunk(
    "auth/Create-departement",
    async (data, thunkApi) => {
      try {
        const response = await authservice.Create_departement(data);
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );
  export const Deletedepartement = createAsyncThunk(
    "auth/Delete-product",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Delete_departement();
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );


  export const Updatedepartement = createAsyncThunk(
    "auth/ Update-departement",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Update_departement();
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
      builder.addCase(Getdepartements.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Getdepartements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      });
      builder.addCase(Getdepartements.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });

      builder.addCase(Getdepartement.pending, (state) => {
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
      builder.addCase(Getdepartement.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
      builder.addCase(Createdepartement.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Createdepartement.fulfilled, (state, action) => {//kol cas n5tarou chysir lena lfra9 bin redux w fetch
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Workout = action.payload;
        toast.success("departement ajouté")
      });//hetha ki nmlou create yt3ba  chou 7aja o5ra howa 3ndna 3 cas pending w fulfilled w rejected w7da mzlt state f thniya w lo5ra erreur w lo5ra succes
      builder.addCase(Createdepartement.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });

      builder.addCase(Deletedepartement.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Deletedepartement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        toast.success("departement suprimé")
      });
      builder.addCase(Deletedepartement.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });

      builder.addCase(Updatedepartement.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Updatedepartement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        toast.success("departement updated")
      });
      builder.addCase(Updatedepartement.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
    },
});



export default authSlice.reducer;
  