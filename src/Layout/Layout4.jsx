import { Outlet } from "react-router-dom";
import Header from "../components/header/Header.jsx";
import Menubar from "../components/menu/Menubar.jsx";
import MyChannelHeader from "../components/myChannel/MyChannelHeader.jsx";

function Layout4() {
  return (
    <div
      id="scrollingDiv"
      className="h-screen overflow-y-auto bg-[#121212] text-white"
    >
      <Header />

      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Menubar
          className="lg:sticky lg:max-w-[250px]"
          menuSpanClass="lg:inline"
        />

        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
					<MyChannelHeader />

					<Outlet />
				</section>
      </div>
    </div>
  );
}

export default Layout4;
