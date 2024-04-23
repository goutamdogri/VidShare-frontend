import propTypes from 'prop-types'
import TimeAgo from '../../TimeAgo';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiRequest from '../../../hooks/apiRequest';


function Playlist({playlist}) {
  const [video, setVideo] = useState({})
  const [playlistView, setPlaylistView] = useState(0)

  useEffect(() => {
    fetchVideo()
    fetchPlaylistViews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist])

  const fetchVideo = async () => {
    try {
      const res = await apiRequest(`/videos/${playlist.videos[0]}`)
      setVideo(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchPlaylistViews = async () => {
    try {
      const res = await apiRequest(`/playlist/details/${playlist._id}`)
      console.log(res);
      setPlaylistView(res.data[0].totalViews)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Link to={`/channel/playlist/details/${playlist._id}`} className="w-full">
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          <img
            src={video?.thumbnail}
            alt="React Mastery"
            className="h-full w-full"
          />
          <div className="w-full absolute ins
          et-x-0 bottom-0">
            <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
              <div className="relative z-[1]">
                <p className="flex justify-between">
                  <span className="inline-block">Playlist</span>
                  <span className="inline-block">{`${playlist.videos.length} videos`}</span>
                </p>
                <p className="text-sm text-gray-200">
                  {`${playlistView} Views · `}
                  <TimeAgo createdAt={playlist.createdAt} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h6 className="mb-1 font-semibold">{playlist.name}</h6>
      <p className="flex text-sm text-gray-200">
        {playlist.description}
      </p>
    </Link>
  );
}

Playlist.propTypes = {
  playlist: propTypes.object,
};

export default Playlist;
