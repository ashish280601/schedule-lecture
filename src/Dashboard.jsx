// Dashboard.js
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function Dashboard() {
    const [closeOpen, setCloseOpen] = useState(true);
    const [activeNavItem, setActiveNavItem] = useState("Home"); // Initialize with the default active navigation item
    const navigate = useNavigate();
    let [show, setShow] = useState("");
    const handleNavItemClick = (itemName) => {
        setActiveNavItem(itemName);
    };
    let togglefun = () => {
        if (closeOpen) {
            setCloseOpen(false);
            setShow("show");
        } else {
            setCloseOpen(true);
            setShow("");
        }
    };
    const handleItemClick = (itemName) => {
        // setActiveItem(itemName);
        handleNavItemClick(itemName);

        togglefun(); // Close the menu when a menu item is clicked.
    };

    const handleSignOut = async () => {
        try {

            sessionStorage.clear();
            toast.success("Logout Successful", {
                autoClose: 3000,
                position: "bottom-right"
            })
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
            toast.error("Failed to logout", {
                position: "bottom-right",
                autoClose: 3000
            })
        }
    };
    return (
        <>
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="navbar-box">
                                <nav className="navbar navbar-expand-lg sticky-top fixed-top">
                                    <Link className="navbar-brand" to="#">
                                        <img src={""} alt="" />
                                    </Link>
                                    <button
                                        className="navbar-toggler navbar-toggle"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#navbarNav"
                                        aria-controls="navbarNav"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                        {closeOpen ? (
                                            <span
                                                className="navbar-toggler-icon"
                                                onClick={togglefun}
                                            ></span>
                                        ) : (
                                            <span className="" onClick={togglefun}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="19"
                                                    height="19"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#6e6969"
                                                    stroke-width="2"
                                                    stroke-linecap="butt"
                                                    stroke-linejoin="bevel"
                                                >
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                    <div
                                        className={`collapse navbar-collapse ${show}`}
                                        id="navbarNav"
                                    >
                                        <ul className="navbar-nav">
                                            <li
                                                className={`nav-item list_nav ${activeNavItem === "instructor" ? "active" : ""
                                                    }`}
                                            >
                                                <Link className="nav-link" to={"/instructor"}>
                                                    Instructor
                                                </Link>
                                            </li>
                                            <li
                                                className={`nav-item list_nav ${activeNavItem === "courses" ? "active" : ""
                                                    }`}
                                            >
                                                <Link
                                                    className="nav-link"
                                                    to="/courses"
                                                    onClick={() => handleItemClick("courses")}
                                                >
                                                    Courses
                                                </Link>
                                            </li>

                                            <li
                                                className={`nav-item list_nav ${activeNavItem === "lecture" ? "active" : ""
                                                    }`}
                                            >
                                                <Link
                                                    className="nav-link"
                                                    to="/lecture"
                                                    onClick={() => handleItemClick("lecture")}
                                                >
                                                    Create Lecture
                                                </Link>
                                            </li>
                                            <li
                                                className={`nav-item list_nav ${activeNavItem === "assignLecture" ? "active" : ""
                                                    }`}
                                            >
                                                <Link
                                                    className="nav-link"
                                                    to="/assignLecture  "
                                                    onClick={() => handleItemClick("assignLecture")}
                                                >
                                                    Schedule Lecture
                                                </Link>
                                            </li>
                                            <li
                                                className={`nav-item list_nav ${activeNavItem === "logout" ? "active" : ""
                                                    }`}
                                            >
                                                <Link
                                                    className="nav-link"
                                                    to="/login"
                                                    onClick={() => { handleItemClick("logout"), handleSignOut() }}
                                                >
                                                    Log Out
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
}

export default Dashboard;
