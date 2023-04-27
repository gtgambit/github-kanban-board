import React, { FC, useState } from "react";
import { Input, Button } from "antd";
import { InputProps } from "antd/lib/input";

interface InputComponentProps extends InputProps {
  inputValue: string;
  handleInputChange: any;
  handleSubmit: (event: React.SyntheticEvent) => void;
}

export const InputComponent: FC<InputComponentProps> = ({
  inputValue,
  handleInputChange,
  handleSubmit,
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const validateInput = (value: string) => {
    const regex = /^https:\/\/github.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+$/;
    if (!regex.test(value)) {
      setErrorMessage(
        "Input should be in the format 'https://github.com/[username]/[repo]'"
      );
    } else {
      setErrorMessage("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleInputChange(event);
    validateInput(value);
  };

  const isDisabled = inputValue.length < 3 || errorMessage !== "";

  return (
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
  );
};
