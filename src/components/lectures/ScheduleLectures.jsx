import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCourseData } from "../../slice/courseSlice";
import { getInstructorData } from "../../slice/instructorSlice";
import { scheduleLecture, getScheduleData } from "../../slice/lectureSlice";
import { useSelector } from "react-redux";

function ScheduleLecture() {
    const [inputData, setInputData] = useState({});
    const [scheduleLectureData, setScheduleLectureData] = useState(null);
    const [courseList, setCourseList] = useState(null);
    const [instructorData, setInstructorData] = useState(null);
    const { role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    console.log("student data change", inputData);

    const fetchCoursesData = () => {
        dispatch(getCourseData({}))
            .then((res) => {
                console.log(res);
                const { allCourseList } = res.payload.data.data;
                console.log(allCourseList);
                setCourseList(allCourseList);
            })
            .catch((error) => {
                console.log(error);
                throw Error;
            });
    };

    const fetchInstructorData = () => {
        dispatch(getInstructorData({}))
            .then((res) => {
                console.log(res);
                const { allInstructors } = res.payload.data.data;
                console.log(allInstructors);
                setInstructorData(allInstructors);
            })
            .catch((error) => {
                console.log(error);
                throw Error;
            });
    };

    const fetchScheduleData = () => {
        dispatch(getScheduleData({}))
            .then((res) => {
                console.log(res);
                const { lectures } = res.payload.data.data;
                console.log(lectures);
                setScheduleLectureData(lectures);
            })
            .catch((error) => {
                console.log(error);
                throw Error;
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // write your code logic here.
            const res = await dispatch(scheduleLecture
                (inputData));
            console.log("res data from student component", res);
            if (res.payload.success) {
                fetchScheduleData();
                setInputData({});
                return;
            }
        } catch (error) {
            console.error("error while adding student data", error);
        }
    };

    useEffect(() => {
        fetchCoursesData();
        fetchInstructorData();
        fetchScheduleData();
    }, []);

    console.log("scheduleLectureData", scheduleLectureData);
    console.log("courselist", courseList);
    return (
        <section className="studs_sec">
            <div className="container">
                {
                    role === "admin" ? (
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form_box">
                                    <form action="post" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="input_box">
                                                    <div className="form-group">
                                                        <label>Lecture Date</label>
                                                        <input
                                                            type="date"
                                                            name="date"
                                                            className="form-control"
                                                            value={inputData?.date || ""}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="input_box">
                                                    <div className="form-group">
                                                        <label>Lecture Start Time</label>
                                                        <input
                                                            type="time"
                                                            name="startTime"
                                                            className="form-control"
                                                            value={inputData?.startTime || ""}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="input_box">
                                                    <div className="form-group">
                                                        <label>Lecture End Time</label>
                                                        <input
                                                            type="time"
                                                            name="endTime"
                                                            className="form-control"
                                                            value={inputData?.endTime || ""}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="input_box">
                                                    <div className="form-group">
                                                        <label>List Of Course</label>
                                                        <select
                                                            name="course"
                                                            className="form-control"
                                                            value={inputData?.course || ""}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="---Select---">--Select--</option>
                                                            {
                                                                courseList?.map((course, id) => (
                                                                    <option key={id} value={course._id}>{course.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="input_box">
                                                    <div className="form-group">
                                                        <label>List Of Instructor</label>
                                                        <select
                                                            name="instructor"
                                                            className="form-control"
                                                            value={inputData?.instructor || ""}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="---Select---">--Select--</option>
                                                            {
                                                                instructorData?.map((instrucor, id) => (
                                                                    <option key={id} value={instrucor._id}>{instrucor.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="">
                                                    <button className="btn btn-outline-success">
                                                        Add Lecture
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ) : (null)
                }
                <div className="row">
                    <div className="col-md-12">
                        <div className="table_box">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Schedule Date</th>
                                        <th>Day</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Coure Name</th>
                                        <th>Instructor Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scheduleLectureData?.map((data, idx) => (
                                        <tr key={idx}>
                                            <td>{data?.date?.slice(0, 10) || ""}</td>
                                            <td>{data?.startTime?.slice(0, 8) || ""}</td>
                                            <td>{data?.startTime?.slice(15, 21) || ""}</td>
                                            <td>{data?.endTime?.slice(15, 21) || ""}</td>
                                            <td>{data?.courseDetails?.name || ""}</td>
                                            <td>{data?.instructorDetails?.name || ""}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ScheduleLecture;
