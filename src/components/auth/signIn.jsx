import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../slice/authSlice";
import loginimg from "../../assets/images/loginimg.png";
import { toast } from "react-toastify";

function SignIn() {
  const [login, setLogin] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginUser(login));
      console.log("login response component", res);

      if (res?.payload?.data?.data?.success === true) {
        // Assuming the role is returned in the response payload
        const userRole = res?.payload?.data?.data?.userData.role;
        console.log("userRole", userRole);
        if (userRole === "admin") {
          navigate("/admin/instructor");
        } else if (userRole === "user") {
          navigate("/instructor/assignLecture");
        } else {
          navigate("/login"); // Default redirection if no specific role
        }
        return;
      } else {
        toast.error("Login failed. Please check your credentials.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <section className="SignUp_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-6 right_col">
              <div className="img_box">
                <img src={loginimg} alt="de" />
              </div>
            </div>
            <div className="col-md-6 left_col">
              <form action="post" onSubmit={handleLoginSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input_box">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={login?.email || ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input_box">
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          name="password"
                          value={login?.password || ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input_box">
                      <button className="btn btn-outline-success" type="submit">
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;
