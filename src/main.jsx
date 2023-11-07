import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "./components/routing/root.jsx";
import {Provider} from "react-redux";
import {store} from "@store/store.js"
import HomeProfile from "@/pages/profile/home.jsx";
import Error404 from "@/pages/404.jsx";
import NoLayout from "@/pages/nolayout.jsx";
// import App from "@/App.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error404 />
    },
    {
        path: "/nolayout",
        element: <NoLayout />
    },
    {
        path: "profile/home",
        element: <HomeProfile />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>

            </React.StrictMode>,
)
