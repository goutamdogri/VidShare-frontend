import { useLocation, useParams } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";
import SingleChannelCommunityPost from "./SingleChannelCommunityPost";
import EmptyCommunityPost from "./EmptyCommunityPost";
import { useState } from "react";
import apiRequest from "../../../hooks/apiRequest";

function ChannelCommunityPost() {
  const { channelId } = useParams();
  const location = useLocation();
  const [post, setPost] = useState("");

  const { data: communityPost } = usePagination(
    `/community/user/${channelId}/?page=`,
    `&limit=9`
  );

  async function handleSubmit() {
    const info = {
      content: post,
    };
    try {
      await apiRequest(
        "/community/",
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify(info)
      );
      setPost("")
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="px-4 pb-4">
      {communityPost?.length > 0 && (
        <>
          {location.pathname.substring(1, 10) == "myChannel" && (
            <div className="mt-2 border pb-2">
              <textarea
                className="mb-2 h-10 w-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
                placeholder="Write a community post"
                value={post}
                onChange={(e) => setPost(e.target.value)}
              ></textarea>
              <div className="flex items-center justify-end gap-x-3 px-3">
                {/* <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    ></path>
                  </svg>
                </button>
                <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    ></path>
                  </svg>
                </button> */}
                <button
                  onClick={handleSubmit}
                  className="bg-[#ae7aff] px-3 py-2 font-semibold text-black"
                >
                  Send
                </button>
              </div>
            </div>
          )}

          <div className="py-4">
            {communityPost.map((currVal, id) => (
              <SingleChannelCommunityPost key={id} communityPost={currVal} />
            ))}
          </div>
        </>
      )}
      {communityPost?.length == 0 && (
        <EmptyCommunityPost
          ifNewPost={location.pathname.substring(1, 10) == "myChannel"}
        />
      )}
    </div>
  );
}

export default ChannelCommunityPost;
