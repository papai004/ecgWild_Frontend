import React from "react";
import type { FormProps } from "antd";
import { Form, Input, Button, Row, Col } from "antd";
import Styles from '../styles/contactusForm.module.css'

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ContactForm: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={Styles.custom_form}
    >
      <Row gutter={16} className={Styles.responsive_row}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Your name" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Please enter your phone number" }]}
          >
            <Input placeholder="Phone number" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Enter a valid email" },
        ]}
      >
        <Input placeholder="Email address" />
      </Form.Item>

      <Form.Item
        label="Message"
        name="message"
        rules={[{ required: true, message: "Please enter your message" }]}
      >
        <Input.TextArea rows={4} placeholder="Your message" />
      </Form.Item>

      <Form.Item>
        <Button className={Styles.btn} htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;

