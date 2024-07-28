import styled from "styled-components";

export const ControlsPanelContainer = styled.div`
  display: flex;
  position: absolute;
  z-index: 5;
  justify-content: space-around;
  top: 5px;
  right: 20px;

  button {
    display: flex;
    margin: 0 0.5rem;
    width: 60px;
    outline: 0;
    border: 0;
    cursor: pointer;
    background-color: white;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 600;
    color: #2d3748;
    border: 1px solid #cbd5e0;
    line-height: 26px;
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
`;
