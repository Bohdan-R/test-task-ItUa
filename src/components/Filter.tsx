import React from 'react';
import { Form, Input, Button } from 'antd';
import { FiltersData } from '../helpers/types';

type FilterProps = {
  onFilter: (filters: FiltersData) => void;
  onReset: () => void;
};

const Filter: React.FC<FilterProps> = ({ onFilter, onReset }) => {
  const [form] = Form.useForm();

  const handleSubmit = (filters: FiltersData) => {
    onFilter(filters);
  };

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  return (
    <Form
      style={{
        position: 'sticky',
        top: '90px',
        padding: '20px',
        width: '100%',
        minWidth: '220px',
        maxWidth: '300px',
        border: '1px solid #ddd',
        borderRadius: '4px',
      }}
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item label="Ім'я" name="name">
        <Input placeholder="Ім'я" />
      </Form.Item>
      <Form.Item label="Прізвище" name="lastName">
        <Input placeholder="Прізвище" />
      </Form.Item>
      <Form.Item label="Посада" name="position">
        <Input placeholder="Посада" />
      </Form.Item>
      <Form.Item label="E-mail" name="email">
        <Input placeholder="E-mail" />
      </Form.Item>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" htmlType="submit">
          Фільтрувати
        </Button>
        <Button onClick={handleReset}>Очистити</Button>
      </div>
    </Form>
  );
};

export default Filter;
