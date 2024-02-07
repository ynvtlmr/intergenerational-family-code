describe("family code", () => {
  beforeEach(() => {
    cy.visit("/family-code");
  });

  it("should add the statement, when user types their statement into the textarea and click on the add button", () => {
    cy.getByData("statement-textarea").type("Testing family code");
    cy.getByData("add-button").click();
    cy.getByData("form-item")
      .eq(0)
      .contains("Testing family code")
      .should("exist");
  });

  it("should delete the statement, when user clicks on the delete button", () => {
    cy.getByData("statement-textarea").type("Testing family code");
    cy.getByData("add-button").click();
    let formItem = cy.getByData("form-item").eq(0);
    formItem.contains("Testing family code");
    cy.getByData("delete-button").eq(0).click();
    formItem.should("not.exist");
  });
});
