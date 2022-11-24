import { createBrowserRouter } from "react-router-dom";
import Main from "./Layout/Main";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
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
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <Signup /> },
    ],
  },
]);

export default router;
