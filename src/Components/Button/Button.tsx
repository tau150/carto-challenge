import { PropsWithChildren, ButtonHTMLAttributes } from "react";
import { StyledButton } from "./Button.styled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, ...rest }: PropsWithChildren<ButtonProps>) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};
