import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import apiURL from "../../configAPI";

const axiosInstance = axios.create({
  baseURL: apiURL,
});

export const getInstructorData = createAsyncThunk(
  "get/instructor",
  async (_, { rejectWithValue }) => {
    const token = sessionStorage.getItem("userToken");
    console.log("token", token);
    try {
      const res = await axiosInstance.get("/instructor", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("instructor get data", res);
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

export const addInstructorData = createAsyncThunk(
  "add/instructor",
  async (payload, { rejectWithValue }) => {
    console.log("payload", payload);
    const token = sessionStorage.getItem("userToken");
    console.log("token", token);
    console.log(token);
    try {
      const res = await axiosInstance.post("/instructor/add", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("instructor add slice data", res);
      getInstructorData();
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

const instructorSlice = createSlice({
  name: "instructor",
  initialState: {
    isLoading: false,
    success: false,
    status: null,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Getting all the instructor data
      .addCase(getInstructorData.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.message = "";
      })
      .addCase(getInstructorData.fulfilled, (state, action) => {
        console.log("get instructor fulfilled", action.payload);
        state.isLoading = false;
        state.success = action.payload.data.data.success;
        state.message = action.payload.data.data.message;
      })
      .addCase(getInstructorData.rejected, (state, action) => {
        console.log("get instrucotr rejected payload", action.payload);
        state.isLoading = false;
        state.success = false;
        state.message = action.payload.data.message || "Unknown error occurred";
        toast.success(state.message,{
          autoClose: 3000,
          position: "bottom-right"
        })
      })
      .addCase(addInstructorData.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.message = "";
      })
      .addCase(addInstructorData.fulfilled, (state, action) => {
        console.log("add instructor fulfilled", action.payload);
        state.isLoading = false;
        state.success = action.payload.data.data.success;
        state.message = action.payload.data.data.message;
        toast.success(state.message,{
          autoClose: 3000,
          position: "bottom-right"
        })
      })
      .addCase(addInstructorData.rejected, (state, action) => {
        console.log("add instructor rejected payload", action.payload);
        state.isLoading = false;
        state.success = false;
        state.message = action.payload ? action.payload.data.message : "Unknown error occurred";
        toast.error(state.message,{
          autoClose: 3000,
          position: "bottom-right"
        })
      });
  },
});

export default instructorSlice.reducer;
