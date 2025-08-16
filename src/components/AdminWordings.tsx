import React, { useEffect, useState } from "react";
import { Table, Input, Button, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import Styles from "../styles/adminpanel.module.css";

type WordingItem = { KeyName: string; Value: string; };

interface AdminWordingsProps {
  apiBase: string;
}

const AdminWordings: React.FC<AdminWordingsProps> = ({ apiBase }) => {
  const [wordings, setWordings] = useState<WordingItem[]>([]);
  const [loadingWordings, setLoadingWordings] = useState(false);
  const [editedWordings, setEditedWordings] = useState<Record<string, string>>({});
  const [pagination, setPagination] = useState<{ current: number; pageSize: number; total: number }>({
    current: 1,
    pageSize: 10,
    total: 0
  });

  useEffect(() => {
    fetchWordings(pagination.current, pagination.pageSize);
  }, []);

  const fetchWordings = async (current = 1, pageSize = 10) => {
    setLoadingWordings(true);
    try {
      const res = await fetch(`${apiBase}/api/wordings`);
      const data: WordingItem[] = await res.json();

      setWordings(data);
      setEditedWordings(Object.fromEntries(data.map(i => [i.KeyName, i.Value])));
      setPagination(prev => ({ ...prev, current, pageSize, total: data.length }));
    } catch {
      message.error("Error loading wordings");
    } finally {
      setLoadingWordings(false);
    }
  };

  const handleWordingChange = (key: string, value: string) => {
    setEditedWordings(prev => ({ ...prev, [key]: value }));
  };

  const saveWording = async (key: string) => {
    try {
      await fetch(`${apiBase}/api/wordings/${encodeURIComponent(key)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: editedWordings[key] }),
      });
      setWordings(prev =>
        prev.map(item =>
          item.KeyName === key ? { ...item, Value: editedWordings[key] } : item
        )
      );

      message.success("Wording updated");
    } catch {
      message.error("Error saving wording");
    }
  };

  const wordingColumns = [
    {
      title: "Key",
      dataIndex: "KeyName",
      key: "KeyName",
      sorter: (a: WordingItem, b: WordingItem) => a.KeyName.localeCompare(b.KeyName),
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
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 50],
        }}
        onChange={(pag) => {
          const current = pag.current ?? 1;
          const pageSize = pag.pageSize ?? 10;
          setPagination(prev => ({ ...prev, current, pageSize }));
        }}
      />
    </div>
  );
};

export default AdminWordings;
