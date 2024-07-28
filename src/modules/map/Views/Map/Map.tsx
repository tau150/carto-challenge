import { useNavigate } from "react-router-dom";
import { Routes } from "@/router";

export const Map = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>App View!</h1>
      <button onClick={() => navigate(Routes.FLOW)}>Go to flow</button>
    </div>
  );
};
