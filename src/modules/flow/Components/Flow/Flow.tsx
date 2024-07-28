import { ReactFlowProvider } from "@xyflow/react";
import { FlowContent } from "./FlowContent";

export const Flow = () => {
  return (
    <ReactFlowProvider>
      <FlowContent />
    </ReactFlowProvider>
  );
};
