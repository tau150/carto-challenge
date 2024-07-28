import { PropsWithChildren } from "react";
import { renderHook, act } from "@/utils/testUtils";
import { FlowDataProvider } from "@/contexts/FlowDataContext";
import { useFlowData } from "@/hooks";
import { NodeType } from "@/modules/flow/domain";

describe("useFlowData", () => {
  console.error = vi.fn();

  it("should throw an error if used outside of FlowDataProvider", () => {
    expect(() => {
      renderHook(() => useFlowData());
    }).toThrowError(new Error("useFlowData must be used within a FlowDataProvider"));
  });

  it("should provide default values", () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <FlowDataProvider>{children}</FlowDataProvider>
    );

    const { result } = renderHook(() => useFlowData(), { wrapper });

    expect(result.current.flowData.edges).toEqual([]);
    expect(result.current.flowData.nodes).toEqual([]);
  });

  it("should update flowData when setFlowData is called", () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <FlowDataProvider>{children}</FlowDataProvider>
    );

    const { result } = renderHook(() => useFlowData(), { wrapper });

    act(() => {
      result.current.setFlowData({
        edges: [{ id: "e1", source: "1", target: "2" }],
        nodes: [
          { id: "1", type: NodeType.LAYER, position: { x: 0, y: 0 }, data: { selected: false } },
        ],
      });
    });

    expect(result.current.flowData.edges).toEqual([{ id: "e1", source: "1", target: "2" }]);
    expect(result.current.flowData.nodes).toEqual([
      { id: "1", type: NodeType.LAYER, position: { x: 0, y: 0 }, data: { selected: false } },
    ]);
  });
});
