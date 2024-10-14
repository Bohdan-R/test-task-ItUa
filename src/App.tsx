import React from 'react';
import { Layout } from 'antd';
import { ToastContainer } from 'react-toastify';
import RoutesComponent from './routes';
import Navigation from './components/Navigation';

import 'react-toastify/dist/ReactToastify.css';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ position: 'fixed', zIndex: 999, width: '100%', backgroundColor: '#000000' }}>
        <Navigation />
      </Header>

      <Content style={{ padding: '24px 50px', marginTop: 64, backgroundColor: '#f9f9f9' }}>
        <RoutesComponent />
      </Content>
      <ToastContainer />
      <Footer style={{ textAlign: 'center', backgroundColor: '#000000', color: '#fff', width: '100%' }}>
        ©2024 Created by Bohdan Remeniuk
      </Footer>
    </Layout>
  );
};

export default App;
