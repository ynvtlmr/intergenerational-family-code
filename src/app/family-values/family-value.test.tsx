import { render, screen } from "@testing-library/react";
import FamilyValue from "./page";
import userEvent from "@testing-library/user-event";

const renderFamilyValue = () => {
  return render(<FamilyValue />);
};

const inputPlaceholder = "Title";
const textAreaPlaceholder = "Enter a short description...";

describe("Family Value", () => {
  test("Should render form and add button on initial load", () => {
    renderFamilyValue();

    const inputEl = screen.getByPlaceholderText(inputPlaceholder);
    const textAreaEl = screen.getByPlaceholderText(textAreaPlaceholder);

    const buttonEl = screen.getByRole("button", { name: /Add/i });

    expect(inputEl).toBeInTheDocument();
    expect(textAreaEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  });

  test("Should add family value to the list", async () => {
    const user = userEvent.setup();
    renderFamilyValue();

    const inputEl = await screen.findByPlaceholderText(inputPlaceholder);
    const textAreaEl = await screen.findByPlaceholderText(textAreaPlaceholder);

    const userInput = "Testing";
    const textAreaInput = "This is a test";

    await user.type(inputEl, userInput);
    await user.type(textAreaEl, textAreaInput);

    expect(inputEl).toHaveValue(userInput);
    expect(textAreaEl).toHaveValue(textAreaInput);

    const buttonEl = await screen.findByRole("button", { name: /Add/i });

    await user.click(buttonEl);

    const newItem = await screen.findByText(userInput);

    expect(newItem).toBeInTheDocument();

    const ul = await screen.findByRole("list");

    expect(ul).toContainElement(newItem);
  });

  test("Should delete family value from the list", async () => {
    const user = userEvent.setup();
    renderFamilyValue();

    const inputEl = await screen.findByPlaceholderText(inputPlaceholder);

    const userInput = "Testing";

    await user.type(inputEl, userInput);

    const buttonEl = await screen.findByRole("button", { name: /Add/i });

    await user.click(buttonEl);

    const newItem = await screen.findByText(userInput);

    expect(newItem).toBeInTheDocument();

    const deleteButton = await screen.findByTitle("Delete");

    expect(deleteButton).toBeInTheDocument();

    await user.click(deleteButton);

    expect(newItem).not.toBeInTheDocument();
  });
});
