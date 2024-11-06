/// <reference types="cypress" />

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should display the login form", () => {
    cy.get('form[aria-labelledby="loginTitle"]').should("be.visible");
    cy.get('input[id="usernameOrEmail"]').should("be.visible");
    cy.get('input[id="password"]').should("be.visible");
    cy.get('button[aria-label="Login"]').should("be.visible");

    //visual regression test
    cy.get('form[aria-labelledby="loginTitle"]').compareSnapshot(
      "LoginForm",
      0.05
    );
  });

  it("should display an error for invalid credentials", () => {
    cy.get('input[id="usernameOrEmail"]').type("wrongUser@example.com");
    cy.get('input[id="password"]').type("wrongPassword");
    cy.get('button[aria-label="Login"]').click();

    cy.on("window:alert", (text) => {
      expect(text).to.contains("Invalid credentials");
    });
  });

  it("should log in successfully with valid credentials", () => {
    cy.get('input[id="usernameOrEmail"]').type("aj@gmail.com");
    cy.get('input[id="password"]').type("ashish.398");
    cy.get('button[aria-label="Login"]').click();

    cy.url().should("include", "/home");
    cy.contains("Welcome");
  });
});
