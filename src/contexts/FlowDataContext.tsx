import { createContext, useState, PropsWithChildren, useMemo, useCallback, useEffect } from "react";
import { v5 as uuidv5 } from "uuid";
import {
  NODES_STORAGE_KEY,
  EDGES_STORAGE_KEY,
  COLLECTION_STORAGE_ID,
  UUID_NAMESPACE,
  defaultNodes,
  defaultEdges,
} from "./FlowDataContext.constants";
import { FlowData, UrlStore } from "./FlowDataContext.types";
import { getSources } from "./FlowDataContext.utils";
import type { Edge } from "@xyflow/react";
import type { AvailableNodes } from "@/modules/flow/domain";
import { useLocalStorage } from "@/hooks";

export interface FlowDataContextValue {
  flowData: FlowData;
  collectionId: string;
  sources: string[] | UrlStore[];
  setFlowData: (flowData: FlowData) => void;
  saveCollection: (edges: Edge[], nodes: AvailableNodes) => void;
}

export const FlowDataContext = createContext<FlowDataContextValue | undefined>(undefined);

export const FlowDataProvider = ({ children }: PropsWithChildren) => {
  const [initialNodes, saveNodes] = useLocalStorage(NODES_STORAGE_KEY, defaultNodes);
  const [initialEdges, saveEdges] = useLocalStorage(EDGES_STORAGE_KEY, defaultEdges);
  const [collectionId, setCollectionId] = useLocalStorage(COLLECTION_STORAGE_ID, "");
  const [sources, setSources] = useState<UrlStore[] | string[]>([]);
  const [flowData, setFlowData] = useState<FlowData>({ edges: initialEdges, nodes: initialNodes });

  const loadSources = useCallback(() => {
    const calculatedSources = getSources({ edges: initialEdges, nodes: initialNodes });

    setSources(calculatedSources);
  }, [initialEdges, initialNodes]);

  const saveCollection = useCallback(
    (edges: Edge[], nodes: AvailableNodes) => {
      const calculatedSources = getSources({ edges, nodes });
      const id = uuidv5(calculatedSources.join("-"), UUID_NAMESPACE);

      setSources(calculatedSources);
      setCollectionId(id);
      saveNodes(nodes);
      saveEdges(edges);
    },
    [saveEdges, saveNodes, setCollectionId],
  );

  useEffect(() => {
    if (sources.length === 0) {
      loadSources();
    }
  }, [loadSources, sources.length]);

  const memoValue = useMemo(
    () => ({
      flowData,
      setFlowData,
      collectionId,
      saveCollection,
      sources,
    }),
    [collectionId, flowData, saveCollection, sources],
  );

  return <FlowDataContext.Provider value={memoValue}>{children}</FlowDataContext.Provider>;
};
