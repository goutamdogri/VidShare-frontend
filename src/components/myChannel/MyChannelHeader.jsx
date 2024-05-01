import propTypes from "prop-types";
import { Link, NavLink, useParams } from "react-router-dom";
import apiRequest from "../../hooks/apiRequest";
import { useEffect, useState } from "react";

function MyChannelHeader() {
  const { channelId } = useParams();
  const [channel, setChannel] = useState();

  useEffect(() => {
    fetchChannel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  const fetchChannel = async () => {
    try {
      const res = await apiRequest(`/users/c/${channelId}`);
      setChannel(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative min-h-[150px] w-full pt-[16.28%]">
        <div className="absolute inset-0 overflow-hidden">
          <img src={channel?.coverImage} alt="cover-photo" />
        </div>
      </div>
      <div className="px-4">
        {/* changed from sir given */}
        <div className="flex flex-wrap gap-4 pb-4 pt-6">
          <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
            <img
              src={channel?.avatar}
              alt="Channel"
              className="h-full w-full"
            />
          </span>
          <div className="mr-auto inline-block">
            <h1 className="font-bolg text-xl">{channel?.fullName}</h1>
            <p className="text-sm text-gray-400">{channel?.username}</p>
            <p className="text-sm text-gray-400">
              {`${channel?.subscribersCount} Subscribers · ${channel?.channelSubscribedToCount} Subscribed`}
            </p>
          </div>
          <Link to={`/edit/personalInfo/${channelId}`} className="inline-block">
            <button className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
              <span className="inline-block w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  ></path>
                </svg>
              </span>
              Edit
            </button>
          </Link>
        </div>
        <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
          <li className="w-full">
            <NavLink
              to={`/myChannel/video/${channelId}`}
              className={({ isActive }) =>
                `w-full border-b-2 py-1.5 ${
                  isActive
                    ? "border-[#ae7aff] bg-white text-[#ae7aff]"
                    : "border-transparent text-gray-400"
                }`
              }
            >
              <button className="w-full border-b-2 py-1.5">Videos</button>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to={`/myChannel/playlist/${channelId}`}
              className={({ isActive }) =>
                `w-full border-b-2 py-1.5 ${
                  isActive
                    ? "border-[#ae7aff] bg-white text-[#ae7aff]"
                    : "border-transparent text-gray-400"
                }`
              }
            >
              <button className="w-full border-b-2 py-1.5">Playlist</button>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to={`/myChannel/communityPost/${channelId}`}
              className={({ isActive }) =>
                `w-full border-b-2 py-1.5 ${
                  isActive
                    ? "border-[#ae7aff] bg-white text-[#ae7aff]"
                    : "border-transparent text-gray-400"
                }`
              }
            >
              <button className="w-full border-b-2 py-1.5">
                Community Post
              </button>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to={`/myChannel/subscribed/${channelId}`}
              className={({ isActive }) =>
                `w-full border-b-2 py-1.5 ${
                  isActive
                    ? "border-[#ae7aff] bg-white text-[#ae7aff]"
                    : "border-transparent text-gray-400"
                }`
              }
            >
              <button className="w-full border-b-2 py-1.5">Subscribed</button>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

MyChannelHeader.propTypes = {
  video: propTypes.object,
};

export default MyChannelHeader;
