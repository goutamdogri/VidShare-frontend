// import CardVidList from "../components/videoList/CardVidList.jsx";
import Header from "../components/header/Header.jsx";
import Menubar from "../components/menu/Menubar.jsx";
// import propTypes from "prop-types";
import { Outlet } from "react-router-dom";

function Layout2() {
  return (
    <>
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

          {/* <CardVidList endPoint={endPoint} /> */}
					<Outlet />
        </div>
      </div>
    </>
  );
}

// Layout2.propTypes = {
//   endPoint: propTypes.string,
// };

export default Layout2;
