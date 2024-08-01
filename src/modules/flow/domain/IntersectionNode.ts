import type { Node } from "@xyflow/react";
import { NodeType } from "@/modules/flow/domain";

export interface IntersectionNodeType extends Node {
  type: NodeType.INTERSECTION;
}
