import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const Navigation: React.FC = observer(() => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/employees',
      label: <Link to="/employees">Сотрудники</Link>,
    },
    {
      key: '/company-structure',
      label: <Link to="/company-structure">Структура компании</Link>,
    },
  ];

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[location.pathname]}
      items={menuItems}
      style={{ backgroundColor: 'transparent' }}
    ></Menu>
  );
});

export default Navigation;
