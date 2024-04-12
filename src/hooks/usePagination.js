import { useEffect, useState } from "react";
import apiRequest from "./apiRequest";

function usePagination(url1, url2) {
  const [data, setData] = useState([]);
  const [addInfo, setaddInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  
console.log(url2);
  useEffect(() => {
    fetchMoreData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchMoreData = async () => {
    try {
      const res = await apiRequest(`${url1 + page + url2}`);
      setData((prevVideos) => [...prevVideos, ...res.data.docs]);
      setLoading(false);
      setaddInfo({
        totalDocs: res.data.totalDocs,
        limit: res.data.limit,
        page: res.data.page,
        totalPages: res.data.totalPages,
        pagingCounter: res.data.pagingCounter,
        hasPrevPage: res.data.hasPrevPage,
        hasNextPage: res.data.hasNextPage,
        prevPage: res.data.prevPage,
        nextPage: res.data.nextPage
      })
    } catch (error) {
      console.error("Error fetching videos: ", error);
    }
  };

  useEffect(() => {
    if (addInfo.hasNextPage) {
      document
        .getElementById("scrollingDiv")
        .addEventListener("scroll", handelInfiniteScroll);
      return () => {
        document
          .getElementById("scrollingDiv")
          .removeEventListener("scroll", handelInfiniteScroll);
      };
    }
  });

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight +
          document.getElementById("scrollingDiv").scrollTop +
          2 >=
        document.getElementById("scrollingDiv").scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { data, addInfo, loading };
}

export default usePagination;
