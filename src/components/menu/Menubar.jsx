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
import FeedbackSVG from "../../assets/icon/feedback.svg?react";
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
            location.pathname == "/home"
              ? "text-[#ae7aff] sm:border-[#ae7aff] sm:bg-[#ae7aff] sm:text-black"
              : ""
          }`}
          menuSpanClass={menuSpanClass}
          link={`/home`}
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
          menuTitle="Feedback"
          className={`${
            location.pathname.substring(1, 9) == "feedback"
              ? "text-[#ae7aff] sm:border-[#ae7aff] sm:bg-[#ae7aff] sm:text-black"
              : ""
          }`}
          menuSpanClass={menuSpanClass}
          link={`/feedback`}
        >
          {location.pathname.substring(1, 9) == "feedback" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ae7aff" d="M160 368c26.5 0 48 21.5 48 48v16l72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h96zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V474.7v-6.4V468v-4V416H112 64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L208 492z"/></svg>}
          {location.pathname.substring(1, 9) != "feedback" && <FeedbackSVG />}
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
