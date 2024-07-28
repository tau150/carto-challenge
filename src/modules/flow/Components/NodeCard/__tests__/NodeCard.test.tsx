import { NodeCard } from "../NodeCard";
import { textContent } from "../NodeCard.constants";
import { render, screen, fireEvent } from "@/utils/testUtils";
import { Events } from "@/modules/events/domain";
import { NodeType } from "@/modules/flow/domain";

describe("NodeCard", () => {
  it("renders correctly with the provided props", () => {
    const nodeType = NodeType.SOURCE;

    render(
      <NodeCard nodeType={nodeType}>
        <div>Child Content</div>
      </NodeCard>,
    );

    expect(screen.getByText(textContent[nodeType])).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
    expect(screen.getByText(textContent[nodeType])).toBeInTheDocument();
  });

  it("handles onDragStart event correctly", async () => {
    const nodeType = NodeType.SOURCE;
    const setDataMock = vi.fn();
    const event = {
      dataTransfer: {
        setData: setDataMock,
        effectAllowed: "move",
      },
    };

    render(<NodeCard nodeType={nodeType} />);

    fireEvent.dragStart(screen.getByTestId("node-card"), event);

    expect(setDataMock).toHaveBeenCalledWith(Events.FLOW_DRAG_DROP_NODE, nodeType);
    expect(event.dataTransfer.effectAllowed).toBe("move");
  });
});
