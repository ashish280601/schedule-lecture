import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import apiURL from "../../configAPI";

const axiosInstance = axios.create({
  baseURL: apiURL,
});

export const getCourseData = createAsyncThunk(
  "get/course",
  async (_, { rejectWithValue }) => {
    const token = sessionStorage.getItem("userToken");
    console.log("token", token);
    try {
      const res = await axiosInstance.get("/course", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("course get data", res);
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

export const addCourseData = createAsyncThunk(
    "add/course",
    async (payload, { rejectWithValue }) => {
      console.log("payload", payload);
      const token = sessionStorage.getItem("userToken");
      console.log("token", token);
  
      try {
        // Ensure payload is FormData when sending files
        const res = await axiosInstance.post("/course/add", payload, {
          headers: {
            "Content-Type": "multipart/form-data", // Adjust content type for form data
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("course add slice data", res);
        return res.data; // Return response data, not the whole response object
      } catch (error) {
        return rejectWithValue(
          error.response ? error.response.data : { message: error.message }
        );
      }
    }
  );

const CourseSlice = createSlice({
  name: "course",
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
      .addCase(getCourseData.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.message = "";
      })
      .addCase(getCourseData.fulfilled, (state, action) => {
        console.log("get course fulfilled", action.payload);
        state.isLoading = false;
        state.success = action.payload.data.data.success;
        state.message = action.payload.data.data.message;
      })
      .addCase(getCourseData.rejected, (state, action) => {
        console.log("get course rejected payload", action.payload);
        state.isLoading = false;
        state.success = false;
        state.message = action.payload.data.message || "Unknown error occurred";
        toast.success(state.message,{
          autoClose: 3000,
          position: "bottom-right"
        })
      })
      .addCase(addCourseData.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.message = "";
      })
      .addCase(addCourseData.fulfilled, (state, action) => {
        console.log("add course fulfilled", action.payload);
        state.isLoading = false;
        state.success = action.payload.data.success;
        state.message = action.payload.data.message;
        toast.success(state.message,{
          autoClose: 3000,
          position: "bottom-right"
        })
      })
      .addCase(addCourseData.rejected, (state, action) => {
        console.log("add course rejected payload", action.payload);
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

export default CourseSlice.reducer;
