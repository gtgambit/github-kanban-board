import React, { FC, useMemo } from "react";
import { Breadcrumb } from "antd";

interface BreadcrumbProps {
  repo: string;
}

export const BreadcrumbSection: FC<BreadcrumbProps> = ({ repo }) => {
  const parts = useMemo(() => repo.split("/"), [repo]);
  const owner = parts.length >= 4 ? parts[3] : null;
  const repoName = parts.length >= 5 ? parts[4] : null;

  const breadcrumbItems = useMemo(() => {
    const items = [];
    if (owner) {
      items.push({
        title: (
          <a
            href={`https://github.com/${owner}`}
            rel="noreferrer"
            target="_blank">
            {owner}
          </a>
        ),
      });
    }
    if (repoName) {
      items.push({
        title: (
          <a
            href={`https://github.com/${owner}/${repoName}`}
            rel="noreferrer"
            target="_blank">
            {repoName}
          </a>
        ),
      });
    }
    return items;
  }, [owner, repoName]);

  return <Breadcrumb items={breadcrumbItems} />;
};
