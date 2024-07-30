import type { LayerNodeType } from "./LayerNode";
import type { SourceNodeType } from "./SourceNode";

type AvailableNode = LayerNodeType | SourceNodeType;

export type AvailableNodes = AvailableNode[];
