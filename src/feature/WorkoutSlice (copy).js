

import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authservice } from "./WorkoutService";

export const Getworkouts = createAsyncThunk(
    "auth/Get-workouts",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Get_workouts();
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err); 
      }
    }
  );


  export const Getworkout = createAsyncThunk(
    "auth/Get-workout",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Get_workout();
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );
//f contact get hachetna ok
  export const CreateWorkout = createAsyncThunk(
    "auth/Create-Workout",
    async (data, thunkApi) => {
      try {
        const response = await authservice.Create_workout(data);
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );
  export const Deleteworkout = createAsyncThunk(
    "auth/Delete-workout",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Delete_workout();
        return response;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );


  export const Updateworkout = createAsyncThunk(
    "auth/ Update-workout",
    async (userData, thunkApi) => {
      try {
        const response = await authservice.Update_workout();
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
      builder.addCase(Getworkouts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Getworkouts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        

      });//tst3ml fi design wela 7aja djib mnhom f button wjaw adheka? ey bibiliotheque chsha 
      builder.addCase(Getworkouts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });

      builder.addCase(Getworkout.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Getworkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Aworkout = action.payload;//unique ylzmou f lkol mta3 action ? oui bch fl get tst3mlha wadhah mregl khaw njam nmchi y3ni ey aychek wlh samahnyy khdhet men waqtekk bn8 3ady binantnech ala khir  merci
      });
      builder.addCase(Getworkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
      builder.addCase(CreateWorkout.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(CreateWorkout.fulfilled, (state, action) => {//kol cas n5tarou chysir lena lfra9 bin redux w fetch
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Workout = action.payload;
      });//hetha ki nmlou create yt3ba  chou 7aja o5ra howa 3ndna 3 cas pending w fulfilled w rejected w7da mzlt state f thniya w lo5ra erreur w lo5ra succes
      builder.addCase(CreateWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });

      builder.addCase(Deleteworkout.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Deleteworkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.del_user = action.payload;
      });
      builder.addCase(Deleteworkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });

      builder.addCase(Updateworkout.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
      builder.addCase(Updateworkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Udate_user = action.payload;
      });
      builder.addCase(Updateworkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
    },
});



export default authSlice.reducer;
  