import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import useUserStore from "../../../stores/userStore";

const Nav = () => {
  const navigate = useNavigate();
  const { logout } = useUserStore();
  const [isOpen, setOpen] = useState(false);
  return (
    <nav className="tw-border tw-shadow-sm tw-border-solid tw-border-gray-300 tw-rounded-md tw-p-2 tw-w-full tw-px-5">
      <div className="tw-flex tw-justify-between tw-items-center tw-w-full tw-max-w-7xl tw-mx-auto">
        <Button
          onClick={() => navigate("/auth")}
          className="p-button-text p-button-plain tw-text-2xl tw-font-bold tw-p-1 tw-px-2"
          label="Auth"
        />
        <div className="tw-block sm:tw-hidden tw-transition-all tw-z-20">
          <Hamburger
            size={35}
            rounded
            color={isOpen ? "#FFFFFF" : "#223132"}
            toggled={isOpen}
            toggle={setOpen}
          />
        </div>
        <div className="tw-gap-2 tw-hidden sm:tw-flex">
          <Button
            onClick={logout}
            className="p-button-rounded"
            severity="danger"
            label="Logout"
          ></Button>
        </div>
      </div>
      <div
        className={`tw-flex tw-top-0 tw-z-10 sm:tw-hidden tw-fixed tw-h-screen tw-w-screen tw-bg-black/90 tw-transition-all
    ${isOpen ? "tw-right-0" : "-tw-right-[100%]"}
    `}
      ></div>
    </nav>
  );
};

export default Nav;
