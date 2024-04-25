import { useParams } from "react-router-dom";
import PlaylistVideo from "./PlaylistVideo";
import apiRequest from "../../../hooks/apiRequest";
import { useEffect, useState } from "react";
import TimeAgo from "../../TimeAgo";

function PlaylistDetails() {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState({});
  const [playlistOwner, setPlaylistOwner] = useState({});
  const [video, setVideo] = useState({})
  const [playlistView, setPlaylistView] = useState(0)

  useEffect(() => {
    fetchDetails();
    fetchPlaylistViews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistId]);

  const fetchDetails = async () => {
    try {
      const res = await apiRequest(`/playlist/${playlistId}`);
      setPlaylist(res.data);
      const data = await apiRequest(`/users/c/${res.data.owner}`);
      setPlaylistOwner(data.data);
      const vidDetails = await apiRequest(`/videos/${res.data.videos[0]}`)
      setVideo(vidDetails.data)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlaylistViews = async () => {
    try {
      const res = await apiRequest(`/playlist/details/${playlistId}`)
      setPlaylistView(res.data[0].totalViews)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
        <div className="w-full shrink-0 sm:max-w-md xl:max-w-sm">
          {/* Playlist details */}
          <div className="relative mb-2 w-full pt-[56%]">
            <div className="absolute inset-0">
              <img
                src={video.thumbnail}
                className="h-full w-full"
              />
              <div className="absolute inset-x-0 bottom-0">
                <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                  <div className="relative z-[1]">
                    <p className="flex justify-between">
                      <span className="inline-block">Playlist</span>
                      <span className="inline-block">
                        {`${playlist?.videos?.length} videos`}
                      </span>
                    </p>
                    <p className="text-sm text-gray-200">
                    {`${playlistView} Views · `}
                      <TimeAgo createdAt={playlist?.createdAt} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h6 className="mb-1 font-semibold">{playlist?.name}</h6>
          <p className="flex text-sm text-gray-200">{playlist?.description}</p>
          <div className="mt-6 flex items-center gap-x-3">
            <div className="h-16 w-16 shrink-0">
              <img
                src={playlistOwner.avatar}
                className="h-full w-full rounded-full"
              />
            </div>
            <div className="w-full">
              <h6 className="font-semibold">{playlistOwner?.fullName}</h6>
              <p className="text-sm text-gray-300">
                {playlistOwner?.subscribersCount} Subscribers
              </p>
            </div>
          </div>
        </div>

        {/* video in the playlist */}
        <div className="flex w-full flex-col gap-y-4">
          {playlist?.videos?.length > 0 &&
            playlist.videos.map((currVal, id) => (
              <PlaylistVideo key={id} videoId={currVal} />
            ))}
        </div>
      </div>
    </section>
  );
}

export default PlaylistDetails;
