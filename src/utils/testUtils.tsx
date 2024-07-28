/* eslint-disable react-refresh/only-export-components */
import { render as RTLRender, RenderOptions } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { FlowDataProvider } from "@/contexts";

const Providers = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <ReactFlowProvider>
      <FlowDataProvider>{children}</FlowDataProvider>
    </ReactFlowProvider>
  );
};

const render = (component: ReactElement, options?: RenderOptions) =>
  RTLRender(component, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export * from "@testing-library/user-event";

export { render };
