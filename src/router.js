import { createBrowserRouter } from "react-router-dom";
import ProductDetails from "./Components/ProductDetails";
import Main from "./Layout/Main";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import AllProducts from "./Pages/AllProducts";
import CategoryProduct from "./Pages/CategoryProduct";
import Home from "./Pages/Home";
import ErrorPage from "./Shared/ErrorPage";

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
        element: <CategoryProduct />,
        loader: ({ params }) =>
          fetch(`https://seller-server.vercel.app/category/${params.name}`),
      },
      {
        path: "/all-products",
        element: <AllProducts />,
        loader: () => fetch(`https://seller-server.vercel.app/products`),
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
        loader: ({ params }) =>
          fetch(`https://seller-server.vercel.app/product/${params.id}`),
      },
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <Signup /> },
    ],
  },
]);

export default router;
