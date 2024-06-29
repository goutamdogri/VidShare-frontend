import Logo from "../components/utils/Logo.jsx";
import Input from "../components/utils/Input.jsx";
import Button from "../components/utils/Button.jsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("coverImage", coverImage);

    try {
      const response = await fetch(
        "https://vidshareforbackend.goutamdogri.com/api/v1/users/register",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const resJson = await response.json();

      if (resJson.success) {
        // 	document.cookie = `accessToken=${resJson.data.accessToken}`;
        // 	document.cookie = `refreshToken=${resJson.data.refreshToken}`;
        navigate("/");
      } else {
        // Registration failed, handle the error
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

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
            label="Full Name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your Full Name"
            className="mb-4 rounded-lg px-3 py-2"
            calssForLabel="text-gray-300"
          />
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
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your Username"
            className="mb-4 rounded-lg px-3 py-2"
            calssForLabel="text-gray-300"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            className="mb-4 rounded-lg px-3 py-2"
            calssForLabel="text-gray-300"
          />
          <Input
            label="Avatar"
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
            placeholder="upload your avatar"
            className="mb-4 rounded-lg px-3 py-2"
            calssForLabel="text-gray-300"
          />
          <Input
            label="Cover Image"
            type="file"
            onChange={(e) => setCoverImage(e.target.files[0])}
            placeholder="upload your Cover Image"
            className="mb-4 rounded-lg px-3 py-2"
            calssForLabel="text-gray-300"
          />

          <Button type="submit" className="px-4 py-3">
            Sign up with Email
          </Button>
        </form>

        <Link to="/" className="px-4">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
