import Header from "../components/header/Header.jsx";
import Menubar from "../components/menu/Menubar.jsx";
// import VideoPlay from "../components/videoPlayer/VideoPlay.jsx";
import { Outlet } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck.js";

function Layout1() {
  // useAuthCheck();
  return (
    <>
      <div
        id="scrollingDiv"
        className="h-screen overflow-y-auto bg-[#121212] text-white"
      >
        <Header />

        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Menubar />

          {/* <VideoPlay /> */}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout1;
