import { useEffect, useState } from "react";
import CardVid from "./CardVid.jsx";

function CardVidList() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);

  console.log("render check");
  const getCardData = async () => {
    const res = await fetch(
      `http://localhost:8000/api/v1/videos/?page=${page}&limit=9&sortBy=title&sortType=1&userId=65e941f01875ea1787e3acbb&isPublished=all`
    );
    const APIdata = await res.json();
    const vidData = APIdata.data.docs;
    console.log(vidData);
    setData((prev) => [...prev, ...vidData]);
  };

  useEffect(() => {
    getCardData();
  }, [page]);

  const handelInfiniteScroll = async () => {
    console.log("i am in handelInfiniteScroll");

    console.log("innerHeight" + window.innerHeight);
    console.log("scrollTop" + document.documentElement.scrollTop);
    console.log("scrollHeight" + document.documentElement.scrollHeight);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.getElementById("scrollingEffect").addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <div id="scrollingEffect" className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
        {data.map((currVal, id) => (
          <CardVid key={id} data={currVal} />
        ))}
      </div>
    </div>
  )
}

export default CardVidList;