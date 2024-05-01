import { useNavigate, useParams } from "react-router-dom";
import ChannelCommunityPost from "../../Channel/communityPost/ChannelCommunityPost";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

function MyChannelCommunityPost() {
  const navigate = useNavigate();
  const { channelId } = useParams();
  const { user } = useContext(UserContext);

  if (channelId != user?._id) {
    navigate(`/channel/communityPost/${channelId}`, { replace: true });
  } else {
    return <ChannelCommunityPost />;
  }
}

export default MyChannelCommunityPost;
