import VideoPlayer from "./VideoPlayer.jsx";
import VideoDetailsBox from "./VideoDetailsBox.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentBox from "../comment/CommentBox.jsx";
import VidRecom from "./VidRecom.jsx";
import apiRequest from "../../hooks/apiRequest.js";
import usePagination from "../../hooks/usePagination.js";

function VideoPlay() {
  const [video, setVideo] = useState({});
  const { videoId } = useParams();

  // TODO: NEED TO SYNCHRONIZE comment and recommendation video load when pagination happens.
  const {data: videos} = usePagination(`/videos/?page=`, `&limit=15&sortBy=title&sortType=-1&isPublished=all`) //💯if the hook function is async then it return promise.

  // get video
  const fetchVideo = async () => {
    try {
      const res = await apiRequest(`/videos/${videoId}`);
      setVideo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // add view
  const addView = async () => {
    console.log(videoId);
      await apiRequest(`/videos/add/view/${videoId}`, "PATCH");
  };

  useEffect(() => {
    fetchVideo();
    addView(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
      <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
        <div className="col-span-12 w-full">
          {/* video */}
          {video.videoFile && <VideoPlayer videoFile={video.videoFile} />}

          {/* video details box */}
          {video._id && <VideoDetailsBox video={video} />}

          {/* comment box */}
          {video._id && <CommentBox videoId={video._id} />}
        </div>

        {/* video recommendations */}
        <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
          {/* single video recommendations */}
          {videos?.length > 0 && videos.map((currVal, id) => (
            <VidRecom key={id} video={currVal} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default VideoPlay;
