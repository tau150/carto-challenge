import type { Node } from "@xyflow/react";
import { NodeType } from "@/modules/flow/domain";

export interface LayerNodeType extends Node {
  type: NodeType.LAYER;
}
