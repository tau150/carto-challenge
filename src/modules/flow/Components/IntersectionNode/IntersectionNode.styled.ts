import styled, { css } from "styled-components";

interface NodeCardContainer {
  $isSelected: boolean;
}

export const NodeCardContainer = styled.div<NodeCardContainer>`
  width: 120px;
  height: 120px;
  border-radius: 0.5rem;
  border: 1px solid #eee;
  position: relative;
  background: #fff;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      border-color: #007bff;
      box-shadow: 0 0 7px rgba(0, 40, 255, 0.5);
    `}
`;
