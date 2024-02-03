import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

type TestFormPageInputOutput = {
  renderPage: () => void;
  inputPlaceholder: string;
  testGroupLabel: string;
  initialLoadTestDescription: string;
  addItemTestDescription: string;
  deleteItemTestDescription: string;
};

export default function testFormPageInputOutput({
  renderPage,
  inputPlaceholder,
  testGroupLabel,
  initialLoadTestDescription,
  addItemTestDescription,
  deleteItemTestDescription,
}: TestFormPageInputOutput) {
  describe(testGroupLabel, () => {
    test(initialLoadTestDescription, () => {
      renderPage();

      const inputEl = screen.getByPlaceholderText(inputPlaceholder);

      const buttonEl = screen.getByRole("button", { name: /Add/i });

      expect(inputEl).toBeInTheDocument();
      expect(buttonEl).toBeInTheDocument();
    });

    test(addItemTestDescription, async () => {
      const user = userEvent.setup();
      renderPage();

      const inputEl = await screen.findByPlaceholderText(inputPlaceholder);

      const userInput = "Testing";

      await user.type(inputEl, userInput);

      expect(inputEl).toHaveValue(userInput);

      const buttonEl = await screen.findByRole("button", { name: /Add/i });

      await user.click(buttonEl);

      const newItem = await screen.findByText(userInput);

      expect(newItem).toBeInTheDocument();

      const ul = await screen.findByRole("list");

      expect(ul).toContainElement(newItem);
    });

    test(deleteItemTestDescription, async () => {
      const user = userEvent.setup();
      renderPage();

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
}
