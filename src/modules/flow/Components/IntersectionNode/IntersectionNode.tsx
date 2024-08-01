import { Handle, Position } from "@xyflow/react";
import { NodeCardContainer } from "./IntersectionNode.styled";
import type { IntersectionNodeType } from "@/modules/flow/domain";
import type { NodeProps } from "@xyflow/react";

export const IntersectionNode = ({ selected }: NodeProps<IntersectionNodeType>) => {
  return (
    <NodeCardContainer $isSelected={selected ?? false}>
      <Handle id="source1" position={Position.Left} style={{ top: 35 }} type="target" />
      <Handle id="source2" position={Position.Left} style={{ top: 90 }} type="target" />
      <Handle position={Position.Right} type="source" />
      <p>Intersection</p>
    </NodeCardContainer>
  );
};
