describe("smoke tests", () => {
  it("should allow a typical user flow", () => {
    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /blog/i }).click();
    cy.location("pathname").should("contain", "/blog").wait(1000);
    cy.findByRole("link", { name: /booking/i }).click();
    cy.location("pathname").should("contain", "booking").wait(1000);
  });
});
