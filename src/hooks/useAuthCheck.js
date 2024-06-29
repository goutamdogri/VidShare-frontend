import { useNavigate } from "react-router-dom";

async function useAuthCheck() {
  const navigate = useNavigate();

  try {
    const res = await fetch(
      "https://vidshareforbackend.goutamdogri.com/api/v1/healthcheck/authCheck",
      { method: "GET", credentials: "include" }
    );
    if (!res.ok) {
      navigate("/", { replace: true });
    }
  } catch (error) {
    console.log(error);
  }
}

export default useAuthCheck;
