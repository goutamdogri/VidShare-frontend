import { useLocation } from "react-router-dom";
import CollectionsSVG from "../../assets/icon/collections.svg?react";
import HistorySVG from "../../assets/icon/history.svg?react";
import HomeSVG from "../../assets/icon/home.svg?react";
import LikedVidSVG from "../../assets/icon/likedVid.svg?react";
import MyContentSVG from "../../assets/icon/myContent.svg?react";
import SettingsSVG from "../../assets/icon/settings.svg?react";
// import SubscribersSVG from "../../assets/icon/subscribers.svg?react";
import SupportSVG from "../../assets/icon/support.svg?react";
import DashboardSVG from "../../assets/icon/dashboard.svg?react";
import Menu from "./Menu.jsx";
import propTypes from "prop-types";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext.js";

function Menubar({ className = "", menuSpanClass = "" }) {
  const location = useLocation();
  const { user } = useContext(UserContext);

  return (
    <aside
      className={`group fixed inset-x-0 bottom-0 z-40 w-full shrink-0 border-t border-white bg-[#121212] px-2 py-2 sm:absolute sm:inset-y-0 sm:max-w-[70px] sm:border-r sm:border-t-0 sm:py-6 sm:hover:max-w-[250px] ${className}`}
    >
      <ul className="flex justify-around gap-y-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
        <Menu
          menuTitle="Home"
          className={`${
            location.pathname == "/"
              ? "text-[#ae7aff] sm:border-[#ae7aff] sm:bg-[#ae7aff] sm:text-black"
              : ""
          }`}
          menuSpanClass={menuSpanClass}
          link={`/`}
        >
          <HomeSVG />
        </Menu>

        <Menu
          menuTitle="Liked Videos"
          className={`${
            location.pathname.substring(1, 13) == "likes/videos"
              ? "text-[#ae7aff] sm:border-[#ae7aff] sm:bg-[#ae7aff] sm:text-black"
              : ""
          } hidden sm:block`}
          menuSpanClass={menuSpanClass}
          link={"/likes/videos"}
        >
          <LikedVidSVG />
        </Menu>

        <Menu
          menuTitle="History"
          className={`${
            location.pathname.substring(1, 13) == "watchHistory"
              ? "text-[#ae7aff] sm:border-[#ae7aff] sm:bg-[#ae7aff] sm:text-black"
              : ""
          }`}
          menuSpanClass={menuSpanClass}
          link={"/watchHistory"}
        >
          <HistorySVG />
        </Menu>

        <Menu
          menuTitle="My Content"
          className={`${
            location.pathname.substring(1, 10) == "myChannel"
              ? "text-[#ae7aff] sm:border-[#ae7aff] sm:bg-[#ae7aff] sm:text-black"
              : ""
          } hidden sm:block`}
          link={`/myChannel/video/${user?._id}`}
          menuSpanClass={menuSpanClass}
        >
          <MyContentSVG />
        </Menu>

        <Menu
          menuTitle="Collections"
          className={`${
            location.pathname.substring(1, 12) == "collections"
              ? "text-[#ae7aff] sm:border-[#ae7aff] sm:bg-[#ae7aff] sm:text-black"
              : ""
          }`}
          menuSpanClass={menuSpanClass}
          link={`/collections/${user?._id}`}
        >
          <CollectionsSVG />
        </Menu>

        {/* <Menu menuTitle="Subscribers" menuSpanClass={menuSpanClass}>
          <SubscribersSVG />
        </Menu> */}

        <Menu
          menuTitle="Dashboard"
          menuSpanClass={menuSpanClass}
          link={`/dashboard/admin/${user?._id}`}
        >
          <DashboardSVG />
        </Menu>

        <Menu
          menuTitle="Support"
          className="hidden sm:block mt-auto"
          menuSpanClass={menuSpanClass}
        >
          <SupportSVG />
        </Menu>

        <Menu
          menuTitle="Settings"
          className="hidden sm:block"
          menuSpanClass={menuSpanClass}
        >
          <SettingsSVG />
        </Menu>
      </ul>
    </aside>
  );
}

Menubar.propTypes = {
  className: propTypes.string,
  menuSpanClass: propTypes.string,
};

export default Menubar;
