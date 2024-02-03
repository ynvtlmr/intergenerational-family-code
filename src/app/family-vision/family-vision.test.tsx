import { render } from "@testing-library/react";
import FamilyVisionPage from "./page";
import testFormPageInputOutput from "../__tests__/shared";

const renderFamilyVisionPage = () => {
  return render(<FamilyVisionPage />);
};

testFormPageInputOutput({
  testGroupLabel: "Family Vision",
  renderPage: renderFamilyVisionPage,
  initialLoadTestDescription:
    "Should render the textarea and add button on intial load",
  inputPlaceholder:
    "To be a family that is very deeply connected by love and meaning.",
  addItemTestDescription:
    "Should add statement to the Family Vision statements",
  deleteItemTestDescription:
    "Should delete statement from the Family Vision Statements",
});
