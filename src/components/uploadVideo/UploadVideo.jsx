import { useEffect, useState } from "react";
import apiRequest from "../../hooks/apiRequest";
import UploadingVideo from "./UploadingVideo";
import UploadedVideo from "./UploadedVideo";

function UploadVideo() {
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ifEmptyVideo, setIfEmptyVideo] = useState(false);
  const [ifEmptyThumbnail, setIfEmptyThumbnail] = useState(false);
  const [ifEmptyTitle, setIfEmptyTitle] = useState(false);
  const [ifEmptyDescription, setIfEmptyDescription] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  async function handleSubmit() {
    if (
      !ifEmptyVideo &&
      !ifEmptyThumbnail &&
      !ifEmptyTitle &&
      !ifEmptyDescription
    ) {
      setUploading(true);
      setUploaded(false);
      const formData = new FormData();
      formData.append("video", video);
      formData.append("thumbnail", thumbnail);
      formData.append("title", title);
      formData.append("description", description);
      try {
        await apiRequest("/videos/", "POST", null, formData);
        setUploading(false);
        setUploaded(true);
        setVideo(null);
        setThumbnail(null);
        setTitle("");
        setDescription("");
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (!video) setIfEmptyVideo(true);
    if (video) setIfEmptyVideo(false);
  }, [video]);
  useEffect(() => {
    if (!thumbnail) setIfEmptyThumbnail(true);
    if (thumbnail) setIfEmptyThumbnail(false);
  }, [thumbnail]);
  useEffect(() => {
    if (title.trim() == "") setIfEmptyTitle(true);
    if (title.trim() != "") setIfEmptyTitle(false);
  }, [title]);
  useEffect(() => {
    if (description.trim() == "") setIfEmptyDescription(true);
    if (description.trim() != "") setIfEmptyDescription(false);
  }, [description]);

  return (
    <>
      {!uploading && !uploaded && (
        <div className="absolute top-16 lg:left-60 sm:left-16 inset-0 z-10 bg-black/50 px-4 pb-[86px] pt-4 sm:px-14 sm:py-8">
          <div className="h-full overflow-auto border bg-[#121212]">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-xl font-semibold">Upload Videos</h2>
              <button
                onClick={handleSubmit}
                className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
              >
                Save
              </button>
            </div>
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-4 p-4">
              <div className="w-full border-2 border-dashed px-4 py-12 text-center">
                <span className="mb-4 inline-block w-24 rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
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
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    ></path>
                  </svg>
                </span>
                <h6 className="mb-2 font-semibold">
                  Drag and drop video files to upload
                </h6>
                <p className="text-gray-400">
                  Your videos will be private untill you publish them.
                </p>
                <label
                  htmlFor="upload-video"
                  className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                >
                  <input
                    type="file"
                    id="upload-video"
                    className="sr-only"
                    onChange={(e) => setVideo(e.target.files[0])}
                  />
                  Select Files
                </label>
              </div>
              {ifEmptyVideo && (
                <p className="text-red-500">Video can not be empty</p>
              )}

              <div className="w-full">
                <label htmlFor="thumbnail" className="mb-1 inline-block">
                  Thumbnail<sup>*</sup>
                </label>
                <input
                  id="thumbnail"
                  type="file"
                  className="w-full border p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
              </div>
              {ifEmptyThumbnail && (
                <p className="text-red-500">Thumbnail can not be empty</p>
              )}

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
              {ifEmptyTitle && (
                <p className="text-red-500">Title can not be empty</p>
              )}

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
              {ifEmptyDescription && (
                <p className="text-red-500">Description can not be empty</p>
              )}
            </div>
          </div>
        </div>
      )}

      {uploading && <UploadingVideo />}

      {uploaded && <UploadedVideo />}
    </>
  );
}

export default UploadVideo;
