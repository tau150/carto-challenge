import styled from "styled-components";
import { FaExclamationTriangle } from "react-icons/fa";

export const Container = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px)
  background-color: #f8f9fa;
  color: #343a40;
  text-align: center;
`;

export const Icon = styled(FaExclamationTriangle)`
  font-size: 5rem;
  color: #dc3545;
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #00547b;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
