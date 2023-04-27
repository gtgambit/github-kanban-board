import React from "react";
import { render } from "@testing-library/react";
import { Columns } from "./Columns";

// Mock useSelector hook
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("Columns", () => {
  it("should render columns with tasks", () => {
    const mockData = {
      toDo: { title: "To Do", tasks: [{ id: 1, title: "Task 1" }] },
      inProgress: { title: "In Progress", tasks: [] },
      done: { title: "Done", tasks: [] },
      isLoading: false,
      error: null,
    };

    // Mock the useSelector hook to return mockData
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.spyOn(require("react-redux"), "useSelector").mockReturnValue(mockData);

    const { getByText } = render(<Columns />);

    expect(getByText("To Do")).toBeInTheDocument();
    expect(getByText("Task 1")).toBeInTheDocument();
  });

  it("should not render loading or error state", () => {
    const mockData = {
      toDo: { title: "To Do", tasks: [] },
      inProgress: { title: "In Progress", tasks: [] },
      done: { title: "Done", tasks: [] },
      isLoading: true,
      error: "Error message",
    };

    // Mock the useSelector hook to return mockData
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.spyOn(require("react-redux"), "useSelector").mockReturnValue(mockData);

    const { queryByText } = render(<Columns />);

    expect(queryByText("To Do")).toBeInTheDocument();
    expect(queryByText("Loading...")).not.toBeInTheDocument();
    expect(queryByText("Error message")).not.toBeInTheDocument();
  });
});
