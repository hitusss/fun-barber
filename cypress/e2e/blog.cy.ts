describe("blog tests", () => {
  it("should allow a read blog post", () => {
    cy.visitAndCheck("/blog");

    cy.findAllByRole("link", { name: /example blog post/i })
      .first()
      .click();
    cy.location("pathname")
      .should("contain", "/blog/example-blog-post")
      .wait(1000);
    cy.findByRole("heading", { name: /example blog post/i }).should(
      "be.visible"
    );
    cy.findAllByText(
      /lorem Ipsum is simply dummy text of the printing and typesetting industry./i
    ).should("be.visible");
  });

  it("should allow filter blog posts", () => {
    cy.visitAndCheck("/blog");

    cy.findAllByRole("link", { name: /example blog post/i }).should(
      "have.length.greaterThan",
      1
    );
    cy.findByPlaceholderText(/filter/i).type("example blog post 2");
    cy.findAllByRole("link", { name: /example blog post/i }).should(
      "have.length",
      1
    );
  });
});
