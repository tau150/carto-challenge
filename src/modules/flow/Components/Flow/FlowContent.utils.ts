import type { NodePosition } from "./Flow.types";
import { NodeType } from "@/modules/flow/domain";
import { LayerNodeType } from "@/modules/flow/Components/LayerNode";
import { SourceNodeType } from "@/modules/flow/Components/SourceNode";

const getId = () => `node_${Date.now()}`;

export const getNode = (
  type: NodeType,
  position: NodePosition,
): LayerNodeType | SourceNodeType | undefined => {
  if (type === NodeType.LAYER) {
    return {
      id: getId(),
      type,
      position,
      data: { selected: false },
    };
  }

  if (type === NodeType.SOURCE) {
    const id = getId();

    return {
      id,
      type,
      position,
      data: { value: "", id, selected: false },
    };
  }
};
