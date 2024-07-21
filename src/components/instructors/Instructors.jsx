import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addInstructorData, getInstructorData } from "../../slice/instructorSlice";

function Instructors() {
  const [inputData, setinputData] = useState({});
  const [studentData, setStudentData] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinputData((prev) => {
      const keys = name.split(".");
      const lastKey = keys.pop();
      const deepClone = { ...prev };

      let nested = deepClone;
      keys.forEach((key) => {
        if (!nested[key]) {
          nested[key] = {};
        }
        nested = nested[key];
      });

      nested[lastKey] = value;

      return deepClone;
    });
  };
  console.log("student data change", inputData);

  const fetchInstructorData = () => {
    dispatch(getInstructorData({}))
      .then((res) => {
        console.log(res);
        const { allInstructors } = res.payload.data.data;
        console.log(allInstructors);
        setStudentData(allInstructors);
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
      const res = await dispatch(addInstructorData(inputData));
      console.log("res data from student component", res);
      if (res.payload.data.data.success) {
        fetchInstructorData();
        setinputData({});
        return;
      }
    } catch (error) {
      console.error("error while adding student data", error);
    }
  };

  useEffect(() => {
    fetchInstructorData();
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
                        <label>Name</label>
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
                        <label>Email</label>
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          value={inputData?.email || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input_box">
                      <div className="form-group">
                        <label>Department</label>
                        <input
                          type="text"
                          className="form-control"
                          name="department"
                          value={inputData?.department || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="">
                      <button className="btn btn-outline-success">
                        Add Instructor
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
                    <th>Email</th>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data?.name || ""}</td>
                      <td>{data?.email || ""}</td>
                      <td>{data?.department || ""}</td>
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

export default Instructors;
