import { Edge } from "@xyflow/react";
import { FlowData } from "../FlowDataContext.types";
import { getSources } from "../FlowDataContext.utils";
import { AvailableNodes } from "@/modules/flow/domain";

describe("getSources", () => {
  const flowData: FlowData = {
    nodes: [
      { id: "1", data: { value: "https://node1.com" }, position: { y: 100 } },
      { id: "2", position: { y: 200 } },
      { id: "3", data: { value: "https://node2.com" }, position: { y: 100 } },
      { id: "4", position: { y: 400 } },
    ] as AvailableNodes,
    edges: [
      { source: "1", target: "2" },
      { source: "3", target: "4" },
    ] as Edge[],
  };

  it("should return sorted URLs based on yTargetPosition", () => {
    const result = getSources(flowData);

    expect(result).toEqual(["https://node1.com", "https://node2.com"]);
  });
});
