import styled, { keyframes } from "styled-components";

export const MapContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 700px;

  .mapboxgl-control-container {
    display: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
`;

const spin = keyframes`
 from { transform: scale(1) rotate(0deg); }
 to { transform: scale(1) rotate(360deg); }
 `;

export const LoadingContainer = styled.div`
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    font-size: 3rem;
    animation: ${spin} 2s infinite linear;
  }
`;
