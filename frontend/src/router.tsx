import { Navigate, createBrowserRouter } from "react-router-dom";
import NoAuthLayout from "./components/layouts/NoAuthLayout";
import HomeNoAuth from "./pages/noAuth/HomeNoAuth";
import Login from "./pages/noAuth/Login";
import Register from "./pages/noAuth/Register";
import AuthLayout from "./components/layouts/AuthLayout";
import HomeAuth from "./pages/auth/HomeAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NoAuthLayout />,
    children: [
      {
        path: "",
        element: <HomeNoAuth />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <HomeAuth />,
      },
      {
        path: "*",
        element: <Navigate to="/auth" />,
      },
    ],
  },
]);

export default router;
