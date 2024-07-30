import { useCallback } from "react";
import { addEdge, useReactFlow, Connection, Edge } from "@xyflow/react";
import { DROP_EFFECT } from "../Flow.constants";
import { getNode } from "../FlowContent.utils";
import type { AvailableNodes } from "@/modules/flow/domain";
import type { NodeType } from "@/modules/flow/domain";
import { Events } from "@/modules/events/domain";

type UseFlowHandlersProps = {
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setNodes: React.Dispatch<React.SetStateAction<AvailableNodes>>;
};

export const useFlowHandlers = ({ setEdges, setNodes }: UseFlowHandlersProps) => {
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds: Edge[]) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = DROP_EFFECT;
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData(Events.FLOW_DRAG_DROP_NODE) as NodeType;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = getNode(type, position);

      if (newNode !== undefined) {
        setNodes((prev) => {
          return [...prev, newNode];
        });
      }
    },
    [screenToFlowPosition, setNodes],
  );

  return { onConnect, onDragOver, onDrop };
};
