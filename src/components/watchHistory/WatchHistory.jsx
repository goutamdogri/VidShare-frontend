import { useEffect, useState } from "react";
import apiRequest from "../../hooks/apiRequest";
import ListVid from "../videoList/ListVid";


function WatchHistory() {
	const [videos, setVideos] = useState([]);

	const fetchHistory = async () => {
		try {
			const res = await apiRequest("/users/history")
			setVideos(res.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
    fetchHistory();
  }, [])
	
	return (
		<section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="flex flex-col gap-4 p-4">
        {videos?.length > 0 &&
          videos.map((currVal, id) => <ListVid key={id} data={currVal} />)}
      </div>
    </section>
	)
}

export default WatchHistory
