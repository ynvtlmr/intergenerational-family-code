describe("decision tree", () => {
  beforeEach(() => {
    cy.visit("/decision-tree");
  });

  it("should add question on to the page when user types a new question into the textarea and clicks on the submit button", () => {
    cy.getByData("question-textarea").type("Testing decision tree");
    cy.getByData("add-button").click();
    cy.getByData("form-item").eq(0).contains("Testing decision tree");
  });

  it("should delete question from the page when user clicks on the delete button", () => {
    cy.getByData("question-textarea").type("Testing decision tree");
    cy.getByData("add-button").click();
    let formItem = cy.getByData("form-item").eq(0);
    formItem.contains("Testing decision tree");
    cy.getByData("delete-button").eq(0).click();
    formItem.should("not.exist");
  });
});
