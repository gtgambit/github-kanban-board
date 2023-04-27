import React from "react";
import { render, screen } from "@testing-library/react";
import { BreadcrumbSection } from "./BreadCrumbsSection";
describe("BreadcrumbSection", () => {
  it("renders a breadcrumb with two items when given a repo name with an owner", () => {
    render(<BreadcrumbSection repo="github/user/repo" />);

    const ownerLink = screen.getByRole("link", { name: /user/ });
    const repoLink = screen.getByRole("link", { name: /repo/ });

    expect(ownerLink).toHaveAttribute("href", "https://github.com/user");
    expect(repoLink).toHaveAttribute("href", "https://github.com/user/repo");

    const breadcrumb = screen.getByRole("navigation");
    const breadcrumbItems = breadcrumb.querySelectorAll("li");

    expect(breadcrumbItems.length).toBe(2);
    expect(breadcrumbItems[0]).toContainElement(ownerLink);
    expect(breadcrumbItems[1]).toContainElement(repoLink);
  });

  it("renders a breadcrumb with one item when given a repo name without an owner", () => {
    render(<BreadcrumbSection repo="repo" />);

    const repoLink = screen.getByRole("link", { name: /repo/ });

    expect(repoLink).toHaveAttribute("href", "https://github.com/repo");

    const breadcrumb = screen.getByRole("navigation");
    const breadcrumbItems = breadcrumb.querySelectorAll("li");

    expect(breadcrumbItems.length).toBe(1);
    expect(breadcrumbItems[0]).toContainElement(repoLink);
  });

  it("does not render a breadcrumb when not given a repo name", () => {
    render(<BreadcrumbSection repo={"string"} />);

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
