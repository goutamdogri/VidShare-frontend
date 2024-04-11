import VideoPlayer from "./VideoPlayer.jsx";
import VideoDetailsBox from "./VideoDetailsBox.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentBox from "../comment/CommentBox.jsx";
import VidRecom from "./VidRecom.jsx";

function VideoPlay() {
  const [video, setVideo] = useState({});
  const { videoId } = useParams();

  // get video
  const fetchVideo = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/videos/${videoId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const resJson = await res.json();
      // console.log("resJson", resJson);
      setVideo(resJson.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideo();
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
          <VidRecom />
        </div>
      </div>
    </section>
  );
}

export default VideoPlay;
