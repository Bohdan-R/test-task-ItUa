import React from 'react';
import { Table } from 'antd';
import { EmployeesData } from '../helpers/types';

type UsersTableProps = {
  usersData: EmployeesData[];
};

const USersTable: React.FC<UsersTableProps> = ({ usersData }) => {
  const columns = [
    {
      title: "Ім'я",
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'Прізвище',
      dataIndex: 'lastName',
      key: 'lastName',
      width: '20%',
    },
    {
      title: 'Посада',
      dataIndex: 'position',
      key: 'position',
      width: '30%',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      width: '30%',
    },
  ];

  return <Table style={{ width: '100%' }} bordered dataSource={usersData} columns={columns} pagination={false} />;
};

export default USersTable;
