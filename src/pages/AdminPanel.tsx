import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Input,
  Select,
  Upload,
  Form,
  Typography,
  Space,
  Card,
  List,
  Modal,
  Divider,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;

interface SubContent {
  subheading: string;
  paragraph: string;
}

interface ContentItem {
  id: string;
  heading: string;
  contentType: "single" | "multiple";
  content: SubContent[];
  singleParagraph: string;
  imageName: string;
  imagePreview: string;
}

const AdminPanel: React.FC = () => {
  const [heading, setHeading] = useState<string>("");
  const [contentType, setContentType] = useState<"single" | "multiple">(
    "single"
  );
  const [paragraph, setParagraph] = useState<string>("");
  const [subContent, setSubContent] = useState<SubContent[]>([
    { subheading: "", paragraph: "" },
  ]);
  const [imageFile, setImageFile] = useState<{
    file: File;
    preview: string;
  } | null>(null);
  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentView, setCurrentView] = useState<ContentItem | null>(null);

  const handleSubChange = (
    idx: number,
    field: keyof SubContent,
    value: string
  ) => {
    const updated = [...subContent];
    updated[idx][field] = value;
    setSubContent(updated);
  };

  const addSubContent = () => {
    setSubContent([...subContent, { subheading: "", paragraph: "" }]);
  };

  const handleFileChange = (info: any) => {
    const file = info.fileList?.[0]?.originFileObj;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImageFile({ file, preview: previewUrl });
    }
  };

  console.log(imageFile);
  const handleSubmit = () => {
    const payload: ContentItem = {
      id: Date.now().toString(),
      heading,
      contentType,
      content: contentType === "multiple" ? subContent : [],
      singleParagraph: contentType === "single" ? paragraph : "",
      imageName: imageFile?.file.name || "",
      imagePreview: imageFile?.preview || "",
    };
    console.log(payload);
    setContentList([...contentList, payload]);
    resetForm();
  };

  const resetForm = () => {
    setHeading("");
    setContentType("single");
    setParagraph("");
    setSubContent([{ subheading: "", paragraph: "" }]);
    setImageFile(null);
  };

  const handleDelete = (id: string) => {
    console.log(id);
    setContentList(contentList.filter((item) => item.id !== id));
  };

  const handleView = (item: ContentItem) => {
    setCurrentView(item);
    setIsModalVisible(true);
  };

  return (
    <Layout style={{ minHeight: "100vh", marginTop: "-70px" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          className="demo-logo-vertical"
          style={{ color: "white", padding: 20, fontSize: 20 }}
        >
          Admin Panel
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Manage Content</Menu.Item>
          {/* <Menu.Item key="2">View Content</Menu.Item> */}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0, textAlign: "center" }}>
          <Title level={3}>Manage Contents</Title>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="Heading">
                <Input
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Content Type">
                <Select
                  value={contentType}
                  onChange={(value) => setContentType(value)}
                >
                  <Option value="single">Single Paragraph</Option>
                  <Option value="multiple">Multiple Subheadings</Option>
                </Select>
              </Form.Item>

              {contentType === "single" ? (
                <Form.Item label="Paragraph">
                  <Input.TextArea
                    rows={4}
                    value={paragraph}
                    onChange={(e) => setParagraph(e.target.value)}
                  />
                </Form.Item>
              ) : (
                subContent.map((item, idx) => (
                  <Card key={idx} style={{ marginBottom: 16 }}>
                    <Form.Item label={`Subheading ${idx + 1}`}>
                      <Input
                        value={item.subheading}
                        onChange={(e) =>
                          handleSubChange(idx, "subheading", e.target.value)
                        }
                      />
                    </Form.Item>
                    <Form.Item label={`Paragraph ${idx + 1}`}>
                      <Input.TextArea
                        rows={3}
                        value={item.paragraph}
                        onChange={(e) =>
                          handleSubChange(idx, "paragraph", e.target.value)
                        }
                      />
                    </Form.Item>
                  </Card>
                ))
              )}

              {contentType === "multiple" && (
                <Form.Item>
                  <Button icon={<PlusOutlined />} onClick={addSubContent}>
                    Add More
                  </Button>
                </Form.Item>
              )}

              <Form.Item label="Upload Image">
                <Upload
                  beforeUpload={() => false}
                  onChange={handleFileChange}
                  fileList={
                    imageFile
                      ? [
                          {
                            uid: "-1",
                            name: imageFile.file.name,
                            status: "done",
                          },
                        ]
                      : []
                  }
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>

            <Divider />

            <Title level={4}>All Content</Title>
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={contentList}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    title={item.heading}
                    actions={[
                      <EyeOutlined
                        key="view"
                        onClick={() => handleView(item)}
                      />,
                      <EditOutlined key="edit" />,
                      <DeleteOutlined
                        key="delete"
                        onClick={() => handleDelete(item.id)}
                      />,
                    ]}
                  >
                    <p>
                      {item.contentType === "single"
                        ? item.singleParagraph
                        : `Subcontents: ${item.content.length}`}
                    </p>
                  </Card>
                </List.Item>
              )}
            />

            <Modal
              title="View Content"
              open={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
            >
              {currentView && (
                <div className="">
                  <Title level={5}>{currentView.heading}</Title>
                  {currentView.contentType === "single" ? (
                    <p>{currentView.singleParagraph}</p>
                  ) : (
                    currentView.content.map((item, idx) => (
                      <div key={idx} className="flex">
                        <strong>{item.subheading}:- </strong>
                        <p>{item.paragraph}</p>
                      </div>
                    ))
                  )}
                  {currentView.imagePreview && (
                    <img
                      src={currentView.imagePreview}
                      alt={currentView.imageName}
                      style={{ maxWidth: "100%", marginTop: 16 }}
                    />
                  )}
                </div>
              )}
            </Modal>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
