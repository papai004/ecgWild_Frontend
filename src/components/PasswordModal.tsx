
import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import { verifyPassword } from "../utils/auth";

interface Props {
  visible: boolean;
  onSuccess: () => void;
}

const PasswordModal: React.FC<Props> = ({ visible, onSuccess }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (verifyPassword(password)) {
      message.success("Access granted!");
      onSuccess();
    } else {
      message.error("Incorrect password");
    }
  };

  return (
    <Modal
      title="Enter Admin Password"
      open={visible}
      footer={null}
      closable={false}
    >
      <Input.Password
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onPressEnter={handleSubmit}
      />
      <Button type="primary" block style={{ marginTop: 10, backgroundColor: "#4CAF50", borderColor: "#4CAF50" }} onClick={handleSubmit}>
        Submit
      </Button>
    </Modal>
  );
};

export default PasswordModal;
