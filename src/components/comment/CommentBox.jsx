import Comment from "./Comment.jsx";
import { useContext, useState } from "react";
import propTypes from "prop-types";
import UserContext from "../../contexts/UserContext.js";
import usePagination from "../../hooks/usePagination.js";

function CommentBox({ videoId }) {
  const [newComment, setNewComment] = useState("");
  const [addNewComment, setAddNewComment] = useState([]);
  const { user } = useContext(UserContext);

  const {data: comments, addInfo, loading} = usePagination(`/comments/v/video/${videoId}?page=`, `&limit=10`)

  // add comment
  async function addComment(e) {
    e.preventDefault();

    const newCommentData = {
      content: newComment,
    };
    try {
      const res = await fetch(
        `https://vidshareforbackend.goutamdogri.com/api/v1/comments/v/video/${videoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCommentData),
          credentials: "include",
        }
      );
      const resJson = await res.json();
      if (resJson.data.owner === user._id) {
        resJson.data.owner = user;
      }
      setAddNewComment((prev) => [resJson.data, ...prev])
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  }

  // update comment
  // async function updateComment() {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:8000/api/v1/comments/c/:commentId`,
  // 			{
  // 				method: "PATCH",
  // 				credentials: "include"
  // 			}
  //     );
  // 		const resJson = await res.json();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // // delete comment
  // async function deleteComment() {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:8000/api/v1/comments/c/:commentId`,
  // 			{
  // 				method: "DELETE",
  // 				credentials: "include"
  // 			}
  //     );
  // 		const resJson = await res.json();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <>
      {/* commentBox input area start  */}
      <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
        <h6 className="font-semibold">{addInfo.totalDocs} Comments...</h6>
      </button>

      <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
        <div className="block">
          <h6 className="mb-4 font-semibold">{addInfo.totalDocs} Comments</h6>
          <input
            type="text"
            className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
            placeholder="Add a Comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={addComment}
            type="submit"
            className="px-3 py-1 bg-gray-700 mt-2 rounded-r-full rounded-l-full hover:bg-slate-500"
          >
            Comment
          </button>
        </div>
        <hr className="my-4 border-white" />
        {/* commentBox input area end  */}

        {/* added new comment */}
        {addNewComment[0] &&
          addNewComment.map((currVal, id) => <Comment key={id} comment={currVal} />)}

        {/* Comments */}
        {comments[0] &&
          comments.map((currVal, id) => <Comment key={id} comment={currVal} />)}

        {loading && (
          <div className="text-center">
            <p className="text-white text-lg font pb-4">Loading...</p>
          </div>
        )}
        {!addInfo.hasNextPage && (
          <div className="text-center">
            <p className="text-white text-lg font pb-4">No more comment</p>
          </div>
        )}
      </div>
    </>
  );
}

CommentBox.propTypes = {
  videoId: propTypes.string,
};

export default CommentBox;
