import { useEffect, useState } from "react";

function usePagination(url1, url2) {
  const [data, setData] = useState([]);
  const [addInfo, setaddInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMoreData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchMoreData = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1${url1 + page + url2}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const APIdata = await res.json();
      setData((prevVideos) => [...prevVideos, ...APIdata.data.docs]);
      setLoading(false);
      setaddInfo({
        totalDocs: APIdata.data.totalDocs,
        limit: APIdata.data.limit,
        page: APIdata.data.page,
        totalPages: APIdata.data.totalPages,
        pagingCounter: APIdata.data.pagingCounter,
        hasPrevPage: APIdata.data.hasPrevPage,
        hasNextPage: APIdata.data.hasNextPage,
        prevPage: APIdata.data.prevPage,
        nextPage: APIdata.data.nextPage
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
