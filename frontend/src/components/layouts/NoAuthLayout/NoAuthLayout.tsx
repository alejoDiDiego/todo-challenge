import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const NoAuthLayout = () => {
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
