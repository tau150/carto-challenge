/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-simple-toasts";
import { Mock } from "vitest";
import { useNodesState, useEdgesState } from "@xyflow/react";
import { FlowContent } from "../FlowContent";
import {
  SUCCESS_SAVE_MESSAGE,
  SUCCESS_AUTO_SAVE_MESSAGE,
  AUTO_SAVE_INTERVAL,
} from "../Flow.constants";
import { render, screen, userEvent } from "@/utils/testUtils";
import { Routes } from "@/router";
import { useLocalStorage, useFlowData } from "@/hooks";

const mockNavigate = vi.fn();

vi.mock("react-simple-toasts");
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...(actual as any),
    useNavigate: vi.fn(() => mockNavigate),
  };
});

vi.mock("@/hooks", async () => {
  const actual = await vi.importActual("@/hooks");

  return {
    ...(actual as any),
    useLocalStorage: vi.fn(),
    useFlowData: vi.fn(),
  };
});

vi.mock("@xyflow/react", async () => {
  const actual = await vi.importActual("@xyflow/react");

  return {
    ...(actual as any),
    useNodesState: vi.fn(),
    useEdgesState: vi.fn(),
    useReactFlow: vi.fn(() => ({
      screenToFlowPosition: vi.fn(),
    })),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("FlowContent", () => {
  const mockUseLocalStorage = useLocalStorage as Mock;
  const mockUseFlowData = useFlowData as Mock;
  const mockUseNodeState = useNodesState as Mock;
  const mockUseEdgesState = useEdgesState as Mock;

  beforeEach(() => {
    mockUseLocalStorage.mockReturnValue([[], vi.fn()]);
    mockUseFlowData.mockReturnValue({
      setFlowData: vi.fn(),
      saveNodes: vi.fn(),
      saveEdges: vi.fn(),
      flowData: { nodes: [], edges: [] },
    });
    mockUseNodeState.mockReturnValue([[], vi.fn(), vi.fn()]);
    mockUseEdgesState.mockReturnValue([[], vi.fn(), vi.fn()]);
    vi.clearAllMocks();
  });

  it("renders correctly and handles interactions", async () => {
    const user = userEvent.setup();

    render(<FlowContent />);

    const saveButton = screen.getByText("Save");
    const mapButton = screen.getByText("Map");

    expect(saveButton).toBeInTheDocument();
    expect(mapButton).toBeInTheDocument();

    await user.click(saveButton);

    expect(toast).toHaveBeenCalledWith(SUCCESS_SAVE_MESSAGE);

    await user.click(mapButton);
    expect(toast).toHaveBeenCalledWith(SUCCESS_SAVE_MESSAGE);
    expect(mockNavigate).toHaveBeenCalledWith(Routes.MAP);
  });

  it("call the correct actions when there is an auto save", () => {
    vi.useFakeTimers();
    render(<FlowContent />);

    vi.advanceTimersByTime(AUTO_SAVE_INTERVAL);
    expect(toast).toHaveBeenCalledWith(SUCCESS_AUTO_SAVE_MESSAGE);
  });
});
