import React from "react";
import ReactDOM from "react-dom/client";
import "@styles/globals.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/routing/root.jsx";
import { Provider } from "react-redux";
import { store } from "@store/store.js";
import HomeProfile from "@/pages/profile/home.jsx";
import ViewTzPage from "./pages/profile/order/viewtz.jsx";
import NoLayout from "@/pages/nolayout.jsx";
import VKIDtokenpage from "@/pages/VKIDtokenpage.jsx";
import AuthPage from "./pages/auth.jsx";
import PrivateRoute from "@components/routing/privateRoute.jsx";
import Yatokenpage from "@/pages/Yatokenpage.jsx";
import CreateOrderPage from "@/pages/profile/order/createorder.jsx";
import PurchasePage from "@/pages/profile/order/purchase.jsx";
import TechnologyPage from "@/pages/profile/order/technology.jsx";
import ConditionsPage from "@/pages/profile/order/conditions.jsx";
import ContactsPage from "@/pages/profile/order/contacts.jsx";
import SelectionPage from "@/pages/profile/selection.jsx";
import ProcurementRegisterPage from "@/pages/profile/order/procurement.jsx";
import DashboardPage from "@/pages/profile/dashboard.jsx";
import ApplicationPage from "./pages/applicationPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/nolayout",
    element: <NoLayout />,
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute page="">
        <HomeProfile />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <HomeProfile />,
      },
    ],
  },
  {
    path: "/profile/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/profile/order/createorder",
    element: (
      <PrivateRoute page="auth">
        <CreateOrderPage />
      </PrivateRoute>
    ),
  },
  { path: "/profile/order/view_tz/:itemId", element: <ViewTzPage /> },
  {
    path: "/profile/order/purchase",
    element: <PurchasePage />,
  },
  {
    path: "/profile/order/technology",
    element: <TechnologyPage />,
  },
  {
    path: "/profile/order/conditions",
    element: <ConditionsPage />,
  },
  {
    path: "/profile/order/contacts",
    element: <ContactsPage />,
  },
  {
    path: "/profile/selection",
    element: <SelectionPage />,
  },
  {
    path: "/profile/registry",
    element: <ProcurementRegisterPage />,
  },
  {
    path: "/VKIDtokenpage",
    element: <VKIDtokenpage />,
  },
  {
    path: "/Yatokenpage",
    element: <Yatokenpage />,
  },
  {
    path: "/applicationpage",
    element: <ApplicationPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
