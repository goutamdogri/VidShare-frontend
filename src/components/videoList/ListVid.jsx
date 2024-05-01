import propTypes from "prop-types";
import TimeAgo from "../TimeAgo.jsx";
import { Link } from "react-router-dom";

function ListVid({ data }) {
  return (
    <Link to={`/video/${data._id}`}>
      <div className="w-full max-w-3xl gap-x-4 md:flex">
        <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
          <div className="w-full pt-[56%]">
            <div className="absolute inset-0">
              <img
                src={data.thumbnail}
                alt="Getting Started with Express.js"
                className="h-full w-full"
              />
            </div>
            <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
              {Math.floor(data.duration)}
            </span>
          </div>
        </div>
        <div className="flex gap-x-2 md:w-7/12">
          <div className="h-10 w-10 shrink-0 md:hidden">
            <img
              src={data.owner.avatar}
              alt="expresslearner"
              className="h-full w-full rounded-full"
            />
          </div>
          <div className="w-full">
            <h6 className="mb-1 font-semibold md:max-w-[75%]">{data.title}</h6>
            <p className="flex text-sm text-gray-200 sm:mt-3">
              {`${data.views} Views · `}
              <TimeAgo createdAt={data.createdAt} />
            </p>
            <div className="flex items-center gap-x-4">
              <Link
                to={`/channel/video/${data.owner._id}`}
                className="mt-2 hidden h-10 w-10 shrink-0 md:block"
              >
                <img
                  src={data.owner.avatar}
                  alt="expresslearner"
                  className="h-full w-full rounded-full"
                />
              </Link>
              <p className="text-sm text-gray-200">{data.owner.fullName}</p>
            </div>
            <Link to={`/channel/video/${data.owner._id}`} className="w-full">
              <p className="mt-2 hidden text-sm md:block">
                {`${data.description?.substring(0, 100)}...`}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}

ListVid.propTypes = {
  data: propTypes.object,
};

export default ListVid;
