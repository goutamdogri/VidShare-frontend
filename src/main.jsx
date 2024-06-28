import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import UserContextProvider from "./contexts/UserContextProvider.jsx";
import Layout1 from "./Layout/Layout1.jsx";
import Layout2 from "./Layout/Layout2.jsx";
import Layout3 from "./Layout/Layout3.jsx";
import Layout4 from "./Layout/Layout4.jsx";
import VideoPlay from "./components/videoPlayer/VideoPlay.jsx";
import CardVidList from "./components/videoList/CardVidList.jsx";
import ChannelVideoList from "./components/Channel/video/ChannelVideoList.jsx";
import ChannelPlaylist from "./components/Channel/playlist/ChannelPlaylist.jsx";
import ChannelCommunityPost from "./components/Channel/communityPost/ChannelCommunityPost.jsx";
import ChannelSubscribed from "./components/Channel/subscribed/ChannelSubscribed.jsx";
import Redirect from "./Redirect.js";
import PlaylistDetails from "./components/Channel/playlist/PlaylistDetails.jsx";
import MyChannelVideo from "./components/myChannel/myVideo/MyChannelVideo.jsx";
import MyChannelCommunityPost from "./components/myChannel/myCommunityPost/MyChannelCommunityPost.jsx";
import Layout5 from "./Layout/Layout5.jsx";
import EditPersonalInfo from "./components/edit/EditPersonalInfo.jsx";
import EditChannelInfo from "./components/edit/EditChannelInfo.jsx";
import ChangePassword from "./components/edit/ChangePassword.jsx";
import Layout6 from "./Layout/Layout6.jsx";
import AdminDashboard from "./components/dashboard/AdminDashboard.jsx";
import LikedVideos from "./components/likedVideos/LikedVideos.jsx";
import WatchHistory from "./components/watchHistory/WatchHistory.jsx";
import Collections from "./components/collections/Collections.jsx";
// import AuthCheck from "./components/utils/AuthCheck.jsx";
import MyChannelPlaylist from "./components/myChannel/myPlaylist/MyChannelPlaylist.jsx";
import MyChannelSubscriber from "./components/myChannel/mySubscribed/MyChannelSubscriber.jsx";
import Feedback from "./components/feedback/Feedback.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* <Route path="/" element={<AuthCheck />}> */}
      <Route path="video/" element={<Layout1 />}>
        <Route path=":videoId" element={<VideoPlay />} />
      </Route>

      <Route path="home" element={<Layout2 />}>
        <Route path="" element={<CardVidList endPoint="home" />} />
        <Route path="search" element={<CardVidList endPoint="search" />} />
        <Route
          path="channel/playlist/details/:playlistId"
          element={<PlaylistDetails />}
        />
        <Route
          path="myChannel/playlist/details/:playlistId"
          element={<PlaylistDetails />}
        />
        <Route path="likes/videos" element={<LikedVideos />} />
        <Route path="watchHistory" element={<WatchHistory />} />
        <Route path="collections/:channelId" element={<Collections />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>

      <Route path="channel/" element={<Layout3 />}>
        <Route index element={<Redirect />} />
        <Route path="video/:channelId" element={<ChannelVideoList />} />
        <Route path="playlist/:channelId" element={<ChannelPlaylist />} />
        <Route
          path="communityPost/:channelId"
          element={<ChannelCommunityPost />}
        />
        <Route path="subscribed/:channelId" element={<ChannelSubscribed />} />
      </Route>

      <Route path="myChannel/" element={<Layout4 />}>
        <Route index element={<Redirect />} />
        <Route path="video/:channelId" element={<MyChannelVideo />} />
        <Route path="playlist/:channelId" element={<MyChannelPlaylist />} />
        <Route
          path="communityPost/:channelId"
          element={<MyChannelCommunityPost />}
        />
        <Route path="subscribed/:channelId" element={<MyChannelSubscriber />} />
        <Route path="upload/video/:channelId" element={<MyChannelVideo />} />
      </Route>

      <Route path="edit/" element={<Layout5 />}>
        <Route path="personalInfo/:channelId" element={<EditPersonalInfo />} />
        <Route path="channelInfo/:channelId" element={<EditChannelInfo />} />
        <Route path="changepassword/:channelId" element={<ChangePassword />} />
      </Route>

      <Route path="dashboard/" element={<Layout6 />}>
        <Route path="admin/:channelId" element={<AdminDashboard />} />
        <Route
          path="editVideo/:channelId/:videoId"
          element={<AdminDashboard />}
        />
        <Route
          path="deleteVideo/:channelId/:videoId"
          element={<AdminDashboard />}
        />
      </Route>
      {/* </Route> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
);
