import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { GlobalStyles } from './GlobalStyles.js'
import HomeForm from "./pages/HomeForm.jsx";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeForm />
  },
  {
    path: "*",
    element: <ErrorPage/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyles/>
    <RouterProvider router={router} />
  </React.StrictMode>
);
