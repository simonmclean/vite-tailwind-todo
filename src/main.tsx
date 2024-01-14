import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TodoPage from "./pages/TodoPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import { getInitialTheme, setTheme } from "./theme.ts";

setTheme(getInitialTheme())

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/about",
    element: <AboutPage />
  }
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
