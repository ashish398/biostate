/// <reference types="cypress" />

describe("Visual Regression Tests", () => {
  beforeEach(() => {
    cy.visit("/substring"); 
  });

  it("should match the baseline snapshot for SubstringForm", () => {
    cy.get('form[aria-label="Substring Form"]').matchImageSnapshot();
  });

  it("should match the snapshot after submitting with valid input", () => {
    cy.get("input#inputString").type("ValidString123!");
    cy.get('button[aria-label="Calculate"]').click();

    cy.get('form[aria-label="Substring Form"]').matchImageSnapshot();
  });

  it("should match the snapshot when validation errors are displayed", () => {
    cy.get('button[aria-label="Calculate"]').click();

    cy.get('form[aria-label="Substring Form"]').matchImageSnapshot();
  });
});
