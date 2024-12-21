// import { redirect, useNavigate } from "react-router-dom";

const NavBar = () => {
  // const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  // const user = userString ? JSON.parse(userString) : "username";
  console.log(user);

  //  handle logout and redirect to login page

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          DocHive
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                Dashboard
              </a>
            </li>
          </ul>
          {user ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="btn btn-link nav-link">
                  {/* onClick={handleLogout} in button */}
                  {user.username} Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-primary" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
