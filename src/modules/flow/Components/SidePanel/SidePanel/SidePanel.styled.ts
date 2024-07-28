import styled from "styled-components";

interface SidePanelProps {
  $isCollapsed: boolean;
}

export const SidePanelContainer = styled.aside<SidePanelProps>`
  position: relative;
  border-radius: 0.5rem;
  border: solid #eee;
  height: 100%;
  flex-grow: 0;
  transition:
    flex-basis 0.3s,
    flex-grow 0.3s;
  border-width: ${({ $isCollapsed }) => ($isCollapsed ? "10px" : "1px")};
  flex-basis: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "20%")};
`;

export const CollapseIcon = styled.i<SidePanelProps>`
  z-index: 2;
  position: absolute;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  background-color: #cfe5ff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  transition: right 0.3s;
  top: ${({ $isCollapsed }) => ($isCollapsed ? "-20px" : "-10px")};
  right: ${({ $isCollapsed }) => ($isCollapsed ? "-20px" : "-10px")};
`;

export const ContentContainer = styled.div`
  padding: 1rem;
`;

export const ChildrenContainer = styled.div`
  margin-top: 1rem;
`;
