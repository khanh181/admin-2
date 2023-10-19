import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal, Select, Space } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import useStore from '../../store';
import cls from './index.module.less';

const Register: React.FC = () => {
  // const [form] = Form.useForm();
  const { register, loading } = useStore((state) => ({ ...state }));
  const { otp } = useStore((state) => ({ ...state }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isModalSubmitted, setIsModalSubmitted] = useState(false)

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    return register(values);
  };

  console.log(typeof onFinish);
  // if (onFinish) {
  //   const showModal = () => {
  //    setIsModalOpen(true);
  //   };
  // }

  const handleOk = (values: any) => {
    // setIsModalSubmitted(true);
    setIsModalOpen(false);
    return otp(values);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={cls.register}>
      <Card className="_bg" bordered={false}>
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            label="username"
            rules={[{ required: true, message: 'User name' }]}>
            <Input prefix={<UserOutlined />} placeholder="admin" />
          </Form.Item>
          <Form.Item
            name="fullname"
            label="fullname"
            rules={[
              { required: true, message: 'nhập tên bạn vào' },
              { min: 3, max: 50, message: 'Độ dài không hợp lệ' },
            ]}>
            <Input prefix={<LockOutlined />} placeholder="name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="email"
            rules={[
              { required: true, message: 'address' },
              {
                type: 'email',
                message: 'nhập email vào',
              },
            ]}>
            <Input prefix={<LockOutlined />} placeholder="@" />
          </Form.Item>
          <Form.Item
            name="address"
            label="address"
            rules={[
              { required: true, message: 'Nhập địa chỉ vào' },
              { min: 3, max: 50, message: 'Độ dài không hợp lệ' },
            ]}>
            <Input prefix={<LockOutlined />} placeholder="hn" />
          </Form.Item>
          <Form.Item
            name="phonenumber"
            label="phonenumber"
            rules={[
              { required: true, message: 'nhập sdt' },
              { min: 10, max: 12, message: 'Độ dài không hợp lệ' },
            ]}>
            <Input prefix={<LockOutlined />} placeholder="678" />
          </Form.Item>
          <Form.Item
            name="password"
            label="password"
            rules={[{ required: true, message: 'nhập mk vào' }]}>
            <Input prefix={<LockOutlined />} placeholder="Nhap mk vao" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'nhap lai mk' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu chưa trùng'));
                },
              }),
            ]}>
            <Input prefix={<LockOutlined />} placeholder="Nhap mk vao" />
          </Form.Item>
          <Form.Item
            name="accountType"
            label="account type"
            dependencies={['defaultValue']}>
            <Space wrap>
              <Select
                defaultValue="1"
                style={{ width: 181 }}
                onChange={handleChange}
                options={[
                  { value: '1', label: 'user' },
                  { value: '2', label: 'admin' },
                ]}
              />
            </Space>
          </Form.Item>

          <Form.Item>
            <>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className={cls.button}>
                Register
              </Button>
              <Modal
                title="Basic Modal"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                  <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={handleOk}>
                    Submit
                  </Button>,
                ]}>
                <Form onFinish={handleOk}>
                  <Form.Item
                    name="otp"
                    label="OTP"
                    rules={[
                      { required: true, message: 'Nhập mã otp' },
                      { min: 6, max: 6, message: 'Độ dài không hợp lệ' },
                    ]}>
                    <Input type="number" prefix={<LockOutlined />} placeholder="" />
                  </Form.Item>
                </Form>
              </Modal>
            </>
          </Form.Item>
          <Form.Item>
            <Link to={'/user/login'}>
              <Button
                loading={loading}
                type="default"
                htmlType="button"
                className={cls.button}>
                Login
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Register;
