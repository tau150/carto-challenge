import styled from "styled-components";

export const ContentContainer = styled.main`
  margin-top: 2rem;
  height: calc(100vh - 60px - 4rem);
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const FlowContentContainer = styled.div`
  flex-basis: 70%;
  flex-grow: 1;
  transition:
    flex-basis 0.3s,
    flex-grow 0.3s;
`;

export const NodesContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 4rem;
`;
