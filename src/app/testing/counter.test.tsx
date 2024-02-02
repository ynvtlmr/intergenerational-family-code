import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./counter";

describe("Counter", () => {
  test("should render with initial state of 1", async () => {
    renderCounter();
    expect(await screen.findByText(/^0$/)).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /Increment/i })
    ).toBeInTheDocument();
  });

  test("should increase count by clicking a button", async () => {
    const user = userEvent.setup();

    renderCounter();

    expect(await screen.findByText(/^0$/)).toBeInTheDocument();

    await act(async () => {
      await user.click(
        await screen.findByRole("button", { name: /Increment/i })
      );
    });

    expect(await screen.findByText(/^1$/)).toBeInTheDocument();
  });
});

const renderCounter = () => {
  return render(<Counter />);
};
