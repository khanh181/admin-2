import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import useStore from '../../store';
import cls from './index.module.less';

const Login: React.FC = () => {
  const { login, loading } = useStore((state) => ({ ...state }));

  return (
    <div className={cls.loginBox}>
      <Card className="_bg" bordered={false}>
        <Form
          onFinish={({ username, password }) => {
            return login({ username, password });
          }}>
          <Form.Item
            name="username"
            initialValue={'admin1'}
            rules={[{ required: true, message: 'User name' }]}>
            <Input prefix={<UserOutlined />} placeholder="admin" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Password' }]}
            initialValue={'123123'}>
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
          <Form.Item>
            <Link to={'/user/register'}>
              <Button
                htmlType="button"
                loading={loading}
                type="default"
                className={cls.button}>
                Register
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
