import { getNode } from "../FlowContent.utils";
import type { NodePosition } from "../Flow.types";
import { NodeType } from "@/modules/flow/domain";

vi.spyOn(Date, "now").mockImplementation(() => 1625152800000);

describe("getNode", () => {
  const position: NodePosition = { x: 100, y: 200 };

  it("should return a LayerNodeType object for NodeType.LAYER", () => {
    const result = getNode(NodeType.LAYER, position);

    expect(result).toEqual({
      id: `node_${1625152800000}`,
      type: NodeType.LAYER,
      position,
      data: { selected: false },
    });
  });

  it("should return a SourceNodeType object for NodeType.SOURCE", () => {
    const result = getNode(NodeType.SOURCE, position);

    expect(result).toEqual({
      id: `node_${1625152800000}`,
      type: NodeType.SOURCE,
      position,
      data: { value: "" },
    });
  });

  it("should return undefined for unsupported NodeType", () => {
    const result = getNode("unsupported_type" as NodeType, position);

    expect(result).toBeUndefined();
  });
});
