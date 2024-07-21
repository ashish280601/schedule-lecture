import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./src/slice/authSlice";
import instructorSlice from "./src/slice/instructorSlice";
import CourseSlice from "./src/slice/courseSlice";
import LectureSlice from "./src/slice/lectureSlice";

const store = configureStore({
    reducer:{
        auth: authSlice,
        instructors: instructorSlice,
        course: CourseSlice,
        lecture: LectureSlice,
    }
});

export default store
