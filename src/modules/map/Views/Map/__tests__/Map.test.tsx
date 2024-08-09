/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-simple-toasts";
import { Mock } from "vitest";
import { Map } from "../Map";
import { useFetchSources } from "../hooks/useFetchSources";
import { getLayersCollection, getTooltip } from "../Map.utils";
import { render, screen, waitFor, userEvent } from "@/utils/testUtils";
import { useFlowData } from "@/hooks";
import { Routes } from "@/router";

vi.mock("@/hooks");
vi.mock("../hooks/useFetchSources");
vi.mock("../Map.utils");
vi.mock("react-simple-toasts");
vi.mock("@deck.gl/react");

const mockNavigate = vi.fn();

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

vi.mock("@DeckGL", async () => <div>DeckGL map</div>);

describe("Map", () => {
  const mockFlowData = {
    nodes: [
      { id: "1", data: { value: "https://node1.com" }, position: { y: 100 } },
      { id: "2", data: { value: "https://node2.com" }, position: { y: 200 } },
    ],
    edges: [{ source: "1", target: "2" }],
  };

  beforeEach(() => {
    (useFlowData as Mock).mockReturnValue({ flowData: mockFlowData });
    (useFetchSources as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      errors: [],
    });
    (getLayersCollection as Mock).mockReturnValue([]);
    (getTooltip as Mock).mockReturnValue({});
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    render(<Map />);
    expect(screen.getByTestId("map-loader")).toBeInTheDocument();
  });

  it("renders error toast when there are errors", async () => {
    const mockErrors = [{ error: "Error 1" }, { error: "Error 2" }];

    (useFetchSources as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      errors: mockErrors,
    });

    render(<Map />);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledTimes(2);
      expect(toast).toHaveBeenCalledWith(
        "There were some errors and some layers could not be loaded, Error 1",
      );
      expect(toast).toHaveBeenCalledWith(
        "There were some errors and some layers could not be loaded, Error 2",
      );
    });
  });

  it("renders map layers when data is loaded", async () => {
    (useFetchSources as Mock).mockReturnValue({
      data: [{}],
      isLoading: false,
      errors: [],
    });

    render(<Map />);

    await waitFor(() => {
      expect(getLayersCollection).toHaveBeenCalled();
      expect(screen.getByRole("button", { name: /flow/i })).toBeInTheDocument();
    });
  });

  it("navigates to flow route when Flow button is clicked", async () => {
    const user = userEvent.setup();

    (useFetchSources as Mock).mockReturnValue({
      data: [{}],
      isLoading: false,
      errors: [],
    });

    render(<Map />);

    await user.click(screen.getByRole("button", { name: /flow/i }));
    expect(mockNavigate).toHaveBeenCalledWith(Routes.FLOW);
  });
});
