import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import "../styles/css/Layout.css";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

export const Menu = ({ history, itemCount }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary menu-bar">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav nav-tabs bg-primary">
          <li className="nav-item">
            <Link className="nav-link" to="/" style={isActive(history, "/")}>
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/shop"
              style={isActive(history, "/shop")}
            >
              Shop
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/cart"
              style={isActive(history, "/cart")}
            >
              Cart{" "}
              <sup className="cart-badge">
                <small>{itemCount}</small>
              </sup>{" "}
            </Link>
          </li>

          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/signin"
                  style={isActive(history, "/signin")}
                >
                  Sign In
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/signup"
                  style={isActive(history, "/signup")}
                >
                  Sign Up
                </Link>
              </li>
            </Fragment>
          )}

          {isAuthenticated() && (
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "white" }}
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Sign Out
              </span>
            </li>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard"
                style={isActive(history, "/admin/dashboard")}
              >
                Dashboard
              </Link>
            </li>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/user/dashboard"
                style={isActive(history, "/user/dashboard")}
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  itemCount: state.cartReducer.itemCount,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu));
