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
        "http://localhost:8000/api/v1/healthcheck/authCheck",
        { method: "GET", credentials: "include" }
      );
      const data = await res.json();
      return data?.success ? (
        <Outlet />
      ) : (
        navigate("/", { replace: true })
      );
    } catch (error) {
      console.log(error);
      navigate("/", { replace: true });
    }
  };

  return <Outlet />;
}

export default AuthCheck;
