describe("decision", () => {
  beforeEach(() => {
    cy.visit("/decision-tree");
  });

  it("should render the page", () => {
    cy.get("textarea").should("exist");
    cy.get("form.space-y-5 > .inline-flex").contains("Add").should("exist");
  });

  it("should add question on to the page when user types a new question into the textarea and clicks on the submit button", () => {
    cy.get("textarea").type("Testing decision tree");
    cy.get("form.space-y-5 > .inline-flex").contains("Add").click();
    cy.getByData("form-item").eq(0).contains("Testing decision tree");
  });

  it("should delete question from the page when user clicks on the delete button", () => {
    cy.get("textarea").type("Testing decision tree");
    cy.get("form.space-y-5 > .inline-flex").contains("Add").click();
    let formItem = cy.getByData("form-item").eq(0);
    formItem.contains("Testing decision tree");
    cy.get(".lucide-trash2").eq(0).click();
    formItem.should("not.exist");
  });
});
