import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  ConnectionMode,
} from "@xyflow/react";
import toast from "react-simple-toasts";
import { useNavigate } from "react-router-dom";
import {
  SUCCESS_SAVE_MESSAGE,
  SUCCESS_AUTO_SAVE_MESSAGE,
  ERROR_SAVE_MESSAGE,
  AUTO_SAVE_INTERVAL,
  FLOW_BG_COLOR,
} from "./Flow.constants";
import { FlowContainer } from "./Flow.styled";
import { useFlowHandlers } from "./hooks/useFlowHandlers";
import { Routes } from "@/router";
import { LayerNode } from "@/modules/flow/Components/LayerNode";
import { SourceNode } from "@/modules/flow/Components/SourceNode";
import { NodeType } from "@/modules/flow/domain";
import { ControlsPanel } from "@/modules/flow/Components/Flow/Components/ControlsPanel";
import { useInterval, useFlowData } from "@/hooks";
import "@xyflow/react/dist/style.css";

const nodeTypes = { [NodeType.LAYER]: LayerNode, [NodeType.SOURCE]: SourceNode };

export const FlowContent = () => {
  const { setFlowData, flowData, saveEdges, saveNodes } = useFlowData();
  const [nodes, setNodes, onNodesChange] = useNodesState(flowData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowData.edges);
  const { onConnect, onDragOver, onDrop } = useFlowHandlers({ setEdges, setNodes });
  const navigate = useNavigate();

  useInterval(() => handleSave(true), AUTO_SAVE_INTERVAL);

  function handleSave(isAutoSave = false) {
    try {
      const updatedNodes = nodes.map((node) => ({ ...node, selected: false }));

      setNodes(updatedNodes);
      saveNodes(updatedNodes);
      saveEdges(edges);
      toast(isAutoSave ? SUCCESS_AUTO_SAVE_MESSAGE : SUCCESS_SAVE_MESSAGE);
    } catch (_e) {
      toast(ERROR_SAVE_MESSAGE);
    }
  }

  const handleClickMap = () => {
    handleSave();
    setFlowData({ nodes, edges });
    navigate(Routes.MAP);
  };

  return (
    <FlowContainer>
      <ReactFlow
        connectionMode={ConnectionMode.Loose}
        edges={edges}
        nodeTypes={nodeTypes}
        nodes={nodes}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
      >
        <ControlsPanel onClickMap={handleClickMap} onSave={handleSave} />
        <Controls />
        <MiniMap />
        <Background color={FLOW_BG_COLOR} gap={12} size={1} variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </FlowContainer>
  );
};
