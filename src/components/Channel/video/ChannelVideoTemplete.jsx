import propTypes from "prop-types";
import TimeAgo from "../../TimeAgo";
import { Link } from "react-router-dom";

function ChannelVideoTemplete({ video }) {
  return (
    <Link to={`/video/${video._id}`} className="w-full">
      <div className="relative mb-2 w-full pt-[56%]">
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
      <h6 className="mb-1 font-semibold">{video.title}</h6>
      <p className="flex text-sm text-gray-200">
        {`${video.views} Views · `}
        <TimeAgo createdAt={video.createdAt} />
      </p>
    </Link>
  );
}

ChannelVideoTemplete.propTypes = {
  video: propTypes.object,
};

export default ChannelVideoTemplete;
