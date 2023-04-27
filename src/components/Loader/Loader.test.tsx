import React from "react";
import { render } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader", () => {
  it("should render without errors", () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("should have the correct styles", () => {
    const { getByTestId } = render(<Loader />);
    const loader = getByTestId("loader");

    expect(loader).toHaveStyle({
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "9999",
    });
  });
});
