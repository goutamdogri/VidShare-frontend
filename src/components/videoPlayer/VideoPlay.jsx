import VideoPlayer from "./VideoPlayer.jsx";
import VideoDetailsBox from "./VideoDetailsBox.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentBox from "../comment/CommentBox.jsx";
import VidRecom from "./VidRecom.jsx";
import apiRequest from "../../hooks/apiRequest.js";

function VideoPlay() {
  const [video, setVideo] = useState({});
  const { videoId } = useParams();
  const [recomVideos, setRecomVideos] = useState([]);

  useEffect(() => {
    setVideo({}); // so that when new video is added at firsft older one should be clear. otherwise some times it shown the older video when you go to new video in the ui. data stored and data stream from one component to another component properly but does not shown in the ui. eg. - when video clicked from video player video recommendation video
    setRecomVideos([]);
    fetchVideo();
    addView();
    fetchRecommendationVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  // fetch recommendation video
  const fetchRecommendationVideo = async () => {
    try {
      const res = await apiRequest(
        `/videos/?page=1&limit=20&sortBy=title&sortType=-1&isPublished=all`
      ); //💯if the hook function is async then it return promise.
      setRecomVideos(res.data.docs);
    } catch (error) {
      console.log(error);
    }
  };

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
    await apiRequest(`/videos/add/view/${videoId}`, "PATCH");
  };

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
          {recomVideos?.length > 0 &&
            recomVideos.map((currVal, id) => (
              <VidRecom key={id} video={currVal} />
            ))}
        </div>
      </div>
    </section>
  );
}

export default VideoPlay;
