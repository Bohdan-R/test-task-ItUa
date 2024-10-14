import React, { useEffect } from 'react';
import { Collapse, Avatar, Space, Skeleton } from 'antd';
import { EditOutlined, DeleteOutlined, HolderOutlined } from '@ant-design/icons';
import Departments from '../stores/company-departments';
import { Department } from '../helpers/types';
import { observer } from 'mobx-react-lite';

const { Panel } = Collapse;

const CompanyStructure: React.FC = observer(() => {
  const { departments, isLoading, getDepartments } = Departments;

  useEffect(() => {
    getDepartments();
  }, []);

  const renderPanels = (items: Department[], nesting = 0) =>
    items.map((item: Department) => (
      <Panel
        header={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Space>
              {nesting >= 1 && <HolderOutlined />}
              {item.title}
            </Space>
            <Space style={{ marginLeft: 'auto' }}>
              Керівник: {item.chief}
              <Avatar style={{ margin: '0 10px' }} />
              <EditOutlined />
              <DeleteOutlined />
            </Space>
          </div>
        }
        key={item.key}
      >
        {item.children.length > 0 ? <Collapse>{renderPanels(item.children, nesting + 1)}</Collapse> : null}
      </Panel>
    ));

  return (
    <>
      {isLoading ? (
        <Skeleton.Button active style={{ width: '100%', height: '100%', minHeight: '300px', maxHeight: '700px' }} />
      ) : (
        <Collapse>{renderPanels(departments)}</Collapse>
      )}
    </>
  );
});

export default CompanyStructure;
