import { Navigate, Outlet } from "react-router-dom";
import Nav from "./Nav";
import useUserStore from "../../../stores/userStore";

const NoAuthLayout = () => {
  const { userAccessToken } = useUserStore();

  if (userAccessToken) return <Navigate to="/auth" />;

  return (
    <div>
      <Nav />
      <div className="tw-w-full tw-max-w-7xl tw-mx-auto tw-mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default NoAuthLayout;
