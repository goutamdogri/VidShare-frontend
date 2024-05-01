import propTypes from "prop-types";
import { NavLink, useLocation, useParams } from "react-router-dom";
import apiRequest from "../../hooks/apiRequest";
import { useContext, useEffect, useState } from "react";
import EditImageContext from "../../contexts/EditImageContext";

function EditHeader() {
  const { channelId } = useParams();
  const [channel, setChannel] = useState();
  const { setAvatar, setCoverImage } = useContext(EditImageContext);
  const location = useLocation();

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

        {location.pathname.substring(6, 18) == "personalInfo" && <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <input
            type="file"
            id="cover-image"
            className="hidden"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
          <label
            htmlFor="cover-image"
            className="inline-block h-10 w-10 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              ></path>
            </svg>
          </label>
        </div>}
      </div>
      <div className="px-4">
        {/* changed from sir given */}
        <div className="flex flex-wrap gap-4 pb-4 pt-6">
          <div className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
            <img
              src={channel?.avatar}
              alt="Channel"
              className="h-full w-full"
            />

            {location.pathname.substring(6, 18) == "personalInfo" && <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <input
                type="file"
                id="profile-image"
                className="hidden"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <label
                htmlFor="profile-image"
                className="inline-block h-8 w-8 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  ></path>
                </svg>
              </label>
            </div>}
          </div>
          <div className="mr-auto inline-block">
            <h1 className="font-bolg text-xl">{channel?.fullName}</h1>
            <p className="text-sm text-gray-400">{channel?.username}</p>
            <p className="text-sm text-gray-400">
              {`${channel?.subscribersCount} Subscribers · ${channel?.channelSubscribedToCount} Subscribed`}
            </p>
          </div>
          <div className="inline-block">
            <button className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
              View channel
            </button>
          </div>
        </div>
        <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
          <li className="w-full">
            <NavLink
              to={`/edit/personalInfo/${channelId}`}
              className={({ isActive }) =>
                `w-full border-b-2 py-1.5 ${
                  isActive
                    ? "border-[#ae7aff] bg-white text-[#ae7aff]"
                    : "border-transparent text-gray-400"
                }`
              }
            >
              <button className="w-full border-b-2 py-1.5">
                Personal Information
              </button>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to={`/edit/channelInfo/${channelId}`}
              className={({ isActive }) =>
                `w-full border-b-2 py-1.5 ${
                  isActive
                    ? "border-[#ae7aff] bg-white text-[#ae7aff]"
                    : "border-transparent text-gray-400"
                }`
              }
            >
              <button className="w-full border-b-2 py-1.5">
                Channel Information
              </button>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to={`/edit/changepassword/${channelId}`}
              className={({ isActive }) =>
                `w-full border-b-2 py-1.5 ${
                  isActive
                    ? "border-[#ae7aff] bg-white text-[#ae7aff]"
                    : "border-transparent text-gray-400"
                }`
              }
            >
              <button className="w-full border-b-2 py-1.5">
                Change Password
              </button>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

EditHeader.propTypes = {
  video: propTypes.object,
};

export default EditHeader;
