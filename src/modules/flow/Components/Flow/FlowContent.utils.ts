import type { NodePosition } from "./Flow.types";
import {
  NodeType,
  LayerNodeType,
  SourceNodeType,
  IntersectionNodeType,
} from "@/modules/flow/domain";

const getId = () => `node_${Date.now()}`;

export const getNode = (
  type: NodeType,
  position: NodePosition,
): LayerNodeType | SourceNodeType | IntersectionNodeType | undefined => {
  if (type === NodeType.LAYER) {
    return {
      id: getId(),
      type,
      position,
      data: { selected: false },
    };
  }

  if (type === NodeType.SOURCE) {
    return {
      id: getId(),
      type,
      position,
      data: { value: "" },
    };
  }

  if (type === NodeType.INTERSECTION) {
    return {
      id: getId(),
      type,
      position,
      data: { selected: false },
    };
  }
};
