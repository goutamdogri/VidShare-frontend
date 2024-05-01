import { useNavigate, useParams } from "react-router-dom";
import ChannelVideoList from "../../Channel/video/ChannelVideoList";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

function MyChannelVideo() {
  const navigate = useNavigate();
  const { channelId } = useParams();
  const { user } = useContext(UserContext);

  if (channelId != user?._id) {
    navigate(`/channel/video/${channelId}`, { replace: true });
  } else {
    return <ChannelVideoList />;
  }
}

export default MyChannelVideo;
