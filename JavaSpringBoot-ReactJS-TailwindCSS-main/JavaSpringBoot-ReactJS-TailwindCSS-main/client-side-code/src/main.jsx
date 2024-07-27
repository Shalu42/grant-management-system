import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import MyRouter from './routers/router.jsx'
// import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyRouter />
    {/* <RouterProvider router={MyRouter}/> */}
  </React.StrictMode>,
)
