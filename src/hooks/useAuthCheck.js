import { useNavigate } from "react-router-dom";
import apiRequest from "./apiRequest";

async function useAuthCheck() {
  const navigate = useNavigate();

  try {
    const res = await apiRequest(
      "/healthcheck/authCheck",
      // { method: "GET", credentials: "include" }
    );
    if (!res.success) {
      navigate("/", { replace: true });
    }
  } catch (error) {
    console.log(error);
  }
}

export default useAuthCheck;
