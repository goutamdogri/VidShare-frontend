import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import apiRequest from "../../hooks/apiRequest";
import SingleVideoDetails from "./SingleVideoDetails";
import usePagination from "../../hooks/usePagination";
import EditVideo from "../edit/EditVideo";
import DeleteVideo from "../edit/DeleteVideo.jsx";
import useCheckValidForEdit from "../../hooks/useCheckValidForEdit.js";

function AdminDashboard() {
  const { channelId } = useParams();
  const isValid = useCheckValidForEdit(channelId);

  const [channelStats, setChannelStats] = useState();
  const [video, setVideo] = useState({});
  const { videoId } = useParams();
  const location = useLocation();

  const { data: videos } = usePagination(
    `/dashboard/stats/videos/${channelId}?page=`,
    `&limit=10&isPublished=all`
  );

  const fetchChannelStats = async () => {
    try {
      const res = await apiRequest(`/dashboard/stats/${channelId}`);
      setChannelStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVideo = async () => {
    try {
      const res = await apiRequest(`/videos/${videoId}`);
      setVideo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChannelStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  useEffect(() => {
    if (videoId) {
      fetchVideo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  if (isValid) {
    return (
      <>
      {/* w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0 */}
      {/* mx-auto flex w-full max-w-7xl flex-col gap-y-6 px-4 py-8 max-[1024px]:relative max-[1024px]:left-[62px] max-[640px]:left-0 max-[640px]:pb-20 */}
        <div className="mx-auto flex w-full flex-col gap-y-6 px-4 py-8 max-[1024px]:relative max-[1024px]:pl-20 max-[640px]:pl-4 max-[640px]:pb-20" >
          <div className="flex flex-wrap justify-between gap-4">
            <div className="block">
              <h1 className="text-2xl font-bold">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-300">
                Seamless Video Management, Elevated Results.
              </p>
            </div>
            <Link to={`/myChannel/upload/video/${channelId}`} className="block">
              <button className="inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  ></path>
                </svg>{" "}
                Upload video
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
            <div className="border p-4">
              <div className="mb-4 block">
                <span className="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
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
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </span>
              </div>
              <h6 className="text-gray-300">Total views</h6>
              <p className="text-3xl font-semibold">
                {channelStats?.totalViews}
              </p>
            </div>

            <div className="border p-4">
              <div className="mb-4 block">
                <span className="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    ></path>
                  </svg>
                </span>
              </div>
              <h6 className="text-gray-300">Total subscribers</h6>
              <p className="text-3xl font-semibold">
                {channelStats?.totalSubscribers}
              </p>
            </div>

            <div className="border p-4">
              <div className="mb-4 block">
                <span className="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
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
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    ></path>
                  </svg>
                </span>
              </div>
              <h6 className="text-gray-300">Total likes</h6>
              <p className="text-3xl font-semibold">
                {channelStats?.totalLikes}
              </p>
            </div>
          </div>

          <div className="w-full overflow-auto">
            <table className="w-full min-w-[1200px] border-collapse border text-white">
              <thead>
                <tr>
                  <th className="border-collapse border-b p-4">Status</th>
                  <th className="border-collapse border-b p-4">Status</th>
                  <th className="border-collapse border-b p-4">Uploaded</th>
                  <th className="border-collapse border-b p-4">Rating</th>
                  <th className="border-collapse border-b p-4">
                    Date uploaded
                  </th>
                  <th className="border-collapse border-b p-4"></th>
                </tr>
              </thead>
              <tbody>
                {videos?.length > 0 &&
                  videos.map((currVal, id) => (
                    <SingleVideoDetails video={currVal} key={id} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {location.pathname.substring(11, 20) == "editVideo" && (
          <EditVideo video={video} />
        )}

        {location.pathname.substring(11, 22) == "deleteVideo" && (
          <DeleteVideo video={video} />
        )}
      </>
    );
  }
}

export default AdminDashboard;
