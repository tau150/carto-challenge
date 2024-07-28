import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "./Routes";
import { FlowPlayground } from "@/modules/flow/Views";
import { Map } from "@/modules/map/Views";

const router = createBrowserRouter([
  {
    path: Routes.FLOW,
    element: <FlowPlayground />,
  },
  {
    path: Routes.MAP,
    element: <Map />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
