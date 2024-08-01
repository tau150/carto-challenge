import type { LayerNodeType } from "./LayerNode";
import type { SourceNodeType } from "./SourceNode";
import type { IntersectionNodeType } from "./IntersectionNode";

export type AvailableNode = LayerNodeType | SourceNodeType | IntersectionNodeType;

export type AvailableNodes = AvailableNode[];
