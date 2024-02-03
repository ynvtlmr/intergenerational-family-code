import { render } from "@testing-library/react";
import DecisionTreePage from "./page";
import testFormPageInputOutput from "../__tests__/shared";

const renderDecisionTreePage = () => {
  return render(<DecisionTreePage />);
};

testFormPageInputOutput({
  testGroupLabel: "Decision Tree",
  renderPage: renderDecisionTreePage,
  initialLoadTestDescription:
    "Should render the textarea and add button on intial load",
  inputPlaceholder: "Does this align with our family values?",
  addItemTestDescription: "Should add question to the decision tree",
  deleteItemTestDescription: "Should delete question from the decision tree",
});
