import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Select } from 'antd';
import Styles from '../../styles/donationForm.module.css';
import { Option } from 'antd/es/mentions';
import TextArea from 'antd/es/input/TextArea';

type FieldType = {
  name?: string;
  email?: string;
  phone: number;
  pan: string;
  causes?: string;
  cause?: string;
};
type Props = {
  formData: (data: object) => void,
}

const DonationForm: React.FC<Props> = ({formData}) => {

  const [cause, setCause] = React.useState('');

  const causeHandler = (value: string) => {
    console.log(value);
    setCause(value);
  };

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

    <Form.Item<FieldType> name="causes" className={Styles.form_item} rules={[{ required: true }]}>
        <Select
          placeholder="Select a cause for donation"
          allowClear
          value={cause}
          onChange={causeHandler}
        >
          <Option value="Membership">Membership</Option>
          <Option value="Donation">Donation</Option>
          <Option value="Tribal Support">Tribal Support</Option>
          <Option value="Disaster Management">Disaster Management</Option>
          <Option value="Others">Others</Option>
        </Select>
      </Form.Item>
      {cause === 'Others' && (
        <Form.Item<FieldType>
          name="cause"
          className={Styles.form_item}
          rules={[{ required: true, message: 'Please input your cause!' }]}
        >
          <Input placeholder='Other Cause'/>
        </Form.Item>
      )}
    <Form.Item className={Styles.form_item}  label={null}>
      <Button htmlType="submit" style={{backgroundColor: "#4CAF50",color: "white", width: "100%"}}>
        Donate
      </Button>
    </Form.Item>
  </Form>
)};

export default DonationForm;