import React, { useEffect, useContext } from "react";
import { FlowDataProvider, FlowDataContext } from "../FlowDataContext";
import { render, screen } from "@/utils/testUtils";
import { NodeType } from "@/modules/flow/domain";

describe("FlowDataContext", () => {
  it("provides default values", () => {
    const TestComponent = () => {
      const context = React.useContext(FlowDataContext);

      return (
        <div>
          <span>Edges: {context.flowData.edges.length}</span>
          <span>Nodes: {context.flowData.nodes.length}</span>
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

  it("updates flowData when setFlowData is called", () => {
    const TestComponent = () => {
      const { flowData, setFlowData } = useContext(FlowDataContext);

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
