import React from "react";
import { render } from "@testing-library/react";
import { NotificationError } from "./NotificationError";

describe("NotificationError", () => {
  it("should render with default props", () => {
    const { getByText } = render(<NotificationError />);
    const errorMessage = getByText("An error occurred!");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should render with custom description", () => {
    const description = "This is a custom error description";
    const { getByText } = render(
      <NotificationError description={description} />
    );
    const errorMessage = getByText(description);
    expect(errorMessage).toBeInTheDocument();
  });
});
