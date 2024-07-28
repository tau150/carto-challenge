import type { LayerNodeType } from "@/modules/flow/Components/LayerNode";
import type { SourceNodeType } from "@/modules/flow/Components/SourceNode";

export interface NodePosition {
  x: number;
  y: number;
}

type AvailableNode = LayerNodeType | SourceNodeType;

export type AvailableNodes = AvailableNode[];
