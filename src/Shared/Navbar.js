import React from "react";
import { Link, NavLink } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-base-300">
        <div className="navbar-start">
          <Link
            to={"/"}
            className="btn btn-ghost font-bold text-xl bg-transparent"
          >
            Best Seller
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li>
              <NavLink
                to={"/home"}
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500 bg-transparent font-semibold"
                    : "text-black bg-transparent hover:text-red-500 duration-300 font-semibold"
                }
              >
                Home
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="lg:flex hidden">
            <ul className="menu menu-horizontal p-0 gap-2">
              <li>
                <NavLink
                  to={"/login"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-500 bg-transparent font-semibold"
                      : "text-black bg-transparent hover:text-red-500 duration-300 font-semibold"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className="p-0 bg-transparent" to="/sign-up">
                  <PrimaryButton>Sign Up</PrimaryButton>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink
                  to={"/home"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-500 bg-transparent font-semibold"
                      : "text-black bg-transparent hover:text-red-500 duration-300 font-semibold"
                  }
                >
                  Home
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
