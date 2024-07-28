import { render, screen } from "@testing-library/react";
import { SourceNodeCard } from "../SourceNodeCard";

vi.mock("@/modules/flow/domain", () => ({
  NodeType: {
    SOURCE: "source",
  },
}));

describe("SourceNodeCard", () => {
  it("renders NodeCard with FakeInput", () => {
    render(<SourceNodeCard />);

    expect(screen.getByText("Source")).toBeInTheDocument();
  });
});
