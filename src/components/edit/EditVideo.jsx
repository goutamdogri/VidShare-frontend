import propTypes from "prop-types";
import { useEffect, useState } from "react";
import apiRequest from "../../hooks/apiRequest";
import { useNavigate, useParams } from "react-router-dom";

function EditVideo({ video }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState("");
  const { channelId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (video?.title) {
      setTitle(video.title);
      setDescription(video.description);
      setPreview(video.thumbnail);
    }
  }, [video]);

  const previewLoader = async () => {
    deletePreview();
    const formData = new FormData();
    formData.append("previewFile", thumbnail);
    try {
      const res = await apiRequest("/preview/load", "POST", null, formData);
      console.log(res);
      setPreview(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePreview = async () => {
    const info = {
      url: preview,
    };
    try {
      const res = await apiRequest(
        "/preview/delete",
        "POST",
        { "Content-Type": "application/json" },
        JSON.stringify(info)
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (thumbnail) {
      previewLoader();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbnail]);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("description", description);
    try {
      await apiRequest(
        `/videos/${video._id}`,
        "PATCH",
        null,
        formData
      );
      navigate(`/dashboard/admin/${channelId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async () => {
    deletePreview()
    setThumbnail(null);
    setTitle(video.title);
    setDescription(video.description);
    navigate(`/dashboard/admin/${channelId}`);
  };

  return (
    <div className="fixed inset-0 top-[calc(66px)] z-10 flex flex-col bg-black/50 px-4 pb-[86px] pt-4 sm:top-[calc(82px)] sm:px-14 sm:py-8">
      <div className="mx-auto w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-[#121212] p-4">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-xl font-semibold">
            Edit Video
            <span className="block text-sm text-gray-300">
              Share where you&#x27;ve worked on your profile.
            </span>
          </h2>
          <button onClick={handleCancel} className="h-6 w-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <label htmlFor="thumbnail" className="mb-1 inline-block">
          Thumbnail<sup>*</sup>
        </label>
        <label
          className="relative mb-4 block cursor-pointer border border-dashed p-2 after:absolute after:inset-0 after:bg-transparent hover:after:bg-black/10"
          htmlFor="thumbnail"
        >
          <input
            type="file"
            className="sr-only"
            id="thumbnail"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
          <img src={preview} alt="" />
        </label>
        <div className="mb-6 flex flex-col gap-y-4">
          <div className="w-full">
            <label htmlFor="title" className="mb-1 inline-block">
              Title<sup>*</sup>
            </label>
            <input
              id="title"
              type="text"
              className="w-full border bg-transparent px-2 py-1 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label htmlFor="desc" className="mb-1 inline-block">
              Description<sup>*</sup>
            </label>
            <textarea
              id="desc"
              className="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={handleCancel} className="border px-4 py-3">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-[#ae7aff] px-4 py-3 text-black disabled:bg-[#E4D3FF]"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

EditVideo.propTypes = {
  video: propTypes.object,
};

export default EditVideo;
