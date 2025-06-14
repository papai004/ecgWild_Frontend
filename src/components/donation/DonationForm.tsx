import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Select } from 'antd';
import Styles from '../../styles/donationForm.module.css';
import { Option } from 'antd/es/mentions';

type FieldType = {
  name?: string;
  email?: string;
  phone: string;
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

  // Custom validation functions
  const validateName = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Please input your name!'));
    }
    if (value.trim().length < 4) {
      return Promise.reject(new Error('Name must be at least 4 characters long!'));
    }
    if (value.trim().length > 50) {
      return Promise.reject(new Error('Name cannot exceed 50 characters!'));
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      return Promise.reject(new Error('Name can only contain letters and spaces!'));
    }
    return Promise.resolve();
  };

  const validatePhone = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Please input your phone number!'));
    }
    // Remove any non-digit characters for validation
    const phoneDigits = value.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      return Promise.reject(new Error('Phone number must be at least 10 digits!'));
    }
    if (phoneDigits.length > 15) {
      return Promise.reject(new Error('Phone number cannot exceed 15 digits!'));
    }
    if (!/^[+]?[\d\s\-()]+$/.test(value)) {
      return Promise.reject(new Error('Please enter a valid phone number!'));
    }
    return Promise.resolve();
  };

  const validatePAN = (_: any, value: string) => {
    if (value && value.trim() !== '') {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(value.toUpperCase())) {
        return Promise.reject(new Error('Please enter a valid PAN number (e.g., ABCDE1234F)!'));
      }
    }
    return Promise.resolve();
  };

  const validateEmail = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Please input your email!'));
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return Promise.reject(new Error('Please enter a valid email address!'));
    }
    if (value.length > 100) {
      return Promise.reject(new Error('Email address cannot exceed 100 characters!'));
    }
    return Promise.resolve();
  };

  const validateOtherCause = (_: any, value: string) => {
    if (cause === 'Others') {
      if (!value || value.trim() === '') {
        return Promise.reject(new Error('Please specify your cause!'));
      }
      if (value.length < 3) {
        return Promise.reject(new Error('Cause description must be at least 3 characters long!'));
      }
      if (value.length > 200) {
        return Promise.reject(new Error('Cause description cannot exceed 200 characters!'));
      }
    }
    return Promise.resolve();
  };

  return (
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
        rules={[{ validator: validateName }]}
        className={Styles.form_item}
      >
        <Input 
          placeholder='Full Name'
          maxLength={50}
          showCount
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="email"
        rules={[{ validator: validateEmail }]}
        className={Styles.form_item}
      >
        <Input 
          placeholder='Email Address'
          type="email"
          maxLength={100}
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="phone"
        rules={[{ validator: validatePhone }]}
        className={Styles.form_item}
      >
        <Input 
          placeholder='Phone Number (+91 XXXXXXXXXX)'
          maxLength={20}
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="pan"
        rules={[{ validator: validatePAN }]}
        className={Styles.form_item}
      >
        <Input 
          placeholder='PAN Number (Optional - ABCDE1234F)'
          maxLength={10}
          style={{ textTransform: 'uppercase' }}
          onChange={(e) => {
            e.target.value = e.target.value.toUpperCase();
          }}
        />
      </Form.Item>

      <Form.Item<FieldType> 
        name="causes" 
        className={Styles.form_item} 
        rules={[{ required: true, message: 'Please select a cause for donation!' }]}
      >
        <Select
          placeholder="Select a cause for donation"
          allowClear
          value={cause}
          onChange={causeHandler}
        >
          <Option value="Membership">Membership</Option>
          <Option value="Donation">General Donation</Option>
          <Option value="Tribal Support">Tribal Support</Option>
          <Option value="Disaster Management">Disaster Management</Option>
          <Option value="Others">Others</Option>
        </Select>
      </Form.Item>

      {cause === 'Others' && (
        <Form.Item<FieldType>
          name="cause"
          className={Styles.form_item}
          rules={[{ validator: validateOtherCause }]}
        >
          <Input.TextArea 
            placeholder='Please specify your cause for donation'
            maxLength={200}
            showCount
            rows={3}
          />
        </Form.Item>
      )}

      <Form.Item className={Styles.form_item} label={null}>
        <Button 
          htmlType="submit" 
          style={{
            backgroundColor: "#4CAF50",
            color: "white", 
            width: "100%",
            height: "40px",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          Donate Now
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DonationForm;