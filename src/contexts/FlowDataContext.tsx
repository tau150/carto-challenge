import { createContext, useState, PropsWithChildren, useMemo } from "react";
import {
  NODES_STORAGE_KEY,
  EDGES_STORAGE_KEY,
  defaultNodes,
  defaultEdges,
} from "./FlowDataContext.constants";
import type { Edge } from "@xyflow/react";
import type { AvailableNodes } from "@/modules/flow/domain";
import { useLocalStorage } from "@/hooks";

export interface FlowData {
  edges: Edge[];
  nodes: AvailableNodes;
}

export interface FlowDataContextValue {
  flowData: FlowData;
  setFlowData: (flowData: FlowData) => void;
  saveNodes: (nodes: AvailableNodes) => void;
  saveEdges: (edges: Edge[]) => void;
}

export const FlowDataContext = createContext<FlowDataContextValue | undefined>(undefined);

export const FlowDataProvider = ({ children }: PropsWithChildren) => {
  const [initialNodes, saveNodes] = useLocalStorage(NODES_STORAGE_KEY, defaultNodes);
  const [initialEdges, saveEdges] = useLocalStorage(EDGES_STORAGE_KEY, defaultEdges);
  const [flowData, setFlowData] = useState<FlowData>({ edges: initialEdges, nodes: initialNodes });

  const memoValue = useMemo(
    () => ({
      flowData,
      setFlowData,
      saveNodes,
      saveEdges,
    }),
    [flowData, saveEdges, saveNodes],
  );

  return <FlowDataContext.Provider value={memoValue}>{children}</FlowDataContext.Provider>;
};
