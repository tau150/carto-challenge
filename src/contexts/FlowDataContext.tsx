import { createContext, useState, PropsWithChildren, useMemo } from "react";
import type { Edge } from "@xyflow/react";
import type { AvailableNodes } from "@/modules/flow/Components/Flow/Flow.types";

interface FlowData {
  edges: Edge[];
  nodes: AvailableNodes;
}

export interface FlowDataContextValue {
  flowData: FlowData;
  setFlowData: (flowData: FlowData) => void;
}

export const FlowDataContext = createContext({
  flowData: { edges: [], nodes: [] } as FlowData,
  setFlowData: () => {},
} as FlowDataContextValue);

export const FlowDataProvider = ({ children }: PropsWithChildren) => {
  const [flowData, setFlowData] = useState<FlowData>({ edges: [], nodes: [] });

  const memoValue = useMemo(
    () => ({
      flowData,
      setFlowData,
    }),
    [flowData],
  );

  return <FlowDataContext.Provider value={memoValue}>{children}</FlowDataContext.Provider>;
};