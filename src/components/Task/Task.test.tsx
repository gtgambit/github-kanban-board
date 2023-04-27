import React from "react";
import { render } from "@testing-library/react";
import { Task } from "./Task";
import { TaskProps } from "../../types/types";
import { Card } from "antd";

describe("Task component", () => {
  const task: TaskProps = {
    id: 1,
    title: "Task Title",
    created_at: "2022-05-01T10:00:00Z",
    comments: 2,
    url: "",
    repository_url: "",
    labels_url: "",
    comments_url: "",
    events_url: "",
    html_url: "",
    node_id: "",
    number: 0,
    user: {
      login: "",
      id: 0,
      node_id: "",
      avatar_url: "",
      gravatar_id: "",
      url: "",
      html_url: "",
      followers_url: "",
      following_url: "",
      gists_url: "",
      starred_url: "",
      subscriptions_url: "",
      organizations_url: "",
      repos_url: "",
      events_url: "",
      received_events_url: "",
      type: "",
      site_admin: false,
    },
    labels: [],
    state: "",
    locked: false,
    assignee: undefined,
    assignees: [],
    milestone: undefined,
    updated_at: "",
    closed_at: undefined,
    author_association: "",
    active_lock_reason: undefined,
    draft: false,
    pull_request: {
      url: "",
      html_url: "",
      diff_url: "",
      patch_url: "",
      merged_at: undefined,
    },
    body: "",
  };

  it("should render task card with correct title and created date", () => {
    const { getByText } = render(<Task task={task} />);
    expect(getByText("Task Title")).toBeInTheDocument();
    expect(getByText("Created: 2022-05-01T10:00:00Z")).toBeInTheDocument();
  });

  it("should render task card with correct comment count", () => {
    const { getByText } = render(<Task task={task} />);
    expect(getByText("Comments:2")).toBeInTheDocument();
  });

  it("should render the card with correct styles", () => {
    const { getByTestId } = render(<Task task={task} />);
    const card = getByTestId("task-card");
    expect(card).toHaveStyle("margin-bottom: 8px");
  });

  it("should render an Ant Design Card component", () => {
    const { container } = render(<Task task={task} />);
    expect(container.firstChild).toBeInstanceOf(Card);
  });
});
