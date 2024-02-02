import { render, screen } from "@testing-library/react";
import Page from "./page";

test("Expect Testing React App to be in the page", () => {
  render(<Page />);
  expect(screen.getByText("Testing React App")).toBeInTheDocument();
});
