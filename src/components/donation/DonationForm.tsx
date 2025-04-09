import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import Styles from '../../styles/donationForm.module.css';

type FieldType = {
  name?: string;
  email?: string;
  phone: number;
  pan: string;
  terms?: string;
};
type Props = {
  formData: (data: object) => void,
}

const DonationForm: React.FC<Props> = ({formData}) => {

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    formData(values);
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return(
  <Form
    name="donationform"
    style={{ maxWidth: 600, marginTop: "1rem" }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      name="name"
      rules={[{ required: true, message: 'Please input your name!' }]}
      className={Styles.form_item}
    >
      <Input placeholder='Name'/>
    </Form.Item>

    <Form.Item<FieldType>
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
      className={Styles.form_item}
    >
      <Input placeholder='Email Address'/>
    </Form.Item>

    <Form.Item<FieldType>
      name="phone"
      rules={[{ required: true, message: 'Please input your phone number!' }]}
      className={Styles.form_item}
    >
      <Input placeholder='Phone Number'/>
    </Form.Item>

    <Form.Item<FieldType>
      name="pan"
      className={Styles.form_item}
    >
      <Input placeholder='Pan Number'/>
    </Form.Item>

    <Form.Item<FieldType> name="terms" valuePropName="checked" label={null}>
      <Checkbox required>I accept the terms & conditions</Checkbox>
    </Form.Item>

    <Form.Item className={Styles.form_item}  label={null}>
      <Button htmlType="submit" style={{backgroundColor: "#4CAF50",color: "white", width: "100%"}}>
        Donate
      </Button>
    </Form.Item>
  </Form>
)};

export default DonationForm;