import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCourseData, getCourseData } from "../../slice/courseSlice";

function Courses() {
    const [inputData, setInputData] = useState({
        name: '',
        level: '',
        description: '',
        imageFile: null,
    });
    const [studentData, setStudentData] = useState(null);
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
                setStudentData(allCourseList);
            })
            .catch((error) => {
                console.log(error);
                throw Error;
            });
    };

    // Handle change in file input
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setInputData((prevData) => ({
            ...prevData,
            imageFile: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new FormData object
        const formData = new FormData();
        formData.append('name', inputData.name);
        formData.append('level', inputData.level);
        formData.append('description', inputData.description);
        if (inputData.imageFile) {
            formData.append('image', inputData.imageFile);
        }

        try {
            // Dispatch the thunk with FormData
            const res = await dispatch(addCourseData(formData));
            console.log('Response from server:', res);

            if (res.payload.data.success) {
                // Clear form inputs if the course was added successfully
                fetchCoursesData();
                setInputData({
                    name: '',
                    level: '',
                    description: '',
                    imageFile: null,
                });
            }
        } catch (error) {
            console.error('Error while adding course data', error);
        }
    };
    useEffect(() => {
        fetchCoursesData();
    }, []);

    console.log("studentData", studentData);
    return (
        <section className="studs_sec">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form_box">
                            <form action="post" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="input_box">
                                            <div className="form-group">
                                                <label>Course Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    value={inputData?.name || ""}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input_box">
                                            <div className="form-group">
                                                <label>Level</label>
                                                <select
                                                    name="level"
                                                    className="form-control"
                                                    value={inputData?.level || ""}
                                                    onChange={handleChange}
                                                >
                                                    <option value="---Select---">--Select--</option>
                                                    <option value="Beginner">Beginner</option>
                                                    <option value="Intermediate">Intermediate</option>
                                                    <option value="Advanced">Advanced</option>
                                                    <option value="Expert">Expert</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input_box">
                                            <div className="form-group">
                                                <label>Description</label>
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    name="description"
                                                    value={inputData?.description || ""}
                                                    onChange={handleChange} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input_box">
                                            <div className="form-group">
                                                <label>Course Image</label>
                                                <input type="file" name="image" onChange={handleImageChange} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="">
                                            <button className="btn btn-outline-success">
                                                Add Course
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="table_box">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Level</th>
                                        <th>Description</th>
                                        <th>Course Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentData?.map((data, idx) => (
                                        <tr key={idx}>
                                            <td>{data?.name || ""}</td>
                                            <td>{data?.level || ""}</td>
                                            <td>{data?.description || ""}</td>
                                            <td>
                                                <img src={data?.image || ""} alt="course-img-icon" />
                                            </td>
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

export default Courses;
