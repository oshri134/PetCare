import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const userData = useSelector(state => state.userData)
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
        Pet-Care.
      </Link>
      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"} />
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        {userData.isAuthenticated ? (
          <>
            {userData.userType === 'vet' ? (
              <>
                <li className="nav-item">
                  <Link to="/Schedule" className="nav-links" onClick={closeMobileMenu}>
                    Vet Schedule
                  </Link>
                </li>
              </>
            ) :
              (
                <>
                  <li className="nav-item">
                    <Link to="/CreateAppointment" className="nav-links" onClick={closeMobileMenu}>
                      Create Appointment
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/Schedule" className="nav-links" >
                      My Schedule
                    </Link>
                  </li>
                </>
              )}
            <li className="nav-item">
              <Link to="/Profile" className="nav-links" >
                Hello {userData.firstName} {userData.lastName}
              </Link>
              <Link to="/Logout" className="nav-links" >
                Log Out
              </Link>
            </li>

          </>
        ) :
          (
            <>
              <div>

                <li className="nav-item">
                  <Link to="/Contact" className="nav-links" onClick={closeMobileMenu}>
                    Connect Us
                  </Link>
                </li>
              </div>
              <li className="nav-item">
                <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                  About-As
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Login" className="nav-links" onClick={closeMobileMenu}>
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/Signup" className="nav-links" >
                  Sign Up
                </Link>
              </li>
            </>
          )}

      </ul>

    </nav>
  );
}

export default Navbar;
