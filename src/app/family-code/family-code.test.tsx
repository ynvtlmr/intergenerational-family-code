import { render } from "@testing-library/react";
import FamilyCodePage from "./page";
import testFormPageInputOutput from "../__tests__/shared";

const renderFamilyCodePage = () => {
  return render(<FamilyCodePage />);
};

testFormPageInputOutput({
  testGroupLabel: "Family Code",
  renderPage: renderFamilyCodePage,
  initialLoadTestDescription:
    "Should render the textarea and add button on intial load",
  inputPlaceholder:
    "The Stark family commits to excellence in that which is most impactful.",
  addItemTestDescription: "Should add statement to the family code",
  deleteItemTestDescription: "Should delete statement from the family code",
});
