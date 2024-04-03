import { useEffect, useState } from "react";
import CardVid from "./CardVid.jsx";

function CardVidList() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMoreData();
  }, [page]);

  const fetchMoreData = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/videos/?page=${page}&limit=9&sortBy=title&sortType=1&isPublished=all`, 
        {
          credentials: 'include'
        }
      );
      const APIdata = await res.json();
      setVideos((prevVideos) => [...prevVideos, ...APIdata.data.docs]);
      setLoading(false)
      setHasMore(APIdata.data.hasNextPage);
    } catch (error) {
      console.error("Error fetching videos: ", error);
    }
  };

  useEffect(() => {
    if (hasMore) {
      document.getElementById("scrollingDiv").addEventListener("scroll", handelInfiniteScroll);
      return () => {
        document.getElementById("scrollingDiv").removeEventListener("scroll", handelInfiniteScroll);
      }
    }
  })

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.getElementById("scrollingDiv").scrollTop + 1 >=
        document.getElementById("scrollingDiv").scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
        {videos.map((currVal, id) => (
          <CardVid key={id} data={currVal} />
        ))}
      </div>
      {loading && (
        <div className="text-center">
          <p className="text-white text-lg font pb-4">Loading...</p>
        </div>
      )}
      {!hasMore && (
        <div className="text-center">
          <p className="text-white text-lg font pb-4">No more videos</p>
        </div>
      )}
    </div>
  );
}

export default CardVidList;
