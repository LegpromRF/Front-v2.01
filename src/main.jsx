import React from 'react'
import ReactDOM from 'react-dom/client'
import '@styles/globals.scss'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "./components/routing/root.jsx";
import {Provider} from "react-redux";
import { store } from "@store/store.js"
import HomeProfile from "@/pages/profile/home.jsx";
import NoLayout from "@/pages/nolayout.jsx";
import VKIDtokenpage from "@/pages/VKIDtokenpage.jsx";
import PrivateRoute from "@components/routing/privateRoute.jsx";
import Yatokenpage from "@/pages/Yatokenpage.jsx";
import CreateOrderPage from "@/pages/profile/order/createorder.jsx";
import PurchasePage from "@/pages/profile/order/purchase.jsx";
import TechnologyPage from "@/pages/profile/order/technology.jsx";
import ConditionsPage from "@/pages/profile/order/conditions.jsx";
import ContactsPage from "@/pages/profile/order/contacts.jsx";
import SelectionPage from "@/pages/profile/selection.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "/nolayout",
        element: <NoLayout />
    },
    {
        path: "/profile",
        element: <PrivateRoute><HomeProfile /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <HomeProfile/>
            },
        ]
    },
    {
        path: "/profile/order/createorder",
        element: <CreateOrderPage />
    },
    {
        path: "/profile/order/purchase",
        element: <PurchasePage />
    },
    {
        path: "/profile/order/technology",
        element: <TechnologyPage />
    },
    {
        path: "/profile/order/conditions",
        element: <ConditionsPage />
    },
    {
        path: "/profile/order/contacts",
        element: <ContactsPage />
    },
    {
        path: "/profile/selection",
        element: <SelectionPage />
    },
    {
        path: "/VKIDtokenpage",
        element: <VKIDtokenpage />
    },
    {
        path: "/Yatokenpage",
        element: <Yatokenpage />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
            </React.StrictMode>,
)
