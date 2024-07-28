import { LayerNode } from "../LayerNode";
import { render, screen } from "@/utils/testUtils";
import { NodeType } from "@/modules/flow/domain";

describe("LayerNode", () => {
  it("renders properly", () => {
    render(
      <LayerNode
        data={{}}
        dragging={false}
        id="1"
        isConnectable={false}
        positionAbsoluteX={0}
        positionAbsoluteY={0}
        type={NodeType.LAYER}
        zIndex={0}
      />,
    );

    expect(screen.getByText(/layer/i)).toBeInTheDocument();
  });
});
