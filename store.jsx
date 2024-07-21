import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./src/slice/authSlice";
import instructorSlice from "./src/slice/instructorSlice";

const store = configureStore({
    reducer:{
        auth: authSlice,
        instructors: instructorSlice
    }
});

export default store
