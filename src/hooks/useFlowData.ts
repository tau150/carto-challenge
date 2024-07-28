import { useContext } from "react";
import { FlowDataContext } from "@/contexts";

export const useFlowData = () => {
  const context = useContext(FlowDataContext);

  if (!context) {
    throw new Error("useFlowData must be used within a FlowDataProvider");
  }

  return context;
};
