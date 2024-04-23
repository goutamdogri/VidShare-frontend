import { useParams } from "react-router-dom";
import Playlist from "./Playlist";
import apiRequest from "../../../hooks/apiRequest.js";
import { useEffect, useState } from "react";

function ChannelPlaylist() {
  const { channelId } = useParams();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetchPlaylists()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId])

  const fetchPlaylists = async () => {
    try {
      const res = await apiRequest(`/playlist/user/${channelId}`)
      setPlaylists(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="px-4 pb-4">
      <div className="grid gap-4 pt-2 sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]">
        {playlists?.length > 0 &&
          playlists.map((currVal, id) => (
            <Playlist key={id} playlist={currVal} />
          ))}
      </div>
    </div>
  );
}

export default ChannelPlaylist;
