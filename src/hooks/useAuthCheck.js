// This is for securing the route so that if user is not logged in at first they should login. but as it not working in production, it is commented for temporarily

import { useNavigate } from "react-router-dom";

async function useAuthCheck() {
	// const navigate = useNavigate();

	// try {
	// 	const res = await fetch(
	// 		"http://localhost:8000/api/v1/healthcheck/authCheck",
	// 		{ method: "GET", credentials: "include" }
	// 	);
	// 	if (!res.ok) {
	// 		navigate("/", { replace: true });
	// 	}
	// } catch (error) {
	// 	// navigate("/", { replace: true });
  //     console.log(error);
	// }
}

export default useAuthCheck;