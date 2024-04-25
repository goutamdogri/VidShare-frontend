import propTypes from "prop-types";
import apiRequest from "../../../hooks/apiRequest";
import { useEffect, useState } from "react";
import TimeAgo from "../../TimeAgo";
import { Link } from "react-router-dom";

function PlaylistVideo({ videoId }) {
  const [video, setVideo] = useState({});

  useEffect(() => {
    fetchVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const fetchVideo = async () => {
    try {
      const res = await apiRequest(`/videos/${videoId}`);
      setVideo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link to={`/video/${videoId}`} className="border">
      <div className="w-full max-w-3xl gap-x-4 sm:flex">
        <div className="relative mb-2 w-full sm:mb-0 sm:w-5/12">
          <div className="w-full pt-[56%]">
            <div className="absolute inset-0">
              <img
                src={video.thumbnail}
                alt="JavaScript Fundamentals: Variables and Data Types"
                className="h-full w-full"
              />
            </div>
            <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
              {Math.floor(video.duration)}
            </span>
          </div>
        </div>
        <div className="flex gap-x-2 px-2 sm:w-7/12 sm:px-0">
          <Link
            to={`/channel/video/${video?.owner?._id}`}
            className="h-10 w-10 shrink-0 sm:hidden"
          >
            <img
              src={video?.owner?.avatar}
              className="h-full w-full rounded-full"
            />
          </Link>
          <div className="w-full">
            <h6 className="mb-1 font-semibold sm:max-w-[75%]">{video.title}</h6>
            <p className="flex text-sm text-gray-200 sm:mt-3">
              {`${video.views} Views · `}
              <TimeAgo createdAt={video?.createdAt} />
            </p>
            <div
              to={`/channel/video/${video?.owner?._id}`}
              className="flex items-center gap-x-4"
            >
              <Link
                to={`/channel/video/${video?.owner?._id}`}
                className="mt-2 hidden h-10 w-10 shrink-0 sm:block"
              >
                <img
                  src={video?.owner?.avatar}
                  alt="codemaster"
                  className="h-full w-full rounded-full"
                />
              </Link>
              <Link
                to={`/channel/video/${video?.owner?._id}`}
                className="text-sm text-gray-200"
              >
                {video?.owner?.fullName}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

PlaylistVideo.propTypes = {
  videoId: propTypes.string,
};

export default PlaylistVideo;
