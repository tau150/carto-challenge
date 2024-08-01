import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "./Routes";
import { FlowPlayground } from "@/modules/flow/Views";
import { Map } from "@/modules/map/Views";
import { NotFound } from "@/views/NotFound";

const router = createBrowserRouter([
  {
    path: Routes.FLOW,
    element: <FlowPlayground />,
  },
  {
    path: Routes.MAP,
    element: <Map />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
