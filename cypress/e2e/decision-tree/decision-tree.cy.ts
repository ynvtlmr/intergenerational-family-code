describe("Decision Tree", () => {
  beforeEach(() => {
    cy.visit("/decision-tree");
  });

  it("should render the page", () => {
    cy.get("textarea").should("exist");
    cy.get("button").contains("Add").should("exist");
  });

  it("should add question on to the page when user types a new question into the textarea and clicks on the submit button", () => {
    cy.get("textarea").type("Testing decision tree");
    cy.get("button").contains("Add").click();
    cy.get("div").contains("Testing decision tree").should("exist");
  });

  it("should delete question from the page when user clicks on the delete button", () => {
    cy.get("textarea").type("Testing decision tree");
    cy.get("button").contains("Add").click();
    cy.get("div").contains("Testing decision tree").should("exist");
    cy.get(".lucide-trash2").click();
    cy.get("div").contains("Testing decision tree").should("not.exist");
  });
});
