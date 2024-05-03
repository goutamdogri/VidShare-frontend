import propTypes from "prop-types";
import { NavLink, useParams } from "react-router-dom";
import apiRequest from "../../hooks/apiRequest";
import { useEffect, useState } from "react";

function ChannelHeader() {
  const { channelId } = useParams();
  const [channel, setChannel] = useState();
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);

  useEffect(() => {
    fetchChannel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  const fetchChannel = async () => {
    try {
      const res = await apiRequest(`/users/c/${channelId}`);
      setChannel(res.data);
      setSubscriptionStatus(res.data.isSubscribed.if);
    } catch (error) {
      console.log(error);
    }
  };

  // toggle subscription
  async function toggleSubscription() {
    try {
      const toggleSubscriptionRes = await apiRequest(
        `/subscriptions/check/toggle/${channelId}?need=toggle`,
        "POST"
      );
      setSubscriptionStatus(toggleSubscriptionRes.data.subscriptionStatus);
      fetchChannel();
    } catch (error) {
      console.log(error);
    }
  }

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
          <div className="inline-block">
            <div className="inline-flex min-w-[145px] justify-end">
              <button
                onClick={toggleSubscription}
                className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
              >
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
                      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    ></path>
                  </svg>
                </span>
                <span className={`${subscriptionStatus ? "hidden" : ""}`}>
                  Subscribe
                </span>
                <span className={`${subscriptionStatus ? "block" : "hidden"}`}>
                  Subscribed
                </span>
              </button>
            </div>
          </div>
        </div>
        <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
          <li className="w-full">
            <NavLink
              to={`/channel/video/${channelId}`}
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
              to={`/channel/playlist/${channelId}`}
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
              to={`/channel/communityPost/${channelId}`}
              className={({ isActive }) =>
                `w-full border-b-2 py-1.5 ${
                  isActive
                    ? "border-[#ae7aff] bg-white text-[#ae7aff]"
                    : "border-transparent text-gray-400"
                }`
              }
            >
              <button className="w-full border-b-2 py-1.5">
                Post
              </button>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to={`/channel/subscribed/${channelId}`}
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

ChannelHeader.propTypes = {
  video: propTypes.object,
};

export default ChannelHeader;
