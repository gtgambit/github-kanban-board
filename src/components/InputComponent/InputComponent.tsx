import React, { FC, useState, ChangeEvent } from "react";
import { Input, Button } from "antd";
import { InputProps } from "antd/lib/input";
import { NotificationError } from "../NotificationError/NotificationError";

interface InputComponentProps extends InputProps {
  inputValue: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.SyntheticEvent) => void;
}

const validateGithubUrl = (value: string) => {
  const regex = /^https:\/\/github.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+$/;
  if (!regex.test(value)) {
    return "Input should be in the format 'https://github.com/[username]/[repo]'";
  }
  return "";
};

export const InputComponent: FC<InputComponentProps> = ({
  inputValue,
  handleInputChange,
  handleSubmit,
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleInputChange(event);
    setErrorMessage(validateGithubUrl(value));
  };

  const isDisabled = inputValue.length < 3 || errorMessage !== "";

  return (
    <>
      {errorMessage && <NotificationError description={errorMessage} />}
      <div style={{ marginBottom: "16px", marginTop: "16px", display: "flex" }}>
        <Input
          id="input-id"
          name="input-name"
          placeholder="Enter repo URL"
          value={inputValue}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={100}
          pattern="[A-Za-z]+"
          title={errorMessage}
          style={{ marginBottom: "8px" }}
          {...props}
        />

        <Button
          type="primary"
          onClick={handleSubmit}
          style={{ marginLeft: "8px" }}
          disabled={isDisabled}>
          Load Issue
        </Button>
      </div>
    </>
  );
};
