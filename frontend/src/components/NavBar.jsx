import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  // Handle logout and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    setUser(null); // Update user state
    navigate("/"); // Redirect to the landing page
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-light bg-light d-flex">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          DocHive
        </a>

        <div
          className="d-flex justify-content-between  align-items-center  flex-fill "
          id="navbarNav"
        >
          <div className="navbar-nav my-auto">
            <span className="nav-item">
              <a className="nav-link" href="/dashboard">
                Dashboard
              </a>
            </span>
          </div>
          {user ? (
            <div className="d-flex gap-2">
              <span className="nav-item my-auto">{user.username}</span>
              <button className="btn btn-link nav-link text-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <span className="nav-item my-auto">
                <a className="nav-link text-primary" href="/login">
                  Login
                </a>
              </span>
              <span className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
