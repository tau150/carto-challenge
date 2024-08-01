import { useNavigate } from "react-router-dom";
import { Container, Icon, Title, Subtitle, Button } from "./NotFound.styled";
import { Routes } from "@/router";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Icon />
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Button onClick={() => navigate(Routes.FLOW)}>Go to Flow</Button>
    </Container>
  );
};
