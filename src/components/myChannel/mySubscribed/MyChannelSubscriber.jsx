import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import ChannelSubscribed from "../../Channel/subscribed/ChannelSubscribed";

function MyChannelSubscriber() {
  const navigate = useNavigate();
  const { channelId } = useParams();
  const { user } = useContext(UserContext);

  if (channelId != user?._id) {
    navigate(`/channel/subscribed/${channelId}`, { replace: true });
  } else {
    return <ChannelSubscribed />;
  }
}

export default MyChannelSubscriber;
