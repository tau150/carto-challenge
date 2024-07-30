import { useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { SourceNodeContainer, SourceInputContainer } from "./SourceNode.styled";
import type { SourceNodeType } from "@/modules/flow/domain";
import type { NodeProps } from "@xyflow/react";

export const SourceNode = ({ data, id, selected }: NodeProps<SourceNodeType>) => {
  const [inputValue, setInputValue] = useState(data.value || "");
  const { setNodes } = useReactFlow();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setInputValue(value);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              value,
            },
          };
        }

        return node;
      }),
    );
  };

  return (
    <SourceNodeContainer $isSelected={selected ?? false}>
      <Handle position={Position.Right} type="source" />
      <p>Source</p>
      <SourceInputContainer>
        <input
          id="text"
          name="source"
          placeholder="Url"
          value={inputValue}
          onChange={handleInputChange}
        />
      </SourceInputContainer>
    </SourceNodeContainer>
  );
};
