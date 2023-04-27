import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { FC } from "react";
import { TaskProps } from "../../types/types";

interface ITask {
  task: TaskProps;
}

export const Task: FC<ITask> = ({ task }) => {
  return (
    <Card
      type="inner"
      size="small"
      title={task.title}
      style={{ marginBottom: 8 }}>
      <Meta description={`Created: ${task.created_at}`} />
      <Meta description={`Comments:${task.comments}`} />
    </Card>
  );
};
