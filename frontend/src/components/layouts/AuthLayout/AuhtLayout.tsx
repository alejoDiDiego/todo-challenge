import { useEffect, useState } from "react";
import Nav from "./Nav";
import { Outlet, useNavigate } from "react-router-dom";
import useUserStore from "../../../stores/userStore";
import axiosClient from "../../../axios";

const AuhtLayout = () => {
  const { userAccessToken, setUserAccessToken, setUserRefreshToken, setUser } =
    useUserStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userAccessToken) return navigate("/");
    fetchUser();
  }, [userAccessToken]);

  const fetchUser = async () => {
    axiosClient
      .post("/auth/jwt/verify", {
        token: userAccessToken,
      })
      .then((res) => {
        if (res.data["code"] == "token_not_valid") {
          setUserAccessToken(null);
          setUserRefreshToken(null);
          return;
        }
        axiosClient
          .get("/auth/users/me/")
          .then((res) => {
            console.log(res);
            setUser(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setUserAccessToken(null);
            setUserRefreshToken(null);
            console.log(err);
          });
      })
      .catch((err) => {
        setUserAccessToken(null);
        setUserRefreshToken(null);
        console.log(err);
      });
  };

  return (
    <div>
      <Nav />
      <div className="tw-w-full tw-max-w-7xl tw-mx-auto tw-mt-10">
        {loading ? <p>Loading...</p> : <Outlet />}
      </div>
    </div>
  );
};

export default AuhtLayout;
