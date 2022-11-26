import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";
import auth from "../Shared/Firebase.init";
import Navbar from "../Shared/Navbar";

const DashboardLayout = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user?.email);
  const [seller] = useSeller(user?.email);
  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-sidebar"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side ">
          <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-64 bg-base-100 text-base-content">
            <li>
              <Link to="/dashboard">My Order</Link>
            </li>
            {admin && (
              <>
                <li>
                  <Link to="/dashboard/add-product">Add Product</Link>
                </li>
                <li>
                  <Link to="/dashboard/my-product">My Product</Link>
                </li>
                <li>
                  <Link to="/dashboard/report">Report</Link>
                </li>
              </>
            )}
            {seller && (
              <>
                <li>
                  <Link to="/dashboard/add-product">Add Product</Link>
                </li>
                <li>
                  <Link to="/dashboard/my-product">My Product</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
/*

*/
