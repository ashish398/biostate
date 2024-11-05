/// <reference types="cypress" />

describe("SubstringForm E2E Tests", () => {
  beforeEach(() => {
    // Visit the page where SubstringForm is rendered
    cy.visit("/your-form-page"); // Replace with your actual path
  });

  it("should render the form elements correctly", () => {
    // Check if the input field is rendered
    cy.get("input#inputString").should("be.visible");

    // Check if the help text is rendered
    cy.contains(
      "Only alphanumeric characters and basic punctuation (.,!?)"
    ).should("be.visible");

    // Check if the submit button is rendered
    cy.get('button[aria-label="Calculate"]').should("be.visible");
  });

  it("should display validation errors for invalid input", () => {
    // Try submitting the form without entering any text
    cy.get('button[aria-label="Calculate"]').click();

    // Check if error message is displayed
    cy.contains("String is required").should("be.visible");

    // Enter a string longer than 100 characters
    const longString = "a".repeat(101);
    cy.get("input#inputString").type(longString);
    cy.get('button[aria-label="Calculate"]').click();

    // Check if error message for long input is displayed
    cy.contains("String must be less than 100 characters").should("be.visible");

    // Enter a string with invalid characters
    cy.get("input#inputString").clear().type("Invalid@String");
    cy.get('button[aria-label="Calculate"]').click();

    // Check if error message for invalid characters is displayed
    cy.contains(
      "Only alphanumeric characters and basic punctuation (.,!?) are allowed"
    ).should("be.visible");
  });

  it("should successfully submit the form with valid input", () => {
    // Enter a valid string
    cy.get("input#inputString").type("ValidString123!");
    cy.get('button[aria-label="Calculate"]').click();

    // Check if a success message or result appears
    cy.contains("Form submitted successfully").should("be.visible"); // Update with the actual success message or result
  });

  it("should disable the submit button when isLoading is true", () => {
    // Simulate the loading state (you may need to mock this if applicable)
    // For now, we'll assume the button gets disabled during loading
    cy.get('button[aria-label="Calculate"]').should("be.disabled");
  });
});
