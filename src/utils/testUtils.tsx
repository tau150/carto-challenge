/* eslint-disable react-refresh/only-export-components */
import { render as RTLRender, RenderOptions } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";
import { FlowDataProvider } from "@/contexts";

const Providers = ({ children }: PropsWithChildren): ReactElement => {
  return <FlowDataProvider>{children}</FlowDataProvider>;
};

const render = (component: ReactElement, options?: RenderOptions) =>
  RTLRender(component, { wrapper: Providers, ...options });

export * from "@testing-library/react";

export { render };
