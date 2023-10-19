import { LockOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

// import useStore from '../../store';
import cls from './index.module.less';
// import { Link } from 'react-router-dom';

const Otp: React.FC = () => {
  // const [form] = Form.useForm();
  // const { otp , loading } = useStore((state) => ({ ...state }));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={cls.register}>
      <Card className="_bg" bordered={false}>
        <Form
        // onFinish={({ username, password }) => {
        //   if (username === 'admin' && password === '123456') {
        //     return login({ username, password });
        //   }
        //   message.error('Mật khẩu sai, thử lại đi!');
        // }}
        >
          <Form.Item>
            <>
              <Button
                // loading={loading}
                type="primary"
                htmlType="submit"
                className={cls.button}
                onClick={showModal}>
                Register
              </Button>
              <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form.Item
                  name="otp"
                  label="OTP"
                  rules={[
                    { required: true, message: 'Nhập mã otp' },
                    { min: 6, max: 6, message: 'Độ dài không hợp lệ' },
                  ]}>
                  <Input type="number" prefix={<LockOutlined />} placeholder="" />
                </Form.Item>
              </Modal>
            </>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Otp;
