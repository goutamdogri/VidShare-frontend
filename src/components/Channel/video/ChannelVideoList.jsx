import { useParams } from "react-router-dom";
import ChannelVideoTemplete from "./ChannelVideoTemplete";
import usePagination from "../../../hooks/usePagination.js";

function ChannelVideoList() {
  const { channelId } = useParams();

  const { data: videos } = usePagination(
    `/dashboard/stats/videos/${channelId}?page=`,
    "&limit=9"
  );

  return (
    <div className="px-4 pb-4">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2">
        {videos?.length > 0 &&
          videos.map((currVal, id) => (
            <ChannelVideoTemplete key={id} video={currVal} />
          ))}
      </div>
    </div>
  );
}

export default ChannelVideoList;
