import apiRequest from "../hooks/apiRequest";
import UserContext from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

function GetUser() {
  const { setUser } = useContext(UserContext);

  async function getCurrentUser() {
    try {
      const response = await apiRequest("/users/current-user");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Outlet />;
}

export default GetUser;
