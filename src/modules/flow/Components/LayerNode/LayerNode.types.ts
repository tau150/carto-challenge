import type { Node } from "@xyflow/react";
import { NodeType } from "@/modules/flow/domain";

// export type LayerNodeType = Node<{ selected: boolean }, NodeType.LAYER>;

// export type LayerNodeType = Node<{}, NodeType.LAYER>;

export interface LayerNodeType extends Node {
  type: NodeType.LAYER;
}

// export type LayerNodeType
