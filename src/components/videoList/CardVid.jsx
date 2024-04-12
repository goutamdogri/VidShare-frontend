import propTypes from 'prop-types';
import TimeAgo from '../TimeAgo.jsx';
import { Link } from 'react-router-dom'

function CardVid({ data }) {
    return (
        <Link to={`/video/${data._id}`}>
            <div className="w-full">
                <div className="relative mb-2 w-full pt-[56%]">
                    <div className="absolute inset-0">
                        <img
                            src={data.thumbnail}
                            alt="JavaScript Fundamentals: Variables and Data Types"
                            className="h-full w-full"
                        />
                    </div>
                    <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                        {Math.floor(data.duration)}
                    </span>
                </div>
                <div className="flex gap-x-2">
                    <div className="h-10 w-10 shrink-0">
                        <img
                            src={data.owner.avatar}
                            alt="codemaster"
                            className="h-full w-full rounded-full"
                        />
                    </div>
                    <div className="w-full">
                        <h6 className="mb-1 font-semibold">
                            {data.title}
                        </h6>
                        <p className="flex text-sm text-gray-200">
                            {`${data.views} Views · `}
                            <TimeAgo createdAt={data.createdAt} />
                        </p>
                        <p className="text-sm text-gray-200">{data.owner.fullName}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

CardVid.propTypes = {
    data: propTypes.object,
    // thumbnail: propTypes.string,
    // avatar: propTypes.string,
    // duration: propTypes.number,
    // title: propTypes.string,
    // views: propTypes.number,
    // time: propTypes.number,
    // channelName: propTypes.string
}

export default CardVid;
