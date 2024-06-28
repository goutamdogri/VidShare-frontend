import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import useAuthCheck from "../hooks/useAuthCheck";

function Layout6() {
  useAuthCheck();
  return (
    <div
      id="scrollingDiv"
      className="h-screen overflow-y-auto bg-[#121212] text-white"
    >
      <Header />

      <Outlet />
    </div>
  );
}

export default Layout6;
