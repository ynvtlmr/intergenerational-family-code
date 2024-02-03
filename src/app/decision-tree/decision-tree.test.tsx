import { render, screen } from "@testing-library/react";
import DecisionTreePage from "./page";
import userEvent from "@testing-library/user-event";

describe("Decision Tree", () => {
  test("Should render the textarea and add button on intial load", () => {
    renderDecisionTreePage();

    const textAreaEl = screen.getByPlaceholderText(
      "Does this align with our family values?"
    );

    const buttonEl = screen.getByRole("button", { name: /Add/i });

    expect(textAreaEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  });

  test("Should add question to the decision tree", async () => {
    const user = userEvent.setup();
    renderDecisionTreePage();

    const textAreaEl = await screen.findByPlaceholderText(
      "Does this align with our family values?"
    );

    const question = "Family Question 1";

    await user.type(textAreaEl, question);

    expect(textAreaEl).toHaveValue(question);

    const buttonEl = await screen.findByRole("button", { name: /Add/i });

    await user.click(buttonEl);

    const questionEl = await screen.findByText(question);

    expect(questionEl).toBeInTheDocument();

    const ul = await screen.findByRole("list");

    expect(ul).toContainElement(questionEl);
  });

  test("Should delete question from the decision tree", async () => {
    const user = userEvent.setup();
    renderDecisionTreePage();

    const textAreaEl = await screen.findByPlaceholderText(
      "Does this align with our family values?"
    );

    const question = "Family Question 1";

    await user.type(textAreaEl, question);

    const buttonEl = await screen.findByRole("button", { name: /Add/i });

    await user.click(buttonEl);

    const questionEl = await screen.findByText(question);

    expect(questionEl).toBeInTheDocument();

    const deleteButton = await screen.findByTitle("Delete");

    expect(deleteButton).toBeInTheDocument();

    await user.click(deleteButton);

    expect(questionEl).not.toBeInTheDocument();
  });
});

const renderDecisionTreePage = () => {
  return render(<DecisionTreePage />);
};
