import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { InputComponent } from "./InputComponent";

describe("InputComponent", () => {
  it("should render without errors", () => {
    const { getByPlaceholderText } = render(
      <InputComponent
        inputValue={""}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        handleInputChange={() => {}}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        handleSubmit={() => {}}
      />
    );
    expect(getByPlaceholderText("Enter repo URL")).toBeInTheDocument();
  });

  it("should update input value when text is entered", () => {
    const handleInputChange = jest.fn();
    const { getByPlaceholderText } = render(
      <InputComponent
        inputValue=""
        handleInputChange={handleInputChange}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        handleSubmit={() => {}}
      />
    );

    const input = getByPlaceholderText("Enter repo URL");
    fireEvent.change(input, { target: { value: "https://github.com" } });

    expect(handleInputChange).toHaveBeenCalled();
    expect((input as HTMLInputElement).value).toBe("https://github.com");
  });

  it("should disable the button when input value is less than 3 characters or invalid", () => {
    const handleSubmit = jest.fn();
    const { getByRole, getByPlaceholderText } = render(
      <InputComponent
        inputValue=""
        handleSubmit={handleSubmit}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        handleInputChange={() => {}}
      />
    );

    const input = getByPlaceholderText("Enter repo URL");
    const button = getByRole("button", { name: "Load Issue" });

    fireEvent.change(input, { target: { value: "ht" } });
    expect(button).toBeDisabled();

    fireEvent.change(input, {
      target: { value: "https://github.com/invalid_url" },
    });
    expect(button).toBeDisabled();

    fireEvent.change(input, {
      target: { value: "https://github.com/valid_url" },
    });
    expect(button).not.toBeDisabled();
  });

  it("should display an error message when the input is invalid", () => {
    const { getByPlaceholderText, getByTitle } = render(
      <InputComponent
        inputValue={""}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        handleInputChange={() => {}}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        handleSubmit={() => {}}
      />
    );

    const input = getByPlaceholderText("Enter repo URL");
    fireEvent.change(input, { target: { value: "invalid_url" } });

    expect(
      getByTitle(
        "Input should be in the format 'https://github.com/[username]/[repo]'"
      )
    ).toBeInTheDocument();
  });
});
