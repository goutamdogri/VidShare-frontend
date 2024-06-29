import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AuthCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const check = async () => {
    try {
      const res = await fetch(
        "https://vidshareforbackend.goutamdogri.com/api/v1/healthcheck/authCheck",
        { method: "GET", credentials: "include" }
      );
      if (res.ok) {
        return <Outlet />;
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      navigate("/", { replace: true });
      console.log(error);
      
    }
  };

  return <Outlet />;
}

export default AuthCheck;
