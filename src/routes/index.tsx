import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Flex, Spin } from 'antd';
import ProtectedRoute from '../components/ProtectedRoute';

const Login = lazy(() => import('../pages/Login'));
const Employees = lazy(() => import('../pages/Employees'));
const CompanyStructure = lazy(() => import('../pages/CompanyStructure'));

const RoutesComponent: React.FC = () => {
  return (
    <Suspense
      fallback={
        <Flex style={{ width: '100%', minHeight: '100%' }} align="center" justify="center">
          <Spin size="large" />
        </Flex>
      }
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/employees" element={<Employees />} />
          <Route path="/company-structure" element={<CompanyStructure />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesComponent;
