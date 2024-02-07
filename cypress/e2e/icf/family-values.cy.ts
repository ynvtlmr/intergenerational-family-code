describe("family values", () => {
  beforeEach(() => {
    cy.visit("/family-values");
  });

  it("should add the value, when user types their value into the textarea and click on the add button", () => {
    cy.getByData("family-value-title-input").type("Family Value");
    cy.getByData("family-value-description-textarea").type(
      "This is a family value."
    );
    cy.getByData("add-button").click();

    cy.getByData("form-item-heading")
      .eq(0)
      .contains("Family Value")
      .should("exist");

    cy.getByData("form-item-description")
      .eq(0)
      .contains("This is a family value.")
      .should("exist");
  });

  it("should delete the value, when user clicks on the delete button", () => {
    cy.getByData("family-value-title-input").type("Family Value");
    cy.getByData("family-value-description-textarea").type(
      "This is a family value."
    );
    cy.getByData("add-button").click();

    cy.getByData("form-item-heading")
      .eq(0)
      .contains("Family Value")
      .should("exist");

    cy.getByData("form-item-description")
      .eq(0)
      .contains("This is a family value.")
      .should("exist");

    const formItem = cy.getByData("form-item").eq(0);
    cy.getByData("delete-button").eq(0).click();

    formItem.should("not.exist");
  });
});
