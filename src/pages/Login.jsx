import { useEffect, useState } from "react";
import Button from "../components/utils/Button.jsx";
import Input from "../components/utils/Input.jsx";
import Logo from "../components/utils/Logo.jsx";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const refreshToken = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/v1/users/refresh-route",
        { method: "POST", credentials: "include" }
      );
      res.ok ? navigate("/home") : "";
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
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        credentials: "include",
      });
      const resJson = await response.json();

      if (resJson.success) {
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
        <Link to="/register" className="px-4">
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default Login;
