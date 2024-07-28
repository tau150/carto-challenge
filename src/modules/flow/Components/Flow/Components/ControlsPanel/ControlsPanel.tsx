import { ControlButton } from "@xyflow/react";

import { ControlsPanelContainer } from "./ControlsPanel.styled";

interface Props {
  onSave: VoidFunction;
  onClickMap: VoidFunction;
}

export const ControlsPanel = ({ onSave, onClickMap }: Props) => {
  return (
    <ControlsPanelContainer>
      <ControlButton onClick={() => onSave()}>Save</ControlButton>
      <ControlButton onClick={() => onClickMap()}>Map</ControlButton>
    </ControlsPanelContainer>
  );
};
