import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./Firebase.init";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [stickyClass, setStickyClass] = useState("relative");
  const location = useLocation();
  const [user] = useAuthState(auth);
  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);
  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 200
        ? setStickyClass("fixed top-0 left-0 z-50 ")
        : setStickyClass("relative");
    }
  };
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };
  return (
    <div>
      <div className={`navbar bg-base-300 z-50 ${stickyClass}`}>
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
            <li>
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500 bg-transparent font-semibold"
                    : "text-black bg-transparent hover:text-red-500 duration-300 font-semibold"
                }
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="lg:flex hidden">
            <ul className="menu menu-horizontal p-0 gap-2">
              {user ? (
                <li>
                  <button
                    onClick={logout}
                    className="btn btn-outline btn-error rounded-lg"
                  >
                    Sign Out
                  </button>
                </li>
              ) : (
                <>
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
                </>
              )}
            </ul>
          </div>
          <div className="dropdown dropdown-end">
            {location.pathname.includes("/dashboard") && (
              <label
                htmlFor="dashboard-sidebar"
                tabIndex="1"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </label>
            )}
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
              <li>
                <NavLink
                  to={"/dashboard"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-500 bg-transparent font-semibold"
                      : "text-black bg-transparent hover:text-red-500 duration-300 font-semibold"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              {user ? (
                <li>
                  <button
                    onClick={logout}
                    className="btn btn-outline btn-error rounded-lg"
                  >
                    Sign Out
                  </button>
                </li>
              ) : (
                <>
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
                    <NavLink
                      to={"/sign-up"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-red-500 bg-transparent font-semibold"
                          : "text-black bg-transparent hover:text-red-500 duration-300 font-semibold"
                      }
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
