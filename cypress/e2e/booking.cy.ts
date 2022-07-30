describe("booking tests", () => {
  it("should correct throw errors with empty fields", () => {
    cy.visitAndCheck("/booking");
    cy.findByRole("button", { name: /book/i }).click();
    cy.findByText(/first name is required/i).should("be.visible");
    cy.findByText(/last name is required/i).should("be.visible");
    cy.findByText(/invalid email/i).should("be.visible");
    cy.findByText(/invalid phone number/i).should("be.visible");
  });
  it("should throw error with incorrect phone number", () => {
    cy.visitAndCheck("/booking");
    cy.validateInputErrorByLabel(/phone/i, "1", /invalid phone number/i);
    cy.validateInputErrorByLabel(/phone/i, "2", /invalid phone number/i);
    cy.validateInputErrorByLabel(/phone/i, "3", /invalid phone number/i);
    cy.validateInputErrorByLabel(/phone/i, "4", /invalid phone number/i);
    cy.validateInputErrorByLabel(/phone/i, "5", /invalid phone number/i);
    cy.validateInputErrorByLabel(/phone/i, "6", /invalid phone number/i);
    cy.validateInputErrorByLabel(/phone/i, "7", /invalid phone number/i);
    cy.validateInputErrorByLabel(/phone/i, "8", /invalid phone number/i);
    cy.validateInputErrorByLabel(/phone/i, "9", /invalid phone number/i, false);
  });
  it("should throw error with incorrect email", () => {
    cy.visitAndCheck("/booking");
    cy.validateInputErrorByLabel(/email/i, "abc@a", /invalid email/i);
    cy.validateInputErrorByLabel(/email/i, "b", /invalid email/i);
    cy.validateInputErrorByLabel(/email/i, "c", /invalid email/i);
    cy.validateInputErrorByLabel(/email/i, ".a", /invalid email/i);
    cy.validateInputErrorByLabel(/email/i, "b", /invalid email/i, false);
  });
  it("should allow booking with correct data", () => {
    cy.visitAndCheck("/booking");
    cy.findByLabelText(/first name/i).type("John");
    cy.findByLabelText(/last name/i).type("Doe");
    cy.findByLabelText(/email/i).type("john@doe.com");
    cy.findByLabelText(/phone/i).type("123456789");
    cy.findByRole("button", { name: /book/i }).click();
    cy.findByText(/booking successful/i).should("be.visible");
    cy.findByRole("link", { name: /book another appointment/i }).should(
      "be.visible"
    );
  });
});
