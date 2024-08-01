/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemoryRouter } from "react-router-dom";
import { NotFound } from "../NotFound";
import { render, screen, fireEvent } from "@/utils/testUtils";
import { Routes } from "@/router";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...(actual as any),
    useNavigate: vi.fn(() => mockNavigate),
  };
});
describe("NotFound Component", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it("should render the NotFound component correctly", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /go to flow/i })).toBeInTheDocument();
  });

  it("should navigate to FLOW route when button is clicked", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /go to flow/i }));

    expect(mockNavigate).toHaveBeenCalledWith(Routes.FLOW);
  });
});
