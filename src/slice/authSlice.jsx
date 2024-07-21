import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURL from "../../configAPI";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: apiURL
})

export const loginUser = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/user/login", payload);
      console.log("login response", res);
      return res;
    } catch (error) {
      console.log("error from login", error);
      // rejectWithValue is used to handle the rejected promise error
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isTogglePassword: false,
    token: sessionStorage.getItem("userToken") || null,
    success: false,
    status: sessionStorage.getItem("status") || null,
    message: "",
  },
  reducers: {
    // it is used to manage the synchronous data
    togglePasswordVisibility: (state, action) => {
      state.isTogglePassword = !state.isTogglePassword;
    },
  },
  extraReducers: (builder) => {
    // extra reducers is used to handle asynchronous data
    builder
      // Login add case function
      .addCase(loginUser.pending, (state, action) => {
        console.log("login pending action payload", action.payload);
        state.isLoading = true;
        state.message = "";
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("login fulfilled", action.payload);
        state.isLoading = false;
        state.success = action.payload.data.data.status;
        state.message = action.payload.data.data.message;
        // state.token = action.payload.data.data.token
        sessionStorage.setItem("userToken", action.payload.data.data.token);
        sessionStorage.setItem("status", action.payload.data.data.status);
        // Update state with new token and status
        state.token = action.payload.data.data.token;
        state.status = action.payload.data.data.status;
        console.log("token...........", state.token);
        console.log("status.........", state.status);
        console.log(token);
        toast.success(state.message, {
          autoClose: 3000,
          position: "bottom-right"
        })
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Login Rejected payload", action.payload);
        state.isLoading = false;
        state.success = action.payload.status;
        state.message = action.payload
          ? action.payload.message
          : "Unknown error occurred";
        toast.error(state.message, {
          autoClose: 3000,
          position: "bottom-right"
        })
      });
  },
});

// exporting auth action
export const { token } = authSlice.actions;
// exporting the authslice reducer to the store
export default authSlice.reducer;
