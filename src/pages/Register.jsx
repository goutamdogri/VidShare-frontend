import Logo from "../components/utils/Logo.jsx";
import Input from "../components/utils/Input.jsx";
import Button from "../components/utils/Button.jsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../hooks/apiRequest.js";
import getGoogleOauthUrl from "../utils/getGoogleOauthUrl.js";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);

    const coverImageCanvas = document.createElement("canvas");
    coverImageCanvas.width = 1600;
    coverImageCanvas.height = 600;
    const avatarCanvas = document.createElement("canvas");
    avatarCanvas.width = 300;
    avatarCanvas.height = 300;

    // Function to generate a random color
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    const coverImageCTX = coverImageCanvas.getContext("2d");
    const randomColor = getRandomColor();

    // Set the canvas background to the random color
    coverImageCTX.fillStyle = randomColor;
    coverImageCTX.fillRect(
      0,
      0,
      coverImageCanvas.width,
      coverImageCanvas.height
    );
    await new Promise((resolve) => {
      coverImageCanvas.toBlob(function (blob) {
        formData.append("coverImage", blob, "coverImage.png");
        resolve();
      }, "image/png");
    });

    const avatarCanvasCTX = avatarCanvas.getContext("2d");

    // Set the canvas background to the random color
    avatarCanvasCTX.fillStyle = randomColor;
    avatarCanvasCTX.fillRect(0, 0, avatarCanvas.width, avatarCanvas.height);
    // Add the letter "D" in white color in the middle of the image
    const letter = email.charAt(0).toUpperCase();
    avatarCanvasCTX.font = "bold 150px Arial";
    avatarCanvasCTX.fillStyle = "white";
    avatarCanvasCTX.textAlign = "center";
    avatarCanvasCTX.textBaseline = "middle";
    avatarCanvasCTX.fillText(
      letter,
      avatarCanvas.width / 2,
      avatarCanvas.height / 2
    );
    await new Promise((resolve) => {
      avatarCanvas.toBlob((blob) => {
        formData.append("avatar", blob, "avatar.png");
        resolve();
      }, "image/png");
    });

    try {
      const response = await apiRequest(
        "/users/register",
        "POST",
        null,
        formData
      );

      if (response.success) {
        navigate("/home");
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
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mb-4 rounded-lg px-3 py-2"
            calssForLabel="text-gray-300"
          />

          <Button type="submit" className="px-4 py-3">
            Sign up with Email
          </Button>
        </form>
        <Link to="/" className="px-4 mt-3">
          Already have an account?{" "}
          <span className="text-[#ae7aff]">Log in</span>
        </Link>

        <a className="px-4 mt-4" href={getGoogleOauthUrl()}>
          <Button className="w-full py-3">Log in with Google</Button>
        </a>
      </div>
    </div>
  );
}

export default Register;
