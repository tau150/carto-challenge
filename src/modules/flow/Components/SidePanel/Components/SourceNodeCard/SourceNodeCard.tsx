import { NodeCard } from "../NodeCard";
import { FakeInput } from "./SourceNodeCard.styled";
import { NodeType } from "@/modules/flow/domain";

export const SourceNodeCard = () => {
  return (
    <NodeCard nodeType={NodeType.SOURCE}>
      <FakeInput />
    </NodeCard>
  );
};
