import { render, screen } from "@testing-library/react";
import FamilyCodePage from "./page";
import userEvent from "@testing-library/user-event";

const placeholder =
  "The Stark family commits to excellence in that which is most impactful.";

describe("Family Code", () => {
  test("Should render the textarea and add button on intial load", () => {
    renderFamilyCodePage();

    const textAreaEl = screen.getByPlaceholderText(placeholder);

    const buttonEl = screen.getByRole("button", { name: /Add/i });

    expect(textAreaEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  });

  test("Should add statement to the family code", async () => {
    const user = userEvent.setup();
    renderFamilyCodePage();

    const textAreaEl = await screen.findByPlaceholderText(placeholder);

    const statement = "Family Code 1";

    await user.type(textAreaEl, statement);

    expect(textAreaEl).toHaveValue(statement);

    const buttonEl = await screen.findByRole("button", { name: /Add/i });

    await user.click(buttonEl);

    const statementEl = await screen.findByText(statement);

    expect(statementEl).toBeInTheDocument();

    const ul = await screen.findByRole("list");

    expect(ul).toContainElement(statementEl);
  });

  test("Should delete statement from the family code", async () => {
    const user = userEvent.setup();
    renderFamilyCodePage();

    const textAreaEl = await screen.findByPlaceholderText(placeholder);

    const question = "Family Code 1";

    await user.type(textAreaEl, question);

    const buttonEl = await screen.findByRole("button", { name: /Add/i });

    await user.click(buttonEl);

    const statementEl = await screen.findByText(question);

    expect(statementEl).toBeInTheDocument();

    const deleteButton = await screen.findByTitle("Delete");

    expect(deleteButton).toBeInTheDocument();

    await user.click(deleteButton);

    expect(statementEl).not.toBeInTheDocument();
  });
});

const renderFamilyCodePage = () => {
  return render(<FamilyCodePage />);
};
