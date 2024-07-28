import { useEffect, useContext } from "react";
import { render, screen } from "@testing-library/react";
import { FlowDataProvider, FlowDataContext, type FlowDataContextValue } from "../FlowDataContext";

import { NodeType } from "@/modules/flow/domain";

describe("FlowDataContext", () => {
  it("provides default values", () => {
    const TestComponent = () => {
      const { flowData } = useContext(FlowDataContext) as FlowDataContextValue;

      return (
        <div>
          <span>Edges: {flowData.edges.length}</span>
          <span>Nodes: {flowData.nodes.length}</span>
        </div>
      );
    };

    render(
      <FlowDataProvider>
        <TestComponent />
      </FlowDataProvider>,
    );

    expect(screen.getByText(/Edges: 0/)).toBeInTheDocument();
    expect(screen.getByText(/Nodes: 0/)).toBeInTheDocument();
  });

  it("updates flowData when setFlowData is called", async () => {
    const TestComponent = () => {
      const { setFlowData, flowData } = useContext(FlowDataContext) as FlowDataContextValue;

      useEffect(() => {
        setFlowData({
          edges: [{ id: "e1", source: "1", target: "2" }],
          nodes: [
            {
              id: "1",
              type: NodeType.LAYER,
              position: { x: 0, y: 0 },
              data: { selected: false },
            },
          ],
        });
      }, [setFlowData]);

      return (
        <div>
          <span>Edges: {flowData.edges.length}</span>
          <span>Nodes: {flowData.nodes.length}</span>
        </div>
      );
    };

    render(
      <FlowDataProvider>
        <TestComponent />
      </FlowDataProvider>,
    );

    expect(screen.getByText(/Edges: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Nodes: 1/)).toBeInTheDocument();
  });
});
