import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./src/slice/authSlice";

const store = configureStore({
    reducer:{
        auth: authSlice 
    }
});

export default store
