import React, { FC } from "react";
import { Space, Spin } from "antd";

export const Loader: FC = () => {
  return (
    <Space
      size="large"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}>
      <Spin size="large" />
    </Space>
  );
};
