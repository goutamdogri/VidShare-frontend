import { useParams } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";
import SingleChannelCommunityPost from "./SingleChannelCommunityPost";
import EmptyCommunityPost from "./EmptyCommunityPost";

function ChannelCommunityPost() {
  const { channelId } = useParams();

  const { data: communityPost } = usePagination(
    `/community/user/${channelId}/?page=`,
    `&limit=9`
  );

  return (
    <div className="px-4 pb-4">
      {communityPost?.length > 0 && (
        <div className="py-4">
          {communityPost.map((currVal, id) => (
            <SingleChannelCommunityPost key={id} communityPost={currVal} />
          ))}
        </div>
      )}
      {communityPost?.length == 0 && <EmptyCommunityPost />}
    </div>
  );
}

export default ChannelCommunityPost;
