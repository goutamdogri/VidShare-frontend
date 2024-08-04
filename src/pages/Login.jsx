import { useEffect, useState } from "react";
import Button from "../components/utils/Button.jsx";
import Input from "../components/utils/Input.jsx";
import Logo from "../components/utils/Logo.jsx";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../hooks/apiRequest.js";
import getGoogleOauthUrl from "../utils/getGoogleOauthUrl.js";

function Login() {
  const refreshToken = async () => {
    try {
      const response = await apiRequest("/users/refresh-route", "POST");
      // res.ok ? navigate("/home") : "";
      if (response.success) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      email: email,
      password: password,
    };
    try {
      const response = await apiRequest(
        "/users/login",
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify(requestData)
      );

      if (response.success) {
        // document.cookie = `accessToken=${resJson.data.accessToken}`;
        // document.cookie = `refreshToken=${resJson.data.refreshToken}`;
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      <div className="mx-auto my-8 flex w-full max-w-sm flex-col px-4">
        <Logo />
        <div className="mb-6 w-full text-center text-2xl font-semibold uppercase">
          Play
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-sm flex-col px-4"
        >
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mb-4 rounded-lg px-3 py-2"
            calssForLabel="text-gray-300"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your email"
            className="mb-4 rounded-lg px-3 py-2"
            calssForLabel="text-gray-300"
          />

          <Button type="submit" className="px-4 py-3">
            Sign in with Email
          </Button>
        </form>
        <Link to="/register" className="px-4 mt-3">
          Don&apos;t have an account?{" "}
          <span className="text-[#ae7aff]">Create Account</span>
        </Link>

        <a className="px-4 mt-4" href={getGoogleOauthUrl()}>
          <Button className="w-full py-3">Log in with Google</Button>
        </a>
      </div>
    </div>
  );
}

export default Login;
