import { PropsWithChildren } from "react";
import { NodeCardContainer } from "./NodeCard.styled";
import { textContent, pointerClassName } from "./NodeCard.constants";
import { Events } from "@/modules/events/domain";
import { NodeType } from "@/modules/flow/domain";

interface Props {
  nodeType: NodeType;
}

export const NodeCard = ({ nodeType, children }: PropsWithChildren<Props>) => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: NodeType) => {
    event.dataTransfer.setData(Events.FLOW_DRAG_DROP_NODE, nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <NodeCardContainer
      draggable
      data-testid="node-card"
      onDragStart={(event) => onDragStart(event, nodeType)}
    >
      <span className={pointerClassName[nodeType]} />
      {nodeType === NodeType.INTERSECTION && (
        <>
          <span className={pointerClassName[nodeType] + "-left"} />
          <span className={pointerClassName[nodeType] + "-right"} />
        </>
      )}
      <p>{textContent[nodeType]}</p>
      {children}
    </NodeCardContainer>
  );
};
