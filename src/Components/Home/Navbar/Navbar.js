import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import navImage from "../../../images/Creative Agency.jpg"
import "./navbar.css"

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const loggedInUserEmail = loggedInUser.email;
  const [admin, setAdmin] = useState([]);

  useEffect(
    (loggedInUserEmail) => {
      fetch("https://polar-hollows-69401.herokuapp.com/admin")
        .then((res) => res.json())
        .then((data) => setAdmin(data));
    },
    [loggedInUserEmail]
  );

  const adminEmail = admin.find(
    (element) => element.data.email === loggedInUserEmail
  );

  const handleLogoutBtn = () => {
    setLoggedInUser("");
    sessionStorage.removeItem("token");
  };
  return (
    <div style={{ backgroundColor: "#1e292f" }} className="pl-5 pr-5">
      <nav class="navbar navbar-expand-lg navbar-light font-weight-bold">
        <Link class="navbar-brand" to="/">
        <img  src={navImage} alt="navImage" className="navImage"/>
          {/* L<span className="text-danger">O</span>G
          <span className="text-danger">O</span>{" "}
          <span className="text-primary">BAKERY</span> */}
        </Link>
        <button
          class="navbar-toggler  bg-light"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
          <li class="nav-item">
              <Link to="/home">
                <h6 class=" h6 mr-4 text-light">Home</h6>
              </Link>
            </li>
            <li class="nav-item">
              
              <Link to="/dashboard">
                <h6 class=" h6 mr-4 text-light">Dashboard</h6>
              </Link>
            </li>
            

            {adminEmail && (
              <li class="nav-item">
                <Link class="h6 mr-4 text-light" to="/admin">
                  Admin
                </Link>
              </li>
            )}

            <li class="nav-item">
              <Link to="/portfolio">
                <h6 class=" h6 mr-4 text-light">Portfolio</h6>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/contact">
                <h6 class=" h6 mr-4 text-light">Contact us</h6>
              </Link>
            </li>
            {!loggedInUserEmail ? (
              <li class="nav-item">
                <Link to="/login">
                  <h6 class=" h6 mr-4 text-light">My account</h6>
                </Link>
              </li>
            ) : (
              <li class="nav-item">
                <Link onClick={handleLogoutBtn} class="h6 mr-4 text-light">
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
