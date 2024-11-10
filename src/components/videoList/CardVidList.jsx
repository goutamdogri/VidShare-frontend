import CardVid from "./CardVid.jsx";
import ListVid from "./ListVid.jsx";
import propTypes from "prop-types";
import usePagination from "../../hooks/usePagination.js";

function CardVidList({ endPoint = "" }) {

  const {
    data: videos,
    addInfo,
    loading,
  } = usePagination(
    `/videos/?page=`,
    `&limit=9&sortBy=title&sortType=1&isPublished=true`
  );

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      {endPoint === "home" && (
        // <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {videos?.length > 0 &&
            videos.map((currVal, id) => <CardVid key={id} data={currVal} />)}
        </div>
      )}

      {endPoint === "search" && (
        <div className="flex flex-col gap-4 p-4">
          {videos?.length > 0 &&
            videos.map((currVal, id) => <ListVid key={id} data={currVal} />)}
        </div>
      )}

      {loading && (
        <div className="text-center">
          <p className="text-white text-lg font pb-4">Loading...</p>
        </div>
      )}

      {!addInfo.hasNextPage && (
        <div className="text-center">
          <p className="text-white text-lg font pb-4">No more videos</p>
        </div>
      )}
    </section>
  );
}

CardVidList.propTypes = {
  endPoint: propTypes.string,
};

export default CardVidList;
