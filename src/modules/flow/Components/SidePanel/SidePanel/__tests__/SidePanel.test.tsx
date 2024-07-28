import { SidePanel } from "../SidePanel";
import { render, screen, userEvent } from "@/utils/testUtils";

describe("SidePanel", () => {
  it("renders correctly with children and collapses/expands on click", async () => {
    const user = userEvent.setup();

    render(
      <SidePanel>
        <div>Child Content</div>
      </SidePanel>,
    );

    expect(screen.getByText("Your available Nodes")).toBeInTheDocument();
    expect(
      screen.getByText("Drag and drop to the right to interact with your nodes"),
    ).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();

    const collapseIcon = screen.getByTestId("collapse-icon");

    expect(collapseIcon).toBeInTheDocument();

    await user.click(collapseIcon);

    expect(screen.getByTestId("unCollapse-icon")).toBeInTheDocument();

    expect(screen.queryByText("Your available Nodes")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Drag and drop to the right to interact with your nodes"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Child Content")).not.toBeInTheDocument();

    const unCollapseIcon = screen.getByTestId("unCollapse-icon");

    await user.click(unCollapseIcon);

    expect(screen.getByTestId("collapse-icon")).toBeInTheDocument();
    expect(screen.getByText("Your available Nodes")).toBeInTheDocument();
    expect(
      screen.getByText("Drag and drop to the right to interact with your nodes"),
    ).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});
