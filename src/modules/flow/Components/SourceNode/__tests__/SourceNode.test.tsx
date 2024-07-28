import { useReactFlow } from "@xyflow/react";
import { Mock } from "vitest";
import { SourceNode } from "../SourceNode";
import { render, screen, userEvent } from "@/utils/testUtils";
import { NodeType } from "@/modules/flow/domain";

vi.mock("@xyflow/react", async () => {
  const actual = await vi.importActual("@xyflow/react");

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(actual as any),
    useReactFlow: vi.fn(),
  };
});

describe("SourceNode", () => {
  const setNodes = vi.fn();

  beforeEach(() => {
    (useReactFlow as Mock).mockReturnValue({ setNodes });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders with initial value and updates on input change", async () => {
    const user = userEvent.setup();
    const initialInputValue = "";
    const initialData = { value: initialInputValue };

    render(
      <SourceNode
        data={initialData}
        dragging={false}
        id="1"
        isConnectable={false}
        positionAbsoluteX={0}
        positionAbsoluteY={0}
        selected={false}
        type={NodeType.SOURCE}
        zIndex={0}
      />,
    );

    const input = screen.getByPlaceholderText("Url");

    expect(input).toHaveValue(initialInputValue);
    await user.type(input, "new value");

    expect(setNodes).toHaveBeenCalled();
    expect(setNodes).toHaveBeenCalledWith(expect.any(Function));
    expect(input).toHaveValue("new value");
  });
});
