import styled from "styled-components";

export const NodeCardContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 0.5rem;
  border: 1px solid #eee;
  position: relative;

  span {
    width: 10px;
    height: 10px;
    border: 3px solid #eee;
    border-radius: 50%;
    position: absolute;
    top: calc(50% - 10px);

    &.left {
      left: -14px;
    }

    &.right {
      right: -14px;
    }
  }
`;
