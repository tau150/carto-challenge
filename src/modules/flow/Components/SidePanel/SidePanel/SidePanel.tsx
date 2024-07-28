import { useState, type PropsWithChildren } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  SidePanelContainer,
  CollapseIcon,
  ContentContainer,
  ChildrenContainer,
} from "./SidePanel.styled";

export const SidePanel = ({ children }: PropsWithChildren) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidePanelContainer $isCollapsed={isCollapsed}>
      <CollapseIcon $isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? (
          <FaChevronRight data-testid="unCollapse-icon" />
        ) : (
          <FaChevronLeft data-testid="collapse-icon" />
        )}
      </CollapseIcon>
      {!isCollapsed && (
        <ContentContainer>
          <h1>Your available Nodes</h1>
          <p>Drag and drop to the right to interact with your nodes</p>
          <ChildrenContainer>{children}</ChildrenContainer>
        </ContentContainer>
      )}
    </SidePanelContainer>
  );
};
