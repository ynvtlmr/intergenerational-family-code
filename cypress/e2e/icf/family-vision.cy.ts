describe("family vision", () => {
  beforeEach(() => {
    cy.visit("/family-vision");
  });

  it("should add the vision, when user types their vision into the textarea and click on the add button", () => {
    cy.getByData("statement-textarea").type("Family Vision");

    cy.getByData("add-button").click();

    cy.getByData("form-item-heading")
      .eq(0)
      .contains("Family Vision")
      .should("exist");
  });

  it("should delete the vision, when user clicks on the delete button", () => {
    cy.getByData("statement-textarea").type("Family Vision");

    cy.getByData("add-button").click();

    cy.getByData("form-item-heading")
      .eq(0)
      .contains("Family Vision")
      .should("exist");

    const formItem = cy.getByData("form-item").eq(0);
    cy.getByData("delete-button").eq(0).click();

    formItem.should("not.exist");
  });
});
