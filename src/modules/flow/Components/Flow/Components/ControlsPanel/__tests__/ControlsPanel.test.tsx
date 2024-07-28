import { ControlsPanel } from "../ControlsPanel";
import { render, screen, userEvent } from "@/utils/testUtils";

describe("ControlsPanel", () => {
  it("renders buttons and handles click events", async () => {
    const user = userEvent.setup();
    const onSaveMock = vi.fn();
    const onClickMapMock = vi.fn();

    render(<ControlsPanel onClickMap={onClickMapMock} onSave={onSaveMock} />);

    const saveButton = screen.getByText("Save");
    const mapButton = screen.getByText("Map");

    expect(saveButton).toBeInTheDocument();
    expect(mapButton).toBeInTheDocument();

    await user.click(saveButton);
    expect(onSaveMock).toHaveBeenCalledTimes(1);

    await user.click(mapButton);
    expect(onClickMapMock).toHaveBeenCalledTimes(1);
  });
});
