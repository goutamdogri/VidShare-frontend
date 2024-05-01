import propTypes from "prop-types";
import { useEffect, useState } from "react";
import apiRequest from "../../hooks/apiRequest";
import { Link, useParams } from "react-router-dom";

function SingleVideoDetails({ video }) {
  const [publishStatus, setPublishStatus] = useState();
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const { channelId } = useParams();

  const fetchLikeAndDislikeCount = async () => {
    try {
      const resLike = await apiRequest(`/likes/video/${video._id}`);
      const resDislike = await apiRequest(`/dislikes/video/${video._id}`);
      setLikeCount(resLike.data.videoLikesCount);
      setDislikeCount(resDislike.data.videoDislikesCount);
    } catch (error) {
      console.log(error);
    }
  };

  const videoPublishStatus = () => {
    if (video.isPublished) {
      document.getElementById(`${video._id}-checkbox`).checked = true;
    }
  };

  const togglePublishStatus = async () => {
    try {
      const res = await apiRequest(
        `/videos/toggle/publish/${video._id}`,
        "PATCH"
      );
      setPublishStatus(res.data.isPublished);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPublishStatus(video.isPublished);
    videoPublishStatus();
    fetchLikeAndDislikeCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video]);

  return (
    <tr className="group border">
      <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
        <div className="flex justify-center">
          <label
            htmlFor={`${video._id}-checkbox`}
            className="relative inline-block w-12 cursor-pointer overflow-hidden"
          >
            <input
              type="checkbox"
              id={`${video._id}-checkbox`}
              className="peer sr-only"
              onChange={(e) => togglePublishStatus(e.target.checked)}
            />
            <span className="inline-block h-6 w-full rounded-2xl bg-gray-200 duration-200 after:absolute after:bottom-1 after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-black after:duration-200 peer-checked:bg-[#ae7aff] peer-checked:after:left-7"></span>
          </label>
        </div>
      </td>

      <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
        {publishStatus && (
          <div className="flex justify-center">
            <span className="inline-block rounded-2xl border px-1.5 py-0.5 border-green-600 text-green-600">
              Published
            </span>
          </div>
        )}

        {!publishStatus && (
          <div className="flex justify-center">
            <span className="inline-block rounded-2xl border px-1.5 py-0.5 border-orange-600 text-orange-600">
              Unpublished
            </span>
          </div>
        )}
      </td>

      <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
        <div className="flex items-center gap-4">
          <img
            className="h-10 w-10 rounded-full"
            src={video.thumbnail}
            alt="Code Master"
          />
          <h3 className="font-semibold">{video.title}</h3>
        </div>
      </td>

      <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
        <div className="flex justify-center gap-4">
          <span className="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
            {likeCount} likes
          </span>
          <span className="inline-block rounded-xl bg-red-200 px-1.5 py-0.5 text-red-700">
            {dislikeCount} dislikes
          </span>
        </div>
      </td>

      <td className="border-collapse border-b border-gray-600 px-4 py-3 text-center group-last:border-none">
        {`${video.createdAt.substring(8, 10)}/${video.createdAt.substring(
          5,
          7
        )}/${video.createdAt.substring(0, 4)}`}
      </td>

      <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
        <div className="flex gap-4">
          <Link to={`/dashboard/editVideo/${channelId}/${video._id}`}>
            <button className="h-5 w-5 hover:text-[#ae7aff]">
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                ></path>
              </svg>
            </button>
          </Link>
          <Link to={`/dashboard/deleteVideo/${channelId}/${video._id}`}>
            <button className="h-5 w-5 hover:text-[#ae7aff]">
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );
}

SingleVideoDetails.propTypes = {
  video: propTypes.object,
};

export default SingleVideoDetails;
