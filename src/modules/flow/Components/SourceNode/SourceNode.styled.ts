import styled, { css } from "styled-components";

interface SourceNodeContainer {
  $isSelected: boolean;
}

export const SourceNodeContainer = styled.div<SourceNodeContainer>`
  width: 220px;
  height: 100px;
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

export const SourceInputContainer = styled.div`
  input {
    width: 80%;
  }
`;
