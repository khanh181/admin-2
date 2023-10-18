import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import React from 'react';

import useStore from '../../store';
import cls from './index.module.less';

const Login: React.FC = () => {
  const { login, loading } = useStore((state) => ({ ...state }));

  return (
    <div className={cls.loginBox}>
      <Card className="_bg" bordered={false}>
        <Form
          onFinish={({ username, password }) => {
            if (username === 'admin' && password === '123456') {
              return login({ username, password });
            }
            message.error('Mật khẩu sai, thử lại đi!');
          }}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'User name' }]}>
            <Input prefix={<UserOutlined />} placeholder="admin" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Password' }]}>
            <Input prefix={<LockOutlined />} placeholder="123456" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className={cls.button}>
              Login
            </Button>
          </Form.Item>
        </Form>
        
      </Card>
    </div>
  );
};
export default Login;
