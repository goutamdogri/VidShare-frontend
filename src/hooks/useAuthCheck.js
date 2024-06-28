import { useNavigate } from "react-router-dom";

async function useAuthCheck() {
	const navigate = useNavigate();

	try {
		const res = await fetch(
			"http://localhost:8000/api/v1/healthcheck/authCheck",
			{ method: "GET", credentials: "include" }
		);
		if (!res.ok) {
			navigate("/", { replace: true });
		}
	} catch (error) {
		// navigate("/", { replace: true });
      console.log(error);
	}
}

export default useAuthCheck;