import { createBrowserRouter } from "react-router-dom";
import ProductDetails from "./Components/ProductDetails";
import DashboardLayout from "./Layout/DashboardLayout";
import Main from "./Layout/Main";
import RequireAuth from "./Layout/RequireAuth";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import AllProducts from "./Pages/AllProducts";
import CategoryProduct from "./Pages/CategoryProduct";
import AddProduct from "./Dashboard/AddProduct";
import MyOrder from "./Dashboard/MyOrder";
import MyProduct from "./Dashboard/MyProduct";
import Home from "./Pages/Home";
import ErrorPage from "./Shared/ErrorPage";
import Report from "./Dashboard/Report";
import RequireSeller from "./Layout/RequireSeller";
import RequireAdmin from "./Layout/RequireAdmin";
import AllSeller from "./Dashboard/AllSeller";
import AllBuyer from "./Dashboard/AllBuyer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      {
        path: "/category/:name",
        element: (
          <RequireAuth>
            <CategoryProduct />
          </RequireAuth>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/category/${params.name}`),
      },
      {
        path: "/all-products",
        element: <AllProducts />,
        loader: () => fetch(`http://localhost:5000/products`),
      },
      {
        path: "/product/:id",
        element: (
          <RequireAuth>
            <ProductDetails />
          </RequireAuth>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/product/${params.id}`),
      },
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <Signup /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      // buyer
      {
        path: "/dashboard",
        element: <MyOrder />,
      },
      // seller
      {
        path: "/dashboard/add-product",
        element: (
          <RequireSeller>
            <AddProduct />
          </RequireSeller>
        ),
      },
      {
        path: "/dashboard/my-product",
        element: (
          <RequireSeller>
            <MyProduct />
          </RequireSeller>
        ),
      },
      // admin
      {
        path: "/dashboard/all-sellers",
        element: (
          <RequireAdmin>
            <AllSeller />
          </RequireAdmin>
        ),
      },
      {
        path: "/dashboard/all-buyers",
        loader: () => fetch("http://localhost:5000/all-buyers"),
        element: (
          <RequireAdmin>
            <AllBuyer />
          </RequireAdmin>
        ),
      },
      {
        path: "/dashboard/report",
        element: (
          <RequireAdmin>
            <Report />
          </RequireAdmin>
        ),
      },
    ],
  },
]);

export default router;
