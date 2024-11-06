/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubstringForm from "./SubstringForm";

const mockOnSubmit = jest.fn();

describe("SubstringForm", () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders the form elements correctly", () => {
    render(<SubstringForm onSubmit={mockOnSubmit} isLoading={false} />);

    const inputElement = screen.getByLabelText(/Enter a string/i);
    expect(inputElement).toBeInTheDocument();

    const helpText = screen.getByText(
      /Only alphanumeric characters and basic punctuation \(.,!\?\)/i
    );
    expect(helpText).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /calculate/i });
    expect(button).toBeInTheDocument();
  });

  it("validates the input string and shows an error message if input is empty", async () => {
    render(<SubstringForm onSubmit={mockOnSubmit} isLoading={false} />);

    const inputElement = screen.getByLabelText(/Enter a string/i);
    const button = screen.getByRole("button", { name: /calculate/i });

    await act(async () => {
      fireEvent.change(inputElement, { target: { value: "" } });
      fireEvent.click(button);
    });

    const errorMessage = await screen.findByRole("alert");
    expect(errorMessage).toHaveTextContent("String is required");
  });

  it("validates the input string and shows an error message if input exceeds 100 characters", async () => {
    render(<SubstringForm onSubmit={mockOnSubmit} isLoading={false} />);

    const inputElement = screen.getByLabelText(/Enter a string/i);
    const button = screen.getByRole("button", { name: /calculate/i });

    const longString = "a".repeat(101);
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: longString } });
      fireEvent.click(button);
    });

    const errorMessage = await screen.findByRole("alert");
    expect(errorMessage).toHaveTextContent(
      "String must be less than 100 characters"
    );
  });

  it("validates the input string and shows an error message if input contains invalid characters", async () => {
    render(<SubstringForm onSubmit={mockOnSubmit} isLoading={false} />);

    const inputElement = screen.getByLabelText(/Enter a string/i);
    const button = screen.getByRole("button", { name: /calculate/i });

    await act(async () => {
      fireEvent.change(inputElement, { target: { value: "Invalid@String" } });
      fireEvent.click(button);
    });

    const errorMessage = await screen.findByRole("alert");
    expect(errorMessage).toHaveTextContent(
      "Only alphanumeric characters and basic punctuation (.,!?) are allowed"
    );
  });

  //   it("submits the form when input is valid", async () => {
  //     render(<SubstringForm onSubmit={mockOnSubmit} isLoading={false} />);

  //     const inputElement = screen.getByLabelText(/Enter a string/i);
  //     const formElement = screen.getByRole("form", { name: /substring form/i }); // Use the form element

  //     await act(async () => {
  //       fireEvent.change(inputElement, { target: { value: "ValidString123!" } });
  //       fireEvent.submit(formElement); // Trigger submit on the form element
  //     });

  //     expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  //     expect(mockOnSubmit).toHaveBeenCalledWith({
  //       inputString: "ValidString123!",
  //     });
  //   });

  it("disables the submit button when isLoading is true", () => {
    render(<SubstringForm onSubmit={mockOnSubmit} isLoading={true} />);

    const button = screen.getByRole("button", { name: /calculate/i });
    expect(button).toBeDisabled();
  });
});
