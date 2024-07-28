import { addEdge, useReactFlow, Edge } from "@xyflow/react";
import { Mock } from "vitest";
import { useFlowHandlers } from "../useFlowHandlers";
import { getNode } from "@/modules/flow/Components/Flow/FlowContent.utils";
import { DROP_EFFECT } from "@/modules/flow/Components/Flow/Flow.constants";
import { Events } from "@/modules/events/domain";
import { renderHook, act } from "@/utils/testUtils";

vi.mock("@xyflow/react", async () => {
  const actual = await vi.importActual("@xyflow/react");

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(actual as any),
    useReactFlow: vi.fn(),
    addEdge: vi.fn(),
  };
});

vi.mock("@/modules/flow/Components/Flow/FlowContent.utils", () => ({
  getNode: vi.fn(),
}));

describe("useFlowHandlers", () => {
  const mockSetEdges = vi.fn((params) => addEdge(params, []));
  const mockSetNodes = vi.fn();
  const mockScreenToFlowPosition = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useReactFlow as Mock).mockReturnValue({
      screenToFlowPosition: mockScreenToFlowPosition,
    });
  });

  it("should handle onConnect correctly", () => {
    const { result } = renderHook(() =>
      useFlowHandlers({ setEdges: mockSetEdges, setNodes: mockSetNodes }),
    );

    const edgeParams: Edge = { id: "e1", source: "1", target: "2" };

    act(() => {
      result.current.onConnect(edgeParams);
    });

    expect(addEdge).toHaveBeenCalled();
    expect(mockSetEdges).toHaveBeenCalled();
  });

  it("should handle onDragOver correctly", () => {
    const { result } = renderHook(() =>
      useFlowHandlers({ setEdges: mockSetEdges, setNodes: mockSetNodes }),
    );

    const event = {
      preventDefault: vi.fn(),
      dataTransfer: {
        dropEffect: DROP_EFFECT,
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    act(() => {
      result.current.onDragOver(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.dataTransfer.dropEffect).toBe(DROP_EFFECT);
  });

  it("should handle onDrop correctly", () => {
    const { result } = renderHook(() =>
      useFlowHandlers({ setEdges: mockSetEdges, setNodes: mockSetNodes }),
    );

    const event = {
      preventDefault: vi.fn(),
      clientX: 100,
      clientY: 200,
      dataTransfer: {
        getData: vi.fn().mockReturnValue("nodeType"),
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    const mockNode = { id: "1", type: "nodeType", position: { x: 100, y: 200 } };

    (getNode as Mock).mockReturnValue(mockNode);
    mockScreenToFlowPosition.mockReturnValue({ x: 100, y: 200 });

    act(() => {
      result.current.onDrop(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.dataTransfer.getData).toHaveBeenCalledWith(Events.FLOW_DRAG_DROP_NODE);
    expect(mockScreenToFlowPosition).toHaveBeenCalledWith({ x: 100, y: 200 });
    expect(getNode).toHaveBeenCalledWith("nodeType", { x: 100, y: 200 });
    expect(mockSetNodes).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should not add node if getNode returns undefined", () => {
    const { result } = renderHook(() =>
      useFlowHandlers({ setEdges: mockSetEdges, setNodes: mockSetNodes }),
    );

    const event = {
      preventDefault: vi.fn(),
      clientX: 100,
      clientY: 200,
      dataTransfer: {
        getData: vi.fn().mockReturnValue("nodeType"),
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    (getNode as Mock).mockReturnValue(undefined);
    mockScreenToFlowPosition.mockReturnValue({ x: 100, y: 200 });

    act(() => {
      result.current.onDrop(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.dataTransfer.getData).toHaveBeenCalledWith(Events.FLOW_DRAG_DROP_NODE);
    expect(mockScreenToFlowPosition).toHaveBeenCalledWith({ x: 100, y: 200 });
    expect(getNode).toHaveBeenCalledWith("nodeType", { x: 100, y: 200 });
    expect(mockSetNodes).not.toHaveBeenCalled();
  });
});
