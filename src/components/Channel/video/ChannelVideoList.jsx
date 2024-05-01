import { Link, useLocation, useParams } from "react-router-dom";
import ChannelVideoTemplete from "./ChannelVideoTemplete";
import usePagination from "../../../hooks/usePagination.js";
import EmptyChannelVideo from "./EmptyChannelVideo.jsx";
import UploadVideo from "../../uploadVideo/UploadVideo.jsx";
import { useEffect, useState } from "react";

function ChannelVideoList() {
  const { channelId } = useParams();
  const location = useLocation();
  const [upload, setUpload] = useState(false);

  const { data: videos } = usePagination(
    `/dashboard/stats/videos/${channelId}?page=`,
    "&limit=9"
  );

  useEffect(() => {
    if(location.pathname.substring(11, 17) == "upload") {
      setUpload(true)
    } else {
      setUpload(false)
    }
  },[location])

  return (
    <div className="px-4 pb-4">
      {videos?.length > 0 && (
        <>
          {location.pathname.substring(1, 10) == "myChannel" && (
            <Link to={`/myChannel/upload/video/${channelId}`}>
              <button className="w-full mt-4 inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black justify-center">
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
                New video
              </button>
            </Link>
          )}
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2">
            {videos.map((currVal, id) => (
              <ChannelVideoTemplete key={id} video={currVal} />
            ))}
          </div>
        </>
      )}
      {videos?.length == 0 && (
        <EmptyChannelVideo
          ifNewVid={location.pathname.substring(1, 10) == "myChannel"}
          channelId={channelId}
        />
      )}

      {upload && <UploadVideo />}
    </div>
  );
}

export default ChannelVideoList;
