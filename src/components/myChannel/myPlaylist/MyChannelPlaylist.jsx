import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import ChannelPlaylist from "../../Channel/playlist/ChannelPlaylist";

function MyChannelPlaylist() {
  const navigate = useNavigate();
  const { channelId } = useParams();
  const { user } = useContext(UserContext);

  if (channelId != user?._id) {
    navigate(`/channel/playlist/${channelId}`, { replace: true });
  } else {
    return <ChannelPlaylist />;
  }
}

export default MyChannelPlaylist;
