import { Edge } from "@xyflow/react";
import { AvailableNodes } from "@/modules/flow/domain";

export interface FlowData {
  edges: Edge[];
  nodes: AvailableNodes;
}

export interface FlowDataContextValue {
  flowData: FlowData;
  collectionId: string;
  sources: string[] | UrlStore[];
  setFlowData: (flowData: FlowData) => void;
  saveCollection: (edges: Edge[], nodes: AvailableNodes) => void;
}

export interface UrlObject {
  url: string;
}

export interface UrlStore {
  [key: string]: UrlObject;
}
