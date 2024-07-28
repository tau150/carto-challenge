import { FakeInput } from "./SourceNodeCard.styled";
import { NodeCard } from "@/modules/flow/Components";
import { NodeType } from "@/modules/flow/domain";

export const SourceNodeCard = () => {
  return (
    <NodeCard nodeType={NodeType.SOURCE}>
      <FakeInput />
    </NodeCard>
  );
};
