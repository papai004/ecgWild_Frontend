import React, { useEffect, useState } from "react";
import { Table, Input, Button, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import Styles from "../styles/adminpanel.module.css";

type WordingItem = {
  KeyName: string;
  Value: string;
};

interface AdminWordingsProps {
  apiBase: string;
}

const AdminWordings: React.FC<AdminWordingsProps> = ({ apiBase }) => {
  const [wordings, setWordings] = useState<WordingItem[]>([]);
  const [loadingWordings, setLoadingWordings] = useState(false);
  const [editedWordings, setEditedWordings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchWordings();
  }, []);

  const fetchWordings = async () => {
    setLoadingWordings(true);
    try {
      const res = await fetch(`${apiBase}/api/wordings`);
      const data = await res.json();
      setWordings(data);

      const editMap: Record<string, string> = {};
      data.forEach((item: WordingItem) => {
        editMap[item.KeyName] = item.Value;
      });
      setEditedWordings(editMap);
    } catch {
      message.error("Error loading wordings");
    } finally {
      setLoadingWordings(false);
    }
  };

  const handleWordingChange = (key: string, value: string) => {
    setEditedWordings((prev) => ({ ...prev, [key]: value }));
  };

  const saveWording = async (key: string) => {
    try {
      await fetch(`${apiBase}/api/wordings/${encodeURIComponent(key)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: editedWordings[key] }),
      });
      message.success("Wording updated");
      fetchWordings();
    } catch {
      message.error("Error saving wording");
    }
  };

  const wordingColumns = [
    {
      title: "Key",
      dataIndex: "KeyName",
      key: "KeyName",
    },
    {
      title: "Value",
      key: "Value",
      render: (_: any, record: WordingItem) => (
        <Input.TextArea
          value={editedWordings[record.KeyName]}
          onChange={(e) => handleWordingChange(record.KeyName, e.target.value)}
          autoSize
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: WordingItem) => (
        <Button
          icon={<SaveOutlined />}
          className={Styles.saveButton}
          onClick={() => saveWording(record.KeyName)}
        >
          Save
        </Button>
      ),
    },
  ];

  return (
    <div className={Styles.tableWrapper}>
      <Table
        columns={wordingColumns}
        dataSource={wordings}
        loading={loadingWordings}
        rowKey="KeyName"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default AdminWordings;
