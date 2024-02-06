describe("Decision Tree", () => {
  beforeEach(() => {
    cy.visit("/decision-tree");
  });

  test("Should render decision tree page", () => {
    cy.get("h1").contains("Decision Tree");
  });
});
