import { Navigate, createBrowserRouter } from "react-router-dom";
import NoAuthLayout from "./components/layouts/NoAuthLayout";
import HomeNoAuth from "./pages/noAuth/HomeNoAuth";
import Login from "./pages/noAuth/Login";
import Register from "./pages/noAuth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NoAuthLayout />,
    children: [
      {
        path: "/",
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
]);

export default router;
