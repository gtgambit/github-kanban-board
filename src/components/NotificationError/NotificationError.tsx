import React from "react";
import { Alert } from "antd";

interface NotificationErrorProps {
  description?: string;
}

export const NotificationError: React.FC<NotificationErrorProps> = ({
  description,
}) => {
  const message = "An error occurred!";
  return (
    <Alert message={message} description={description} type="error" showIcon />
  );
};
