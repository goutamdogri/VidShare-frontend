import propTypes from "prop-types";
import TimeAgo from "../TimeAgo.jsx";

function Comment({ comment }) {
  return (
    <div>
      <div className="flex gap-x-4">
        <div className="mt-2 h-11 w-11 shrink-0">
          <img
            src={comment.owner.avatar}
            alt="sarahjv"
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="block">
          <p className="flex items-center text-gray-200">
            {comment.owner.fullName} ·{" "}
            <TimeAgo createdAt={comment.createdAt} className="text-sm" />
          </p>
          <p className="text-sm text-gray-200">{comment.owner.username}</p>
          <p className="mt-3 text-sm">{comment.content}</p>
        </div>
      </div>
      <hr className="my-4 border-white" />
    </div>
  );
}

Comment.propTypes = {
  comment: propTypes.object,
};

export default Comment;
