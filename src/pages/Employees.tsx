import React, { useEffect } from 'react';
import { Flex, Skeleton } from 'antd';
import { observer } from 'mobx-react-lite';
import FilterForm from '../components/Filter';
import DataTable from '../components/UsersTable';
import CompanyEmployees from '../stores/employees';

import { FiltersData } from '../helpers/types';

const Employees: React.FC = observer(() => {
  const { employees, isLoading, getUsers } = CompanyEmployees;

  useEffect(() => {
    getUsers({ email: '', lastName: '', name: '', position: '' });
  }, []);

  const handleFilter = (values: FiltersData) => {
    getUsers(values);
  };

  const handleReset = () => {
    getUsers({ email: '', lastName: '', name: '', position: '' });
  };

  return (
    <div style={{ position: 'relative', padding: '40px', backgroundColor: '#f9f9f9', width: '100%', height: '100%' }}>
      <Flex gap={50}>
        <div style={{ width: '100%', maxWidth: '300px' }}>
          <FilterForm onFilter={handleFilter} onReset={handleReset} />
        </div>

        {isLoading ? (
          <Skeleton.Button active style={{ width: '100%', height: '100%', maxHeight: '700px' }} />
        ) : (
          <DataTable usersData={employees} />
        )}
      </Flex>
    </div>
  );
});

export default Employees;
