import { Handle, Position } from "@xyflow/react";
import { NodeCardContainer } from "./LayerNode.styled";
import type { LayerNodeType } from "./LayerNode.types";
import type { NodeProps } from "@xyflow/react";

export const LayerNode = ({ selected }: NodeProps<LayerNodeType>) => {
  return (
    <NodeCardContainer $isSelected={selected ?? false}>
      <Handle position={Position.Left} type="target" />
      <p>Layer</p>
    </NodeCardContainer>
  );
};
