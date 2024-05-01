import usePagination from "../../hooks/usePagination";
import ListVid from "../videoList/ListVid";

function LikedVideos() {
  const { data: videos } = usePagination("/likes/videos?page=", "&limit=9");
	
  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="flex flex-col gap-4 p-4">
        {videos?.length > 0 &&
          videos.map((currVal, id) => <ListVid key={id} data={currVal.video} />)}
      </div>
    </section>
  );
}

export default LikedVideos;
