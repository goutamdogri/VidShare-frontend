import { useState } from "react";
import apiRequest from "../../hooks/apiRequest";

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [count, setCount] = useState(500);
  const [thanks, setThanks] = useState(false);

  const handleSubmit = async () => {
    if (count >= 0 && feedback.trim() != "") {
      const info = {
        content: feedback,
      };
      try {
        await apiRequest(
          "/feedback/",
          "POST",
          { "Content-Type": "application/json" },
          JSON.stringify(info)
        );
        setFeedback("");
        setCount(500);
        setThanks(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0 p-6">
      <p>Feedback</p>
      <p>Your feedback helps us to better the product, for you</p>
      {thanks && <p className="text-green-500">Thanks for your feedback!</p>}
      <div className="mt-2 border pb-2">
        <textarea
          className="mb-2 h-40 w-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
          placeholder="Write a community post"
          value={feedback}
          onChange={(e) => {
            setFeedback(e.target.value);
            setCount(500 - e.target.value.length);
          }}
        ></textarea>
        <div className="flex items-center justify-end gap-x-3 px-3">
          <p className={count < 0 ? "text-red-500" : ""}>
            {count} character left
          </p>
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
            className={`bg-[#ae7aff] px-3 py-2 font-semibold text-black ${
              count < 0 ? "bg-[#4d3c67]" : ""
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}

export default Feedback;
