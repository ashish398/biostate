/// <reference types="cypress" />

describe("Registration Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("should display the registration form", () => {
    cy.get('form[aria-labelledby="registerTitle"]').should("be.visible");
    cy.get('input[id="username"]').should("be.visible");
    cy.get('input[id="email"]').should("be.visible");
    cy.get('input[id="password"]').should("be.visible");
    cy.get('button[aria-label="Register"]').should("be.visible");

    //visual regression test
    cy.get('form[aria-labelledby="registerTitle"]').compareSnapshot(
      "RegistrationForm",
      0.05
    );
  });

  it("should display an error for invalid registration details", () => {
    cy.get('input[id="username"]').type("aj");
    cy.get('input[id="email"]').type("aj@gmail.com");
    cy.get('input[id="password"]').type("1");
    cy.get('button[aria-label="Register"]').click();

    cy.on("window:alert", (text) => {
      expect(text).to.contains("Registration failed");
    });
  });

  it("should successfully register with valid details", () => {
    cy.get('input[id="username"]').type("uniqueUser");
    cy.get('input[id="email"]').type("uniqueUser1@gmail.com");
    cy.get('input[id="password"]').type("validPassword123");
    cy.get('button[aria-label="Register"]').click();

    cy.url().should("include", "/");
  });
});
