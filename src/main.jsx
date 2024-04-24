import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import UserContextProvider from './contexts/UserContextProvider.jsx'
import Layout1 from './pages/Layout1.jsx'
import Layout2 from './pages/Layout2.jsx'
import VideoPlay from './components/videoPlayer/VideoPlay.jsx'
import CardVidList from './components/videoList/CardVidList.jsx'
import Layout3 from './pages/Layout3.jsx'
import ChannelVideoList from './components/Channel/video/ChannelVideoList.jsx'
import ChannelPlaylist from './components/Channel/playlist/ChannelPlaylist.jsx'
import ChannelCommunityPost from './components/Channel/communityPost/ChannelCommunityPost.jsx'
import ChannelSubscribed from './components/Channel/subscribed/ChannelSubscribed.jsx'
import Redirect from './Redirect.js'
import PlaylistDetails from './components/Channel/playlist/PlaylistDetails.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path=''>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/video/' element={<Layout1 />}>
        <Route path=':videoId' element={<VideoPlay />} />
      </Route>
      <Route path='/' element={<Layout2 />}>
        <Route path='' element={<CardVidList endPoint='home' />} />
        <Route path='search' element={<CardVidList endPoint='search'/>} />
        <Route path='/channel/playlist/details/:playlistId' element={<PlaylistDetails />} />
        
      </Route>
      <Route path='/channel/' element={<Layout3 />}>
        <Route index element={<Redirect />} />
        <Route path='video/:channelId' element={<ChannelVideoList />} />
        <Route path='playlist/:channelId' element={<ChannelPlaylist />} />
        <Route path='communityPost/:channelId' element={<ChannelCommunityPost />} />
        <Route path='subscribed/:channelId' element={<ChannelSubscribed />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
)