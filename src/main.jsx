import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Page from './pages/Page.jsx'
import VideoPage from './pages/VideoPage.jsx'
import UserContextProvider from './contexts/UserContextProvider.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route path='home' element={<Page />} />
      <Route path='search' element={<Page endPoint='search'/>} />
      <Route path='video/:videoId' element={<VideoPage />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
)