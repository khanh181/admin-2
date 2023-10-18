import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import React, { useEffect, useState } from 'react';

import useStore from '../../store';

const { Option } = Select;

const Home: React.FC = () => {
  const [form] = Form.useForm();
  const list = useStore((state) => state.list);
  const loading = useStore((state) => state.loading);
  const editItem = useStore((state) => state.editItem);
  const { getList, removeList, editList, addList, setEditItem } = useStore.getState();

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    getList();
  }, []);

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      // eslint-disable-next-line react/display-name
      render: (tags: any[]) => (
        <>
          {tags?.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      // eslint-disable-next-line react/display-name
      render: (_: any, record: { key: string }) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setEditItem(record);
              setVisible(true);
              form.setFieldsValue(record);
            }}>
            revise
          </Button>
          <Button danger onClick={() => removeList(record.key)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleCancle = () => {
    setVisible(false);
  };

  const hanldeOk = () => {
    handleCancle();
    form.validateFields().then((res) => {
      console.log(res);
      editItem ? editList(res) : addList(res);
    });
  };
  console.log('list', list);
  return (
    <div>
      <h2>Home</h2>
      <Space>
        {/* <Button type="primary" onClick={() => setVisible(true)}>
          新增
        </Button>
        <Button onClick={() => getList()}>refresh</Button> */}
      </Space>
      <Card loading={loading}>
        <Table dataSource={list} columns={columns} />
      </Card>
      {/* transitionName=""和maskTransitionName=""是去除弹框动画属性 */}
      <Modal
        // transitionName=""
        // maskTransitionName=""
        title={editItem ? 'Sửa thông tin' : 'Thêm mới'}
        visible={visible}
        onOk={hanldeOk}
        onCancel={handleCancle}
        afterClose={() => {
          form.resetFields();
          setEditItem(undefined);
        }}>
        <Form form={form}>
          <Form.Item required label="name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="age" name="age">
            <InputNumber />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select allowClear>
              <Option key="nice" value="nice">
                nice
              </Option>
              <Option key="developer" value="developer">
                developer
              </Option>
              <Option value="loser">loser</Option>
              <Option value="cool">cool</Option>
              <Option value="teacher">teacher</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Home;
